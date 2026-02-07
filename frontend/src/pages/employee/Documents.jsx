import React, { useState } from 'react';
import { FileText, Upload, Check, X, AlertCircle, Download } from 'lucide-react';
import Button from '../../components/ui/Button';
import StatusPill from '../../components/ui/StatusPill';

const mockDocuments = [
    { id: 'doc-001', name: 'Identity Proof', description: 'Aadhaar/PAN/Passport', status: 'verified' },
    { id: 'doc-002', name: 'Driving License', description: 'Valid driver\'s license', status: 'verified' },
    { id: 'doc-003', name: 'Address Proof', description: 'Utility bill/Rent agreement', status: 'pending' },
    { id: 'doc-004', name: 'Background Verification', description: 'Police verification certificate', status: 'pending' },
    { id: 'doc-005', name: 'Medical Certificate', description: 'Health fitness certificate', status: 'not_uploaded' },
];

const Documents = () => {
    const [documents] = useState(mockDocuments);

    const getStatusVariant = (status) => {
        switch (status) {
            case 'verified': return 'success';
            case 'pending': return 'warning';
            case 'rejected': return 'danger';
            default: return 'default';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
                <p className="text-slate-600 mt-1">Manage your employment documents and verification</p>
            </div>

            {/* Onboarding Progress */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="text-orange-600" size={20} />
                    Onboarding Progress
                </h2>
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Completion</span>
                        <span className="font-medium text-orange-600">60%</span>
                    </div>
                    <div className="w-full bg-orange-100 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                </div>
                <p className="text-sm text-slate-600">
                    Complete all required documents to finish onboarding
                </p>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Required Documents</h2>
                <div className="space-y-3">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.status === 'verified' ? 'bg-green-100' :
                                    doc.status === 'pending' ? 'bg-yellow-100' : 'bg-slate-100'
                                    }`}>
                                    {doc.status === 'verified' ? (
                                        <Check className="text-green-600" size={20} />
                                    ) : doc.status === 'pending' ? (
                                        <AlertCircle className="text-yellow-600" size={20} />
                                    ) : (
                                        <FileText className="text-slate-400" size={20} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-slate-900">{doc.name}</h3>
                                    <p className="text-sm text-slate-600">{doc.description}</p>
                                </div>
                                <StatusPill status={doc.status} variant={getStatusVariant(doc.status)} />
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                {doc.status === 'verified' ? (
                                    <Button variant="outline" size="sm" icon={<Download size={16} />}>
                                        Download
                                    </Button>
                                ) : doc.status === 'pending' ? (
                                    <Button variant="outline" size="sm" disabled>
                                        Under Review
                                    </Button>
                                ) : (
                                    <Button
                                        className="bg-orange-600 hover:bg-orange-700 text-white"
                                        size="sm"
                                        icon={<Upload size={16} />}
                                    >
                                        Upload
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload Area */}
            <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-8">
                <div className="text-center">
                    <Upload size={48} className="text-slate-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-900 mb-2">Upload Additional Documents</h3>
                    <p className="text-sm text-slate-600 mb-4">
                        Drag and drop files here, or click to browse
                    </p>
                    <Button variant="outline">
                        Choose Files
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Documents;
