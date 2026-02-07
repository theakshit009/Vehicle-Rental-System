import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Building2, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

const BranchUnauthorized = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <ShieldAlert size={40} className="text-red-600" />
                    </div>
                </div>

                {/* Header */}
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                    Access Denied
                </h1>
                <p className="text-slate-600 mb-8">
                    You don't have permission to access the Branch Portal. Please contact your
                    administrator if you believe this is an error.
                </p>

                {/* Actions */}
                <div className="space-y-3">
                    <Link to="/branch/login">
                        <Button
                            icon={<Building2 size={18} />}
                            fullWidth
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            Go to Branch Login
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button
                            variant="secondary"
                            icon={<ArrowLeft size={18} />}
                            fullWidth
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BranchUnauthorized;
