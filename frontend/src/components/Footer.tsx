import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaArrowRight } from 'react-icons/fa';

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
    };
}

export default function Footer({ settings }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const defaultSettings = {
        companyName: 'AgroPure',
        tagline: 'Premium Agricultural Commodities',
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
        { name: 'Contact', href: '/contact' },
    ];

    const products = [
        { name: 'Premium Wheat', href: '/products/wheat' },
        { name: 'Chickpeas', href: '/products/chana' },
        { name: 'Pulses', href: '/products/pulses' },
        { name: 'Rice', href: '/products/rice' },
    ];

    return (
        <footer className="relative bg-[#0d0a08] overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4a853]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#d4a853]/5 rounded-full blur-3xl"></div>

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#d4a853] to-[#c68b2c] rounded-xl flex items-center justify-center">
                                <span className="text-[#1a1410] text-xl">🌾</span>
                            </div>
                            <span className="text-2xl font-bold text-[#fef5e7]">{defaultSettings.companyName}</span>
                        </Link>
                        <p className="text-[#fef5e7]/60 mb-8 leading-relaxed">
                            {defaultSettings.tagline}. Your trusted partner for premium quality agricultural raw materials since 1995.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 glass rounded-lg flex items-center justify-center text-[#fef5e7]/60 hover:text-[#d4a853] hover:border-[#d4a853]/50 transition-all"
                                >
                                    <Icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-[#fef5e7] mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-[#fef5e7]/60 hover:text-[#d4a853] transition-colors"
                                    >
                                        <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-lg font-bold text-[#fef5e7] mb-6">Products</h4>
                        <ul className="space-y-4">
                            {products.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-[#fef5e7]/60 hover:text-[#d4a853] transition-colors"
                                    >
                                        <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-[#fef5e7] mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 group text-[#fef5e7]/60 hover:text-[#d4a853] transition-colors"
                                >
                                    <FaWhatsapp className="text-lg mt-0.5 text-green-500" />
                                    <span>WhatsApp Us</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${defaultSettings.phoneNumber}`}
                                    className="flex items-start gap-3 group text-[#fef5e7]/60 hover:text-[#d4a853] transition-colors"
                                >
                                    <FaPhone className="text-lg mt-0.5" />
                                    <span>{defaultSettings.phoneNumber}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${defaultSettings.email}`}
                                    className="flex items-start gap-3 group text-[#fef5e7]/60 hover:text-[#d4a853] transition-colors"
                                >
                                    <FaEnvelope className="text-lg mt-0.5" />
                                    <span>{defaultSettings.email}</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-[#fef5e7]/60">
                                <FaMapMarkerAlt className="text-lg mt-0.5 flex-shrink-0" />
                                <span className="whitespace-pre-line">{defaultSettings.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="decorative-line my-12"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[#fef5e7]/40 text-sm">
                        © {currentYear} {defaultSettings.companyName}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/contact" className="text-[#fef5e7]/40 hover:text-[#d4a853] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/contact" className="text-[#fef5e7]/40 hover:text-[#d4a853] transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>

            {/* Large decorative text */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
                <div className="text-[20vw] font-black text-[#fef5e7]/[0.02] leading-none text-center whitespace-nowrap">
                    AGROPURE
                </div>
            </div>
        </footer>
    );
}
