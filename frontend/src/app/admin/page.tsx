import Link from 'next/link';
import { FaExternalLinkAlt, FaLock } from 'react-icons/fa';

export default function AdminPage() {
    // The Sanity Studio URL - you can deploy Sanity Studio to a custom domain
    const sanityStudioUrl = 'http://localhost:3333'; // Replace with your deployed Sanity Studio URL

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center">
                    {/* Logo */}
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <FaLock className="text-white text-3xl" />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Access the content management system to update website content, products, and settings.
                    </p>

                    {/* Sanity Studio Link */}
                    <a
                        href={sanityStudioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-[1.02] mb-4"
                    >
                        <span>Open Sanity Studio</span>
                        <FaExternalLinkAlt className="text-sm" />
                    </a>

                    <div className="text-sm text-gray-500 space-y-2">
                        <p>
                            <strong>Note:</strong> Sanity Studio handles its own authentication.
                        </p>
                        <p>
                            You&apos;ll need to log in with your Sanity account credentials.
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-left">
                        <h3 className="font-semibold text-gray-900 mb-3">What you can manage:</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Site Settings (Company info, contact details)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Hero Section (Title, subtitle, background)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>About Section (Company story, stats, mission)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Product Categories & Products</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Customer Reviews</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>FAQs</span>
                            </li>
                        </ul>
                    </div>

                    {/* Back link */}
                    <div className="mt-8">
                        <Link
                            href="/"
                            className="text-green-600 hover:text-green-700 font-medium hover:underline"
                        >
                            ← Back to Website
                        </Link>
                    </div>
                </div>

                {/* Running locally instructions */}
                <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl text-center">
                    <p className="text-green-100 text-sm">
                        <strong>For local development:</strong><br />
                        Run <code className="bg-white/20 px-2 py-0.5 rounded">npm run dev</code> in the backend folder
                    </p>
                </div>
            </div>
        </div>
    );
}
