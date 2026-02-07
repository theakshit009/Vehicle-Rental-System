import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PriceBreakdown from '../components/booking/PriceBreakdown';
import { useBookingStore } from '../store/booking.store';
import { useAuthStore } from '../store/auth.store';
import { createBooking, processPayment } from '../services/booking.service';
import { calculateDays } from '../utils/helpers';

const Booking = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthStore();
    const {
        searchParams,
        selectedVehicle,
        selectedAddOns,
        customerInfo,
        updateCustomerInfo,
        resetBooking,
    } = useBookingStore();

    const [currentStep, setCurrentStep] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    if (!selectedVehicle) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">No vehicle selected</h2>
                <Button onClick={() => navigate('/')}>Browse Vehicles</Button>
            </div>
        );
    }

    const days = calculateDays(searchParams.pickupDate, searchParams.returnDate);

    const validateStep1 = () => {
        const newErrors = {};
        if (!customerInfo.name) newErrors.name = 'Name is required';
        if (!customerInfo.email) newErrors.email = 'Email is required';
        if (!customerInfo.phone) newErrors.phone = 'Phone is required';
        if (!customerInfo.licenseNumber) newErrors.licenseNumber = 'License number is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        }
    };

    const handleProceedToPayment = async () => {
        setProcessing(true);

        try {
            // Create booking
            const bookingData = {
                vehicle: selectedVehicle,
                pickupDate: searchParams.pickupDate,
                returnDate: searchParams.returnDate,
                location: searchParams.location,
                addOns: selectedAddOns,
                customerInfo,
                days,
            };

            const bookingResponse = await createBooking(bookingData);

            // Process payment
            await processPayment(bookingResponse.data.id, {
                method: 'card', // Mock
            });

            // Navigate to success page
            navigate(`/payment-status?success=true&bookingId=${bookingResponse.data.id}`);

            // Reset booking after success
            resetBooking();
        } catch (error) {
            console.error('Booking error:', error);
            navigate('/payment-status?success=false');
        } finally {
            setProcessing(false);
        }
    };

    const steps = ['Details', 'Review & Pay'];

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container-custom max-w-6xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(`/vehicle/${selectedVehicle.id}`)}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to vehicle</span>
                </button>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-4">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className={`flex items-center gap-3 ${index + 1 === currentStep ? 'text-indigo-600' : index + 1 < currentStep ? 'text-green-600' : 'text-slate-400'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index + 1 === currentStep
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : index + 1 < currentStep
                                                ? 'border-green-600 bg-green-50'
                                                : 'border-slate-300 bg-white'
                                        }`}>
                                        {index + 1 < currentStep ? (
                                            <CheckCircle size={20} />
                                        ) : (
                                            <span className="font-semibold">{index + 1}</span>
                                        )}
                                    </div>
                                    <span className="font-medium hidden sm:block">{step}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="w-12 h-0.5 bg-slate-300" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        {currentStep === 1 && (
                            <div className="bg-white rounded-xl p-6 space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Your Details</h2>

                                <Input
                                    label="Full Name"
                                    value={customerInfo.name}
                                    onChange={(e) => updateCustomerInfo('name', e.target.value)}
                                    error={errors.name}
                                    required
                                    fullWidth
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    value={customerInfo.email}
                                    onChange={(e) => updateCustomerInfo('email', e.target.value)}
                                    error={errors.email}
                                    required
                                    fullWidth
                                />

                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    value={customerInfo.phone}
                                    onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                                    error={errors.phone}
                                    required
                                    fullWidth
                                />

                                <Input
                                    label="Driving License Number"
                                    value={customerInfo.licenseNumber}
                                    onChange={(e) => updateCustomerInfo('licenseNumber', e.target.value)}
                                    error={errors.licenseNumber}
                                    required
                                    fullWidth
                                />

                                <div className="flex justify-end pt-4">
                                    <Button variant="primary" size="lg" onClick={handleNext}>
                                        Continue to Review
                                    </Button>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="bg-white rounded-xl p-6 space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Review & Confirm</h2>

                                {/* Vehicle Summary */}
                                <div className="border border-slate-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-slate-900 mb-2">Vehicle</h3>
                                    <div className="flex gap-4">
                                        <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-24 h-24 rounded-lg object-cover" />
                                        <div>
                                            <p className="font-medium text-slate-900">{selectedVehicle.name}</p>
                                            <p className="text-sm text-slate-600">{selectedVehicle.type}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="border border-slate-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-slate-900 mb-2">Booking Details</h3>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="text-slate-600">Location:</span> <span className="font-medium">{searchParams.location}</span></p>
                                        <p><span className="text-slate-600">Pickup:</span> <span className="font-medium">{searchParams.pickupDate}</span></p>
                                        <p><span className="text-slate-600">Return:</span> <span className="font-medium">{searchParams.returnDate}</span></p>
                                        <p><span className="text-slate-600">Duration:</span> <span className="font-medium">{days} days</span></p>
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div className="border border-slate-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-slate-900 mb-2">Customer Details</h3>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="text-slate-600">Name:</span> <span className="font-medium">{customerInfo.name}</span></p>
                                        <p><span className="text-slate-600">Email:</span> <span className="font-medium">{customerInfo.email}</span></p>
                                        <p><span className="text-slate-600">Phone:</span> <span className="font-medium">{customerInfo.phone}</span></p>
                                        <p><span className="text-slate-600">License:</span> <span className="font-medium">{customerInfo.licenseNumber}</span></p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="outline" size="lg" onClick={() => setCurrentStep(1)}>
                                        Back
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        loading={processing}
                                        onClick={handleProceedToPayment}
                                    >
                                        Confirm & Pay
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <PriceBreakdown
                            vehiclePrice={selectedVehicle.pricePerDay}
                            days={days}
                            addOns={selectedAddOns}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
