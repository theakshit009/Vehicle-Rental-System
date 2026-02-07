import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Info } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { PageLoader } from '../components/ui/Loader';
import Modal from '../components/ui/Modal';
import { getMyBookings, cancelBooking } from '../services/booking.service';
import { useCurrency } from '../contexts/CurrencyContext';
import { formatDate } from '../utils/helpers';
import { BOOKING_STATUS } from '../utils/constants';

const MyBookings = () => {
    const navigate = useNavigate();
    const { formatPrice } = useCurrency();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        setLoading(true);
        try {
            const response = await getMyBookings();
            setBookings(response.data);
        } catch (error) {
            console.error('Error loading bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async () => {
        try {
            await cancelBooking(selectedBooking.id);
            setShowCancelModal(false);
            loadBookings();
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    const filteredBookings = bookings.filter((booking) => {
        if (activeTab === 'upcoming') {
            return booking.status === BOOKING_STATUS.PENDING || booking.status === BOOKING_STATUS.CONFIRMED;
        } else if (activeTab === 'completed') {
            return booking.status === BOOKING_STATUS.COMPLETED;
        } else {
            return booking.status === BOOKING_STATUS.CANCELLED;
        }
    });

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case BOOKING_STATUS.CONFIRMED:
                return 'success';
            case BOOKING_STATUS.PENDING:
                return 'warning';
            case BOOKING_STATUS.CANCELLED:
                return 'danger';
            case BOOKING_STATUS.COMPLETED:
                return 'info';
            default:
                return 'neutral';
        }
    };

    if (loading) {
        return <PageLoader message="Loading your bookings..." />;
    }

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container-custom max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">My Bookings</h1>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-slate-200">
                    {['upcoming', 'completed', 'cancelled'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-medium capitalize transition-colors border-b-2 ${activeTab === tab
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                    <EmptyState
                        icon={Calendar}
                        title={`No ${activeTab} bookings`}
                        message="You don't have any bookings in this category."
                        action={
                            <Button variant="primary" onClick={() => navigate('/')}>
                                Book a Vehicle
                            </Button>
                        }
                    />
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Vehicle Image */}
                                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={booking.vehicle.image}
                                            alt={booking.vehicle.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Booking Details */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                                                    {booking.vehicle.name}
                                                </h3>
                                                <p className="text-sm text-slate-600">
                                                    Booking ID: {booking.id}
                                                </p>
                                            </div>
                                            <Badge variant={getStatusBadgeVariant(booking.status)} dot>
                                                {booking.status}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <MapPin size={16} />
                                                <span>{booking.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar size={16} />
                                                <span>{formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-slate-600">Total Amount</p>
                                                <p className="text-2xl font-bold text-slate-900">
                                                    {formatPrice(booking.vehicle.pricePerDay * booking.days)}
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    icon={<Info size={16} />}
                                                    onClick={() => setSelectedBooking(booking)}
                                                >
                                                    Details
                                                </Button>
                                                {booking.status === BOOKING_STATUS.CONFIRMED && (
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedBooking(booking);
                                                            setShowCancelModal(true);
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Cancel Confirmation Modal */}
                <Modal
                    isOpen={showCancelModal}
                    onClose={() => setShowCancelModal(false)}
                    title="Cancel Booking"
                    footer={
                        <div className="flex gap-3 justify-end">
                            <Button variant="outline" onClick={() => setShowCancelModal(false)}>
                                Keep Booking
                            </Button>
                            <Button variant="danger" onClick={handleCancelBooking}>
                                Yes, Cancel
                            </Button>
                        </div>
                    }
                >
                    <p className="text-slate-700">
                        Are you sure you want to cancel this booking? This action cannot be undone.
                    </p>
                </Modal>
            </div>
        </div>
    );
};

export default MyBookings;
