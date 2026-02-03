'use client';

import { urlFor } from '../sanity/imageUrl';
import Link from 'next/link';
import Image from 'next/image';
import { FaLeaf, FaTruck, FaHandshake, FaAward, FaCheckCircle, FaWhatsapp, FaPhone, FaArrowRight } from 'react-icons/fa';
import FloatingActions from './FloatingActions';
import Footer from './Footer';
import { useEffect, useRef, useState } from 'react';

// Animation hook for scroll reveals
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

// Counter animation hook
function useCountUp(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime: number;
                    const animate = (timestamp: number) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return { count, ref };
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/[0-9]/g, '');
    const { count, ref } = useCountUp(numericValue);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-gradient-gold mb-2">
                {count}{suffix}
            </div>
            <div className="text-[#fef5e7]/50 text-sm font-medium uppercase tracking-wider">{label}</div>
        </div>
    );
}

interface AboutPageProps {
    settings?: any;
    about?: any;
}

export default function AboutPage({ settings, about }: AboutPageProps) {
    useScrollReveal();

    const defaultSettings = {
        companyName: 'AgroPure',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        ...settings,
    };

    const defaultAbout = {
        heading: about?.heading || 'Your Trusted Partner for Premium Agricultural Raw Materials',
        description: about?.description || 'With decades of experience in the agricultural commodities market, we have established ourselves as a reliable supplier of high-quality raw materials.',
        stats: about?.stats || [
            { value: '25+', label: 'Years Experience' },
            { value: '500+', label: 'Happy Clients' },
            { value: '10K+', label: 'Tons Monthly' },
            { value: '50+', label: 'Product Types' },
        ],
        mission: about?.mission || 'To be the most trusted supplier of agricultural raw materials, ensuring quality, consistency, and fair pricing for all our partners.',
        vision: about?.vision || 'To revolutionize the agricultural supply chain by creating lasting partnerships and delivering excellence in every grain.',
        values: about?.values || ['Quality First', 'Transparency', 'Customer Satisfaction', 'Integrity', 'Reliability'],
    };

    const features = [
        { icon: FaLeaf, title: 'Premium Quality', desc: 'Rigorous quality checks on every batch' },
        { icon: FaTruck, title: 'Reliable Delivery', desc: 'On-time delivery across India' },
        { icon: FaHandshake, title: 'Fair Pricing', desc: 'Competitive rates for all orders' },
        { icon: FaAward, title: 'Expert Support', desc: 'Dedicated team for your needs' },
    ];

    return (
        <div className="flex flex-col w-full grain-overlay bg-[#1a1410]">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#2a1f14] to-[#1a1410]"></div>
                <div className="absolute inset-0 pattern-grid opacity-30"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">About Us</span>
                    <h1 className="text-headline text-[#fef5e7] mt-4 mb-6 reveal" style={{ animationDelay: '0.1s' }}>
                        Our Story of<br /><span className="text-gradient-gold">Excellence</span>
                    </h1>
                    <p className="text-xl text-[#fef5e7]/70 max-w-2xl mx-auto reveal" style={{ animationDelay: '0.2s' }}>
                        Building trust and delivering quality, one grain at a time
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4a853] via-[#e5b964] to-[#d4a853]"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {defaultAbout.stats.map((stat: any, i: number) => (
                            <div key={i} className="text-center reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="text-4xl sm:text-5xl font-black text-[#1a1410] mb-2">{stat.value}</div>
                                <div className="text-[#1a1410]/70 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="py-24 sm:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#1a1410]"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="glass p-8 sm:p-12 rounded-3xl reveal">
                        <h2 className="text-title text-[#fef5e7] mb-6">{defaultAbout.heading}</h2>
                        <p className="text-lg text-[#fef5e7]/70 leading-relaxed mb-6">{defaultAbout.description}</p>
                        <p className="text-lg text-[#fef5e7]/70 leading-relaxed mb-8">
                            We work directly with farmers and agricultural cooperatives to source the finest grains, pulses, and seeds.
                            Our rigorous quality control ensures that every product meets the highest standards.
                        </p>

                        {/* Company Details */}
                        <div className="pt-6 border-t border-[#d4a853]/20 grid sm:grid-cols-2 gap-6">
                            <div>
                                <span className="text-sm font-semibold text-[#d4a853] uppercase tracking-wider">GSTIN</span>
                                <p className="text-xl text-[#fef5e7] font-bold mt-1">24XXXXXXXX1A1ZZ</p>
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-[#d4a853] uppercase tracking-wider">Registration</span>
                                <p className="text-xl text-[#fef5e7] font-bold mt-1">FSSAI Licensed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0d0a08]"></div>
                <div className="absolute inset-0 pattern-dots"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass p-8 sm:p-10 rounded-3xl card-premium reveal">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#c68b2c] flex items-center justify-center mb-6">
                                <FaLeaf className="text-2xl text-[#1a1410]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#fef5e7] mb-4">Our Mission</h3>
                            <p className="text-[#fef5e7]/70 leading-relaxed">{defaultAbout.mission}</p>
                        </div>

                        <div className="glass p-8 sm:p-10 rounded-3xl card-premium reveal" style={{ animationDelay: '0.1s' }}>
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#c68b2c] flex items-center justify-center mb-6">
                                <FaAward className="text-2xl text-[#1a1410]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#fef5e7] mb-4">Our Vision</h3>
                            <p className="text-[#fef5e7]/70 leading-relaxed">{defaultAbout.vision}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#1a1410]"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h3 className="text-headline text-[#fef5e7] mb-12 reveal">Our Core Values</h3>
                    <div className="flex flex-wrap justify-center gap-4 reveal" style={{ animationDelay: '0.1s' }}>
                        {defaultAbout.values.map((value: string, i: number) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-6 py-3 glass rounded-full hover:bg-[#d4a853]/10 transition-all"
                            >
                                <FaCheckCircle className="text-[#d4a853]" />
                                <span className="font-semibold text-[#fef5e7]">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0d0a08]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">Why Us</span>
                        <h3 className="text-headline text-[#fef5e7] mt-4 reveal" style={{ animationDelay: '0.1s' }}>Why Choose Us?</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="glass p-8 rounded-2xl card-premium text-center reveal"
                                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-[#d4a853]/10 flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="text-2xl text-[#d4a853]" />
                                </div>
                                <h4 className="font-bold text-[#fef5e7] mb-2">{feature.title}</h4>
                                <p className="text-[#fef5e7]/60 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a853] via-[#c68b2c] to-[#d4a853]"></div>
                <div className="absolute inset-0 pattern-grid opacity-10"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h3 className="text-headline text-[#1a1410] mb-6 reveal">Ready to Partner?</h3>
                    <p className="text-xl text-[#1a1410]/70 mb-10 reveal" style={{ animationDelay: '0.1s' }}>
                        Contact us today to discuss your requirements
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center reveal" style={{ animationDelay: '0.2s' }}>
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1410] text-[#fef5e7] font-bold rounded-full shadow-2xl hover:bg-[#2a1f14] transition-all transform hover:scale-105"
                        >
                            <FaWhatsapp className="text-xl text-green-400" />
                            <span>WhatsApp Us</span>
                        </a>
                        <a
                            href={`tel:${defaultSettings.phoneNumber}`}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#1a1410] text-[#1a1410] font-bold rounded-full hover:bg-[#1a1410]/10 transition-all transform hover:scale-105"
                        >
                            <FaPhone className="text-lg" />
                            <span>Call Now</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer settings={defaultSettings} />
        </div>
    );
}
