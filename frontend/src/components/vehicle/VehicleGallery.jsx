import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const VehicleGallery = ({ images = [], vehicleName = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-96 bg-slate-200 rounded-xl flex items-center justify-center">
                <p className="text-slate-400">No images available</p>
            </div>
        );
    }

    return (
        <>
            {/* Main Gallery */}
            <div className="space-y-4">
                {/* Main Image */}
                <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden bg-slate-100 group">
                    <img
                        src={images[currentIndex]}
                        alt={`${vehicleName} - Image ${currentIndex + 1}`}
                        className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} className="text-slate-900" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} className="text-slate-900" />
                            </button>
                        </>
                    )}

                    {/* Fullscreen Button */}
                    <button
                        onClick={() => setIsFullscreen(true)}
                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-all"
                        aria-label="View fullscreen"
                    >
                        <Maximize2 size={20} className="text-slate-900" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 bg-slate-900/75 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => goToImage(index)}
                                className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                                        ? 'border-indigo-600 ring-2 ring-indigo-200'
                                        : 'border-transparent hover:border-slate-300'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors z-10"
                        aria-label="Close fullscreen"
                    >
                        <X size={24} className="text-white" />
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <img
                            src={images[currentIndex]}
                            alt={`${vehicleName} - Fullscreen`}
                            className="max-w-full max-h-full object-contain"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={32} className="text-white" />
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={32} className="text-white" />
                                </button>
                            </>
                        )}

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

VehicleGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    vehicleName: PropTypes.string,
};

export default VehicleGallery;
