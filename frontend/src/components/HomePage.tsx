'use client';

import { urlFor } from '../sanity/imageUrl';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaWhatsapp, FaPhone, FaArrowRight, FaLeaf, FaTruck, FaHandshake, FaAward, FaQuoteLeft } from 'react-icons/fa';
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

// Animated counter component
function AnimatedCounter({ value, label }: { value: string; label: string }) {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/[0-9]/g, '');
    const { count, ref } = useCountUp(numericValue);

    return (
        <div ref={ref} className="text-center">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-gradient-gold mb-2">
                {count}{suffix}
            </div>
            <div className="text-[#fef5e7]/50 text-sm sm:text-base font-medium uppercase tracking-wider">{label}</div>
        </div>
    );
}

interface HomePageProps {
    settings?: any;
    hero?: any;
    about?: any;
    categories?: any[];
    reviews?: any[];
    faqs?: any[];
}

export default function HomePage({
    settings, hero, about, categories, reviews, faqs
}: HomePageProps) {
    useScrollReveal();

    // Default values
    const defaultSettings = {
        companyName: 'AgroPure',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        address: '123 Mandi Road, Agricultural Hub\nNew Delhi - 110001, India',
        timings: 'Mon - Sat: 9:00 AM - 6:00 PM',
        ...settings,
    };

    const defaultHero = {
        title: hero?.title || 'Premium Grains & Agricultural Excellence',
        subtitle: hero?.subtitle || 'Sourcing the finest agricultural raw materials from trusted farms across India.',
        backgroundImage: hero?.backgroundImage,
    };

    const defaultAbout = {
        heading: about?.heading || 'Trusted by Industry Leaders',
        description: about?.description || 'With decades of expertise in agricultural commodities, we deliver excellence in every grain.',
        stats: about?.stats || [
            { value: '25+', label: 'Years Experience' },
            { value: '500+', label: 'Happy Clients' },
            { value: '10K+', label: 'Tons Monthly' },
            { value: '50+', label: 'Product Types' },
        ],
    };

    const demoCategories = categories?.length ? categories : [
        { _id: '1', name: 'Premium Wheat', slug: { current: 'wheat' }, description: 'Sharbati, Lokwan & MP varieties' },
        { _id: '2', name: 'Chickpeas', slug: { current: 'chana' }, description: 'Desi & Kabuli Chana grades' },
        { _id: '3', name: 'Pulses', slug: { current: 'pulses' }, description: 'Moong, Toor, Masoor, Urad' },
        { _id: '4', name: 'Basmati Rice', slug: { current: 'rice' }, description: 'Aromatic long-grain rice' },
        { _id: '5', name: 'Spices', slug: { current: 'spices' }, description: 'Turmeric, Cumin, Coriander' },
        { _id: '6', name: 'Oilseeds', slug: { current: 'oilseeds' }, description: 'Groundnut, Mustard, Sesame' },
    ];

    const demoReviews = reviews?.length ? reviews : [
        { _id: '1', clientName: 'Rajesh Kumar', company: 'Kumar Traders', rating: 5, reviewText: 'Exceptional quality and reliable service. The best supplier we have worked with in 15 years.' },
        { _id: '2', clientName: 'Priya Sharma', company: 'Sharma Foods', rating: 5, reviewText: 'Outstanding wheat quality. Their commitment to excellence is unmatched in the industry.' },
        { _id: '3', clientName: 'Mohammed Ali', company: 'Ali Enterprises', rating: 5, reviewText: 'Professional team, premium products. Highly recommend for bulk agricultural supplies.' },
        { _id: '4', clientName: 'Anita Patel', company: 'Patel Exports', rating: 5, reviewText: 'Consistent quality every single time. True partners in our success.' },
    ];

    const features = [
        { icon: FaLeaf, title: 'Premium Quality', desc: 'Handpicked from finest farms' },
        { icon: FaTruck, title: 'Pan India Delivery', desc: 'Reliable logistics network' },
        { icon: FaHandshake, title: 'Trusted Partner', desc: '25+ years of excellence' },
        { icon: FaAward, title: 'Best Prices', desc: 'Competitive market rates' },
    ];

    return (
        <div className="flex flex-col w-full grain-overlay bg-[#1a1410]">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#2a1f14] to-[#1a1410]"></div>

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4a853]/5 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#d4a853]/5 rounded-full blur-3xl animate-float-subtle"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 pattern-grid opacity-30"></div>

                {/* Floating grain particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-3 h-3 bg-[#d4a853]/20 rounded-full animate-float-slow"
                            style={{
                                left: `${10 + i * 12}%`,
                                top: `${20 + (i % 3) * 25}%`,
                                animationDelay: `${i * 0.5}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-3 px-6 py-3 glass-gold rounded-full mb-8 reveal"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <span className="text-2xl">🌾</span>
                        <span className="text-sm sm:text-base font-semibold text-[#f0cb7f] tracking-wide">
                            PREMIUM AGRICULTURAL COMMODITIES
                        </span>
                        <span className="text-2xl">🌾</span>
                    </div>

                    {/* Main headline - giant animated text */}
                    <h1 className="text-display text-[#fef5e7] mb-6 reveal" style={{ animationDelay: '0.4s' }}>
                        <span className="block">The Finest</span>
                        <span className="block text-gradient-gold">Grains & Seeds</span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-xl sm:text-2xl lg:text-3xl text-[#fef5e7]/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed reveal"
                        style={{ animationDelay: '0.6s' }}
                    >
                        {defaultHero.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center reveal"
                        style={{ animationDelay: '0.8s' }}
                    >
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-premium flex items-center gap-3"
                        >
                            <FaWhatsapp className="text-xl" />
                            <span>Get Quote on WhatsApp</span>
                        </a>
                        <Link href="/products" className="btn-secondary flex items-center gap-3">
                            <span>Explore Products</span>
                            <FaArrowRight />
                        </Link>
                    </div>

                    {/* Quick stats banner */}
                    <div
                        className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-20 reveal"
                        style={{ animationDelay: '1s' }}
                    >
                        {['25+ Years', '500+ Clients', 'Pan India'].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2 text-[#fef5e7]/50">
                                <div className="w-2 h-2 bg-[#d4a853] rounded-full"></div>
                                <span className="text-sm sm:text-base font-medium">{stat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="scroll-indicator">
                    <span className="text-[#fef5e7]/50 text-sm uppercase tracking-widest">Scroll</span>
                    <div className="scroll-indicator-line"></div>
                </div>
            </section>

            {/* ===== FEATURES MARQUEE ===== */}
            <section className="py-6 bg-gradient-to-r from-[#d4a853] via-[#e5b964] to-[#d4a853] overflow-hidden">
                <div className="marquee-container">
                    <div className="marquee-content animate-marquee">
                        {[...features, ...features, ...features].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-[#1a1410]">
                                <feature.icon className="text-xl" />
                                <span className="font-bold text-sm sm:text-base whitespace-nowrap">{feature.title}</span>
                                <span className="text-[#1a1410]/60">•</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ABOUT / STATS SECTION ===== */}
            <section className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#1a1410] to-[#0d0a08]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Section header */}
                    <div className="text-center mb-20">
                        <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">
                            Why Choose Us
                        </span>
                        <h2 className="text-headline text-[#fef5e7] mt-4 reveal" style={{ animationDelay: '0.1s' }}>
                            {defaultAbout.heading}
                        </h2>
                        <div className="decorative-line w-32 mx-auto mt-6 reveal" style={{ animationDelay: '0.2s' }}></div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-20">
                        {defaultAbout.stats.map((stat: any, i: number) => (
                            <div key={i} className="reveal" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                                <AnimatedCounter value={stat.value} label={stat.label} />
                            </div>
                        ))}
                    </div>

                    {/* Feature cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="glass p-8 rounded-2xl card-premium reveal"
                                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#c68b2c] flex items-center justify-center mb-6">
                                    <feature.icon className="text-2xl text-[#1a1410]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#fef5e7] mb-2">{feature.title}</h3>
                                <p className="text-[#fef5e7]/60">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PRODUCTS BENTO GRID ===== */}
            <section className="py-24 sm:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0d0a08]"></div>
                <div className="absolute inset-0 pattern-dots"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Section header */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
                        <div>
                            <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">
                                Our Products
                            </span>
                            <h2 className="text-headline text-[#fef5e7] mt-4 reveal" style={{ animationDelay: '0.1s' }}>
                                Premium<br />Commodities
                            </h2>
                        </div>
                        <Link
                            href="/products"
                            className="btn-secondary self-start lg:self-auto reveal"
                            style={{ animationDelay: '0.2s' }}
                        >
                            View All Products
                        </Link>
                    </div>

                    {/* Bento Grid */}
                    <div className="bento-grid">
                        {demoCategories.slice(0, 6).map((category, i) => {
                            const spans = ['span-6', 'span-6', 'span-4', 'span-4', 'span-4', 'span-12'];
                            const heights = ['h-[400px]', 'h-[400px]', 'h-[350px]', 'h-[350px]', 'h-[350px]', 'h-[300px]'];

                            return (
                                <Link
                                    key={category._id}
                                    href={`/products/${category.slug?.current || category.slug}`}
                                    className={`bento-item ${spans[i]} ${heights[i]} glass card-premium group reveal`}
                                    style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                                >
                                    {/* Background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4a853]/10 via-transparent to-[#d4a853]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                    {/* Image if available */}
                                    {category.image && (
                                        <Image
                                            src={urlFor(category.image).url()}
                                            alt={category.name}
                                            fill
                                            className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                                        />
                                    )}

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                        <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">🌾</span>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-[#fef5e7] mb-2 group-hover:text-[#f0cb7f] transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-[#fef5e7]/60 mb-4">{category.description}</p>
                                        <div className="flex items-center gap-2 text-[#d4a853] font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                            <span>Explore</span>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <section className="py-24 sm:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a08] via-[#1a1410] to-[#0d0a08]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">
                            Testimonials
                        </span>
                        <h2 className="text-headline text-[#fef5e7] mt-4 reveal" style={{ animationDelay: '0.1s' }}>
                            Trusted by Leaders
                        </h2>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {demoReviews.map((review, i) => (
                            <div
                                key={review._id}
                                className="glass p-8 rounded-2xl card-premium reveal flex flex-col h-full"
                                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <FaStar key={j} className="text-[#d4a853]" />
                                    ))}
                                </div>
                                <FaQuoteLeft className="text-3xl text-[#d4a853]/30 mb-4" />
                                <p className="text-[#fef5e7] text-lg mb-6 leading-relaxed flex-grow">
                                    &ldquo;{review.reviewText}&rdquo;
                                </p>
                                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#d4a853]/10">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4a853] to-[#c68b2c] flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#1a1410] font-bold text-lg">
                                            {review.clientName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#fef5e7]">{review.clientName}</p>
                                        <p className="text-[#d4a853] text-sm">{review.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="py-24 sm:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#1a1410]"></div>
                <div className="absolute inset-0 pattern-dots"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">
                            FAQ
                        </span>
                        <h2 className="text-headline text-[#fef5e7] mt-4 reveal" style={{ animationDelay: '0.1s' }}>
                            Common Questions
                        </h2>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {[
                            {
                                q: 'What is your minimum order quantity?',
                                a: 'Our minimum order varies by product category. For grains and pulses, we typically require a minimum of 1 metric ton. For smaller quantities, please contact us to discuss your specific needs.',
                            },
                            {
                                q: 'Do you provide samples before bulk orders?',
                                a: 'Yes, we provide samples for quality assessment before bulk orders. Sample charges apply but are adjusted against your first order. Contact us on WhatsApp to request samples.',
                            },
                            {
                                q: 'What are your payment terms?',
                                a: 'We offer flexible payment options including advance payment, letter of credit (LC), and credit terms for established customers. Specific terms are discussed based on order size and relationship.',
                            },
                            {
                                q: 'Do you deliver across India?',
                                a: 'Yes, we deliver pan-India with reliable logistics partners. Delivery timelines depend on your location and order volume. Express delivery options are also available.',
                            },
                            {
                                q: 'How do you ensure product quality?',
                                a: 'Every batch undergoes rigorous quality testing including moisture content, purity, and grade verification. We provide quality certificates and can arrange third-party inspections on request.',
                            },
                        ].map((faq, i) => (
                            <details
                                key={i}
                                className="glass rounded-2xl overflow-hidden group reveal"
                                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                            >
                                <summary className="cursor-pointer p-6 text-lg font-bold text-[#fef5e7] flex items-center justify-between hover:bg-[#d4a853]/5 transition-colors">
                                    <span>{faq.q}</span>
                                    <span className="text-[#d4a853] text-2xl transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="px-6 pb-6 text-[#fef5e7]/70 leading-relaxed border-t border-[#d4a853]/10 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-24 sm:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a853] via-[#c68b2c] to-[#d4a853]"></div>
                <div className="absolute inset-0 pattern-grid opacity-10"></div>

                {/* Decorative circles */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h2 className="text-headline text-[#1a1410] mb-6 reveal">
                        Ready to Place<br />an Order?
                    </h2>
                    <p className="text-xl sm:text-2xl text-[#1a1410]/70 mb-12 max-w-2xl mx-auto reveal" style={{ animationDelay: '0.1s' }}>
                        Get in touch for pricing, samples, and bulk orders. We respond within hours.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center reveal" style={{ animationDelay: '0.2s' }}>
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1410] text-[#fef5e7] font-bold rounded-full shadow-2xl hover:bg-[#2a1f14] transition-all transform hover:scale-105"
                        >
                            <FaWhatsapp className="text-xl text-green-400" />
                            <span>WhatsApp Now</span>
                        </a>
                        <a
                            href={`tel:${defaultSettings.phoneNumber}`}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#1a1410] text-[#1a1410] font-bold rounded-full hover:bg-[#1a1410]/10 transition-all transform hover:scale-105"
                        >
                            <FaPhone className="text-lg" />
                            <span>Call Us</span>
                        </a>
                    </div>
                </div>
            </section>


            {/* ===== FOOTER ===== */}
            <Footer settings={defaultSettings} />
        </div>
    );
}
