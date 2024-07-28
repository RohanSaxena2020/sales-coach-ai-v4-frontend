import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ThankYouPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email, phoneNumber } = location.state || {};

    const handleReturnHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold mb-6">Submission Successful!</h1>
                    <div className="animate-bounce bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <p className="text-lg mb-4">
                        Your call has been successfully submitted. The analysis is running and will be emailed to you at <span className="font-semibold text-red-500">{email}</span> in approximately 5 minutes.
                    </p>
                    <p className="text-lg">
                        You'll also get a text at <span className="font-semibold text-red-500">{phoneNumber}</span> once it's done!
                    </p>
                </div>
                <div className="mt-8">
                    <button 
                        onClick={handleReturnHome}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ThankYouPage;