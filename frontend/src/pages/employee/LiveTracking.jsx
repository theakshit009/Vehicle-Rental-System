import React from 'react';
import { MapPin, Navigation, TrendingUp, Activity } from 'lucide-react';
import { gpsService } from '../../services/gps.service';
import GPSStatus from '../../components/employee/GPSStatus';
import Button from '../../components/ui/Button';

const LiveTracking = () => {
    const gpsStatus = gpsService.getStatus();
    const location = gpsService.getCurrentLocation();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">GPS Tracking</h1>
                <p className="text-slate-600 mt-1">Monitor your location and route history</p>
            </div>

            {/* GPS Status Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Navigation className="text-orange-600" size={20} />
                    Current Status
                </h2>
                <GPSStatus status={gpsStatus} lastUpdate="just now" />

                {location && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-slate-600">Latitude</p>
                                <p className="font-mono font-medium text-slate-900">{location.lat}</p>
                            </div>
                            <div>
                                <p className="text-slate-600">Longitude</p>
                                <p className="font-mono font-medium text-slate-900">{location.lng}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="text-orange-600" size={20} />
                    Live Map
                </h2>
                <div className="bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 h-96 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin size={48} className="text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-600 font-medium">Map Integration Pending</p>
                        <p className="text-sm text-slate-500 mt-1">
                            Connect Google Maps or Mapbox for live tracking
                        </p>
                        <Button variant="outline" className="mt-4" size="sm">
                            Configure Map Service
                        </Button>
                    </div>
                </div>
            </div>

            {/* Route History */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity className="text-orange-600" size={20} />
                    Recent Routes
                </h2>
                <div className="text-center py-12">
                    <TrendingUp size={48} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No route history available</p>
                    <p className="text-sm text-slate-500 mt-1">Routes will be recorded when GPS tracking is active</p>
                </div>
            </div>
        </div>
    );
};

export default LiveTracking;
