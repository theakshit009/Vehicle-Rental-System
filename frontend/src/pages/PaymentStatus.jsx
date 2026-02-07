import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const PaymentStatus = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success') === 'true';
    const bookingId = searchParams.get('bookingId');

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center py-16">
            <div className="container-custom max-w-2xl">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
                    {success ? (
                        <>
                            {/* Success State */}
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={48} className="text-green-600" />
                            </div>

                            <h1 className="text-3xl font-bold text-slate-900 mb-3">
                                Booking Confirmed!
                            </h1>

                            <p className="text-lg text-slate-600 mb-6">
                                Your vehicle has been successfully booked.
                            </p>

                            {bookingId && (
                                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-slate-600 mb-1">Booking ID</p>
                                    <p className="text-xl font-mono font-semibold text-slate-900">{bookingId}</p>
                                </div>
                            )}

                            <div className="space-y-3 mb-8">
                                <div className="flex items-start gap-3 text-left">
                                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-700">
                                        Confirmation email has been sent to your email address
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 text-left">
                                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-700">
                                        You can view your booking details in My Bookings section
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 text-left">
                                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-700">
                                        Please arrive 15 minutes before your pickup time
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => navigate('/my-bookings')}
                                >
                                    View My Bookings
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    icon={<Home size={18} />}
                                    onClick={() => navigate('/')}
                                >
                                    Back to Home
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Failure State */}
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle size={48} className="text-red-600" />
                            </div>

                            <h1 className="text-3xl font-bold text-slate-900 mb-3">
                                Payment Failed
                            </h1>

                            <p className="text-lg text-slate-600 mb-8">
                                We couldn't process your payment. Please try again or contact support if the issue persists.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => navigate(-1)}
                                >
                                    Try Again
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    icon={<Home size={18} />}
                                    onClick={() => navigate('/')}
                                >
                                    Back to Home
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentStatus;
