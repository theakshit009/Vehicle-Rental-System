import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { QrCode, X, Upload } from 'lucide-react';
import Button from './Button';
import Modal from './Modal';

const QRScanner = ({ isOpen, onClose, onScan }) => {
    const [manualEntry, setManualEntry] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        if (manualEntry.trim()) {
            onScan(manualEntry.trim());
            setManualEntry('');
            onClose();
        }
    };

    const simulateScan = () => {
        setIsScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            const mockVehicleId = 'VEH-' + Math.floor(Math.random() * 1000);
            onScan(mockVehicleId);
            setIsScanning(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Scan QR Code"
            footer={
                <div className="flex gap-3">
                    <Button variant="outline" onClick={onClose} fullWidth>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleScan}
                        disabled={!manualEntry.trim()}
                        fullWidth
                    >
                        Submit
                    </Button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Camera View Placeholder */}
                <div className="relative">
                    <div className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
                        {isScanning ? (
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-white text-sm">Scanning...</p>
                            </div>
                        ) : (
                            <div className="text-center text-slate-400">
                                <QrCode size={80} className="mx-auto mb-4 opacity-50" />
                                <p className="text-sm">Camera view placeholder</p>
                                <p className="text-xs mt-1">Ready for real scanner integration</p>
                            </div>
                        )}
                    </div>

                    {/* Scanning Frame Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-48 h-48 border-4 border-orange-500 rounded-xl opacity-50" />
                    </div>
                </div>

                {/* Simulate Scan Button */}
                <Button
                    variant="primary"
                    icon={<QrCode size={18} />}
                    onClick={simulateScan}
                    disabled={isScanning}
                    fullWidth
                    className="bg-orange-600 hover:bg-orange-700"
                >
                    {isScanning ? 'Scanning...' : 'Simulate Scan'}
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-500">Or enter manually</span>
                    </div>
                </div>

                {/* Manual Entry */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Vehicle ID or QR Code
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., VEH-123 or scan result"
                        value={manualEntry}
                        onChange={(e) => setManualEntry(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && manualEntry.trim()) {
                                handleScan();
                            }
                        }}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                        Enter vehicle ID manually if scanner is unavailable
                    </p>
                </div>
            </div>
        </Modal>
    );
};

QRScanner.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onScan: PropTypes.func.isRequired,
};

export default QRScanner;
