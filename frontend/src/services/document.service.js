// Document Service - Document management for employees
// Mock service for document operations

import { DOCUMENT_STATUS } from '../utils/employeeConstants';

const mockDocuments = [
    {
        id: 'DOC-001',
        type: 'employment_contract',
        name: 'Employment Contract',
        description: 'Official employment agreement',
        status: DOCUMENT_STATUS.VERIFIED,
        uploadedDate: '2024-01-15',
        expiryDate: null,
        fileUrl: null,
    },
    {
        id: 'DOC-002',
        type: 'id_verification',
        name: 'Aadhaar Card',
        description: 'Government ID verification',
        status: DOCUMENT_STATUS.VERIFIED,
        uploadedDate: '2024-01-15',
        expiryDate: null,
        fileUrl: null,
    },
    {
        id: 'DOC-003',
        type: 'drivers_license',
        name: "Driver's License",
        description: 'Valid driving license',
        status: DOCUMENT_STATUS.VERIFIED,
        uploadedDate: '2024-01-15',
        expiryDate: '2029-01-15',
        fileUrl: null,
    },
    {
        id: 'DOC-004',
        type: 'uniform',
        name: 'Uniform Assignment',
        description: 'Company uniform issuance record',
        status: DOCUMENT_STATUS.UPLOADED,
        uploadedDate: '2024-01-16',
        expiryDate: null,
        fileUrl: null,
    },
    {
        id: 'DOC-005',
        type: 'training_certificate',
        name: 'Safety Training Certificate',
        description: 'Mandatory safety training completion',
        status: DOCUMENT_STATUS.PENDING,
        uploadedDate: null,
        expiryDate: '2026-01-15',
        fileUrl: null,
    },
];

export const documentService = {
    // Get employee documents
    getDocuments: async (employeeId) => {
        await new Promise((resolve) => setTimeout(resolve, 400));

        return {
            success: true,
            data: mockDocuments,
        };
    },

    // Upload document
    uploadDocument: async (documentType, file) => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simulate file upload
        return {
            success: true,
            message: 'Document uploaded successfully',
            data: {
                id: `DOC-${Date.now()}`,
                type: documentType,
                status: DOCUMENT_STATUS.UPLOADED,
                uploadedDate: new Date().toISOString(),
                fileUrl: `/uploads/${file.name}`, // Mock URL
            },
        };
    },

    // Download document
    downloadDocument: async (documentId) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const doc = mockDocuments.find((d) => d.id === documentId);

        if (doc) {
            return {
                success: true,
                data: {
                    ...doc,
                    downloadUrl: `/downloads/${documentId}.pdf`, // Mock URL
                },
            };
        }

        return {
            success: false,
            error: 'Document not found',
        };
    },

    // Get onboarding progress
    getOnboardingProgress: async (employeeId) => {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const total = mockDocuments.length;
        const completed = mockDocuments.filter(
            (d) => d.status === DOCUMENT_STATUS.VERIFIED
        ).length;

        return {
            success: true,
            data: {
                total,
                completed,
                percentage: Math.round((completed / total) * 100),
                pendingDocuments: mockDocuments.filter(
                    (d) => d.status === DOCUMENT_STATUS.PENDING
                ),
            },
        };
    },

    // Auto document verification (automation hook - no logic)
    autoVerifyDocument: async (documentId) => {
        // Placeholder for automated OCR/verification
        console.log('Auto document verification hook called for:', documentId);

        return {
            success: true,
            message: 'Document verification hook ready (not implemented)',
            verified: false,
        };
    },
};

export default documentService;
