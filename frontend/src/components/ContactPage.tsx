'use client';

import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import FloatingActions from './FloatingActions';
import Footer from './Footer';
import { useEffect } from 'react';

function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);
}

interface ContactPageProps {
    settings?: any;
}

export default function ContactPage({ settings }: ContactPageProps) {
    useScrollReveal();

    const defaultSettings = {
        companyName: 'AgroPure',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        address: '123 Mandi Road, Agricultural Hub\nGrain Market, Sector 5\nNew Delhi - 110001, India',
        timings: 'Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed',
        googleMapEmbedUrl: settings?.googleMapEmbedUrl,
        ...settings,
    };

    return (
        <div className="flex flex-col w-full grain-overlay bg-[#1a1410]">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#2a1f14] to-[#1a1410]"></div>
                <div className="absolute inset-0 pattern-grid opacity-30"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">Get In Touch</span>
                    <h1 className="text-headline text-[#fef5e7] mt-4 mb-6 reveal" style={{ animationDelay: '0.1s' }}>
                        Let&apos;s Talk<br /><span className="text-gradient-gold">Business</span>
                    </h1>
                    <p className="text-xl text-[#fef5e7]/70 max-w-2xl mx-auto reveal" style={{ animationDelay: '0.2s' }}>
                        For orders, inquiries, or samples - reach out and we&apos;ll respond within hours
                    </p>
                </div>
            </section>

            {/* Quick Contact Buttons */}
            <section className="py-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4a853] via-[#e5b964] to-[#d4a853]"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all"
                        >
                            <FaWhatsapp className="text-2xl" />
                            <span>Chat on WhatsApp</span>
                        </a>
                        <a
                            href={`tel:${defaultSettings.phoneNumber}`}
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1410] text-[#fef5e7] font-bold rounded-full shadow-lg transform hover:scale-105 transition-all"
                        >
                            <FaPhone className="text-xl" />
                            <span>Call {defaultSettings.phoneNumber}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Details & Form */}
            <section className="py-24 sm:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#1a1410]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="reveal">
                                <h2 className="text-title text-[#fef5e7] mb-4">
                                    We&apos;d Love to Hear From You
                                </h2>
                                <p className="text-lg text-[#fef5e7]/70">
                                    Whether you need pricing, samples, or bulk orders - we&apos;re here to help.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* WhatsApp - Most Prominent */}
                                <a
                                    href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white group hover:shadow-xl transition-all reveal"
                                    style={{ animationDelay: '0.1s' }}
                                >
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <FaWhatsapp className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">WhatsApp (Preferred)</h3>
                                        <p className="text-green-100 text-sm">Quick responses • Send inquiries anytime</p>
                                        <p className="font-semibold mt-2 flex items-center gap-2">
                                            <span>Click to Chat</span>
                                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </p>
                                    </div>
                                </a>

                                {/* Phone */}
                                <a
                                    href={`tel:${defaultSettings.phoneNumber}`}
                                    className="flex items-start gap-4 p-6 glass rounded-2xl group hover:bg-[#d4a853]/10 transition-all reveal"
                                    style={{ animationDelay: '0.2s' }}
                                >
                                    <div className="w-14 h-14 bg-[#d4a853]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a853]/20 transition-colors">
                                        <FaPhone className="text-[#d4a853] text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[#fef5e7] mb-1">Phone</h3>
                                        <p className="text-[#d4a853] font-semibold text-lg">{defaultSettings.phoneNumber}</p>
                                        <p className="text-[#fef5e7]/50 text-sm">Call during business hours</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href={`mailto:${defaultSettings.email}`}
                                    className="flex items-start gap-4 p-6 glass rounded-2xl group hover:bg-[#d4a853]/10 transition-all reveal"
                                    style={{ animationDelay: '0.3s' }}
                                >
                                    <div className="w-14 h-14 bg-[#d4a853]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a853]/20 transition-colors">
                                        <FaEnvelope className="text-[#d4a853] text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[#fef5e7] mb-1">Email</h3>
                                        <p className="text-[#d4a853] font-semibold">{defaultSettings.email}</p>
                                        <p className="text-[#fef5e7]/50 text-sm">For detailed inquiries</p>
                                    </div>
                                </a>

                                {/* Address */}
                                <div className="flex items-start gap-4 p-6 glass rounded-2xl reveal" style={{ animationDelay: '0.4s' }}>
                                    <div className="w-14 h-14 bg-[#d4a853]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-[#d4a853] text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[#fef5e7] mb-1">Office Address</h3>
                                        <p className="text-[#fef5e7]/70 whitespace-pre-line">{defaultSettings.address}</p>
                                    </div>
                                </div>

                                {/* Timings */}
                                <div className="flex items-start gap-4 p-6 glass rounded-2xl reveal" style={{ animationDelay: '0.5s' }}>
                                    <div className="w-14 h-14 bg-[#d4a853]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaClock className="text-[#d4a853] text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[#fef5e7] mb-1">Business Hours</h3>
                                        <p className="text-[#fef5e7]/70 whitespace-pre-line">{defaultSettings.timings}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="glass p-8 sm:p-10 rounded-3xl reveal" style={{ animationDelay: '0.3s' }}>
                            <h3 className="text-2xl font-bold text-[#fef5e7] mb-2">Send an Inquiry</h3>
                            <p className="text-[#fef5e7]/60 mb-8">Fill out the form and we&apos;ll get back within 24 hours.</p>

                            <form action="https://formsubmit.co/info@agropure.com" method="POST" className="space-y-5">
                                <input type="hidden" name="_subject" value="New inquiry from AgroPure Website" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="text" name="_honey" style={{ display: 'none' }} />

                                <div>
                                    <label className="block text-sm font-semibold text-[#fef5e7]/70 mb-2">Your Name *</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="w-full p-4 bg-[#0d0a08] border border-[#d4a853]/20 rounded-xl focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853] outline-none transition-all text-[#fef5e7] placeholder:text-[#fef5e7]/30"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#fef5e7]/70 mb-2">Phone *</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className="w-full p-4 bg-[#0d0a08] border border-[#d4a853]/20 rounded-xl focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853] outline-none transition-all text-[#fef5e7] placeholder:text-[#fef5e7]/30"
                                            placeholder="+91 98765 43210"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#fef5e7]/70 mb-2">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full p-4 bg-[#0d0a08] border border-[#d4a853]/20 rounded-xl focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853] outline-none transition-all text-[#fef5e7] placeholder:text-[#fef5e7]/30"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#fef5e7]/70 mb-2">Product Interest</label>
                                    <select
                                        name="product_interest"
                                        className="w-full p-4 bg-[#0d0a08] border border-[#d4a853]/20 rounded-xl focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853] outline-none transition-all text-[#fef5e7]"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Wheat">Wheat</option>
                                        <option value="Chana">Chickpeas</option>
                                        <option value="Pulses">Pulses & Lentils</option>
                                        <option value="Rice">Rice</option>
                                        <option value="Spices">Spices</option>
                                        <option value="Other">Other / Multiple</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#fef5e7]/70 mb-2">Requirements *</label>
                                    <textarea
                                        name="message"
                                        className="w-full p-4 bg-[#0d0a08] border border-[#d4a853]/20 rounded-xl focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853] outline-none transition-all h-32 resize-none text-[#fef5e7] placeholder:text-[#fef5e7]/30"
                                        placeholder="Products, quantity, delivery location..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-premium"
                                >
                                    Send Inquiry
                                </button>

                                <p className="text-center text-sm text-[#fef5e7]/50">
                                    Or message us on{' '}
                                    <a
                                        href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-500 font-semibold hover:underline"
                                    >
                                        WhatsApp
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Map Section */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0d0a08]"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-10">
                        <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">Location</span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#fef5e7] mt-3 reveal" style={{ animationDelay: '0.1s' }}>
                            Find Us Here
                        </h3>
                    </div>
                    <div className="glass rounded-3xl overflow-hidden h-[300px] lg:h-[450px] reveal" style={{ animationDelay: '0.2s' }}>
                        {defaultSettings.googleMapEmbedUrl ? (
                            <iframe
                                src={defaultSettings.googleMapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(50%) contrast(1.1) brightness(0.9)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Location Map"
                            />
                        ) : (
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9012755464685!2d72.5012!3d23.0145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAwJzUyLjIiTiA3MsKwMzAnMDQuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(50%) contrast(1.1) brightness(0.9)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Location Map"
                            />
                        )}
                    </div>
                </div>
            </section>
            {/* Final CTA */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4a853] via-[#c68b2c] to-[#d4a853]"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1410] mb-4 reveal">
                        We&apos;re Ready to Partner With You!
                    </h3>
                    <a
                        href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1410] text-[#fef5e7] font-bold rounded-full shadow-lg transform hover:scale-105 transition-all reveal"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <FaWhatsapp className="text-xl text-green-400" />
                        <span>Start a Conversation</span>
                    </a>
                </div>
            </section>

            <Footer settings={defaultSettings} />
        </div>
    );
}
