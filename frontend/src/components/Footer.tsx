import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

interface FooterProps {
    settings?: {
        companyName?: string;
        tagline?: string;
        phoneNumber?: string;
        whatsappNumber?: string;
        email?: string;
        address?: string;
        timings?: string;
        facebookUrl?: string;
        instagramUrl?: string;
        twitterUrl?: string;
        linkedinUrl?: string;
        youtubeUrl?: string;
    };
}

export default function Footer({ settings }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const defaultSettings = {
        companyName: 'AgroPure Commodities',
        tagline: 'Quality Agricultural Raw Materials',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        address: '123 Mandi Road, Agricultural Hub,\nNew Delhi - 110001, India',
        timings: 'Mon - Sat: 9:00 AM - 6:00 PM',
        ...settings,
    };

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Products', href: '/products' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 text-white pt-16 sm:pt-20 lg:pt-24 pb-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-green-800 font-bold text-xl">🌾</span>
                            </div>
                            <h3 className="text-xl font-bold">{defaultSettings.companyName}</h3>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {defaultSettings.tagline}. Your trusted partner for premium quality agricultural raw materials.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {defaultSettings.facebookUrl && (
                                <a href={defaultSettings.facebookUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110">
                                    <FaFacebook className="text-lg" />
                                </a>
                            )}
                            {defaultSettings.instagramUrl && (
                                <a href={defaultSettings.instagramUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110">
                                    <FaInstagram className="text-lg" />
                                </a>
                            )}
                            {defaultSettings.twitterUrl && (
                                <a href={defaultSettings.twitterUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110">
                                    <FaTwitter className="text-lg" />
                                </a>
                            )}
                            {defaultSettings.linkedinUrl && (
                                <a href={defaultSettings.linkedinUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110">
                                    <FaLinkedin className="text-lg" />
                                </a>
                            )}
                            {defaultSettings.youtubeUrl && (
                                <a href={defaultSettings.youtubeUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110">
                                    <FaYoutube className="text-lg" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                                    <FaPhone className="text-green-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <a href={`tel:${defaultSettings.phoneNumber}`} className="text-white hover:text-green-400 transition-colors">
                                        {defaultSettings.phoneNumber}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                                    <FaWhatsapp className="text-green-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">WhatsApp</p>
                                    <a href={`https://wa.me/${defaultSettings.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                                        className="text-white hover:text-green-400 transition-colors">
                                        Chat with us
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                                    <FaEnvelope className="text-green-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <a href={`mailto:${defaultSettings.email}`} className="text-white hover:text-green-400 transition-colors">
                                        {defaultSettings.email}
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Address & Timings */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Visit Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                                    <FaMapMarkerAlt className="text-green-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-white whitespace-pre-line">{defaultSettings.address}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                                    <FaClock className="text-green-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Business Hours</p>
                                    <p className="text-white">{defaultSettings.timings}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-green-800/50 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm text-center sm:text-left">
                            © {currentYear} {defaultSettings.companyName}. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/contact" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
