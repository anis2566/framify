"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset previous status
        setErrorMessage('');

        // Validate email
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        // Submit form
        setFormStatus('submitting');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success!
            setFormStatus('success');
            setEmail('');

            // Reset to idle after 5 seconds
            setTimeout(() => {
                setFormStatus('idle');
            }, 5000);
        } catch (error) {
            setFormStatus('error');
            setErrorMessage('Something went wrong. Please try again.');

            // Reset to idle after 5 seconds
            setTimeout(() => {
                setFormStatus('idle');
            }, 5000);
        }
    };

    return (
        <section className="py-16 sm:py-24 overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 dark:text-white mb-4 tracking-tight">
                        Stay Updated with Our Newsletter
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Join our community and receive the latest updates, tips, and exclusive content directly in your inbox.
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    <div className="bg-background p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email address
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                                        className="block w-full px-4 py-3 rounded-lg text-gray-900 border border-gray-300 
                              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                              transition-all duration-200 outline-none
                              disabled:bg-gray-50 disabled:text-gray-500"
                                        required
                                    />
                                    {errorMessage && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                                        </div>
                                    )}
                                </div>
                                {errorMessage && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        {errorMessage}
                                    </p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                                    className={`
                    w-full flex items-center justify-center gap-2 px-5 py-3 
                    text-base font-medium rounded-lg text-white 
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    transition-all duration-200 ease-in-out
                    ${formStatus === 'success'
                                            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                                        }
                    disabled:opacity-70 disabled:cursor-not-allowed
                    transform hover:scale-[1.01] active:scale-[0.99]
                  `}
                                >
                                    {formStatus === 'submitting' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Subscribing...
                                        </>
                                    ) : formStatus === 'success' ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5" />
                                            Subscribed!
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Subscribe
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                By subscribing, you agree to our <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">Privacy Policy</a>
                                and consent to receive updates from our company.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;