'use client';

import { urlFor } from '../sanity/imageUrl';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaPhone, FaArrowRight } from 'react-icons/fa';
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

interface ProductsPageProps {
    settings?: any;
    categories?: any[];
}

export default function ProductsPage({ settings, categories }: ProductsPageProps) {
    useScrollReveal();

    const defaultSettings = {
        companyName: 'AgroPure',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        ...settings,
    };

    const demoCategories = categories?.length ? categories : [
        { _id: '1', name: 'Premium Wheat', slug: { current: 'wheat' }, description: 'Sharbati, Lokwan, MP Wheat - Premium quality wheat varieties for flour mills and food processing.', productCount: 8 },
        { _id: '2', name: 'Chickpeas', slug: { current: 'chana' }, description: 'High-grade Desi & Kabuli Chana for dal manufacturing, exports, and food processing.', productCount: 6 },
        { _id: '3', name: 'Pulses & Lentils', slug: { current: 'pulses' }, description: 'Wide range including Moong, Toor, Masoor, Urad - split and whole varieties.', productCount: 12 },
        { _id: '4', name: 'Basmati Rice', slug: { current: 'rice' }, description: 'Premium aromatic long-grain and medium-grain rice for culinary excellence.', productCount: 10 },
        { _id: '5', name: 'Spices', slug: { current: 'spices' }, description: 'Quality whole and ground spices - turmeric, coriander, cumin, and red chili.', productCount: 15 },
        { _id: '6', name: 'Oilseeds', slug: { current: 'oilseeds' }, description: 'Groundnut, Mustard, Sesame, Soybean for oil extraction and food processing.', productCount: 7 },
        { _id: '7', name: 'Maize', slug: { current: 'maize' }, description: 'Yellow and white maize for food, feed, and industrial applications.', productCount: 4 },
        { _id: '8', name: 'Millets', slug: { current: 'millets' }, description: 'Nutritious Bajra, Jowar, Ragi, and Foxtail Millet for health-conscious consumers.', productCount: 6 },
    ];

    return (
        <div className="flex flex-col w-full grain-overlay bg-[#1a1410]">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#2a1f14] to-[#1a1410]"></div>
                <div className="absolute inset-0 pattern-grid opacity-30"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <span className="text-[#d4a853] text-sm font-semibold uppercase tracking-widest reveal">Our Products</span>
                    <h1 className="text-headline text-[#fef5e7] mt-4 mb-6 reveal" style={{ animationDelay: '0.1s' }}>
                        Premium<br /><span className="text-gradient-gold">Agricultural Commodities</span>
                    </h1>
                    <p className="text-xl text-[#fef5e7]/70 max-w-2xl mx-auto mb-10 reveal" style={{ animationDelay: '0.2s' }}>
                        Explore our wide range of high-quality grains, pulses, and agricultural raw materials
                    </p>

                    <a
                        href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm interested in your products.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center gap-2 reveal"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <FaWhatsapp className="text-green-400" />
                        <span>Inquire on WhatsApp</span>
                    </a>
                </div>
            </section>

            {/* Products Bento Grid */}
            <section className="py-24 sm:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0d0a08]"></div>
                <div className="absolute inset-0 pattern-dots"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="bento-grid">
                        {demoCategories.map((category, i) => {
                            const spans = ['span-6', 'span-6', 'span-4', 'span-4', 'span-4', 'span-6', 'span-6', 'span-12'];
                            const heights = ['h-[380px]', 'h-[380px]', 'h-[340px]', 'h-[340px]', 'h-[340px]', 'h-[340px]', 'h-[340px]', 'h-[280px]'];

                            return (
                                <Link
                                    key={category._id}
                                    href={`/products/${category.slug?.current || category.slug}`}
                                    className={`bento-item ${spans[i] || 'span-6'} ${heights[i] || 'h-[340px]'} glass card-premium group reveal`}
                                    style={{ animationDelay: `${0.1 + i * 0.05}s` }}
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

                                    {/* Product count badge */}
                                    {category.productCount && (
                                        <div className="absolute top-6 right-6 px-3 py-1 glass rounded-full z-10">
                                            <span className="text-sm font-semibold text-[#d4a853]">{category.productCount} Products</span>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                        <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">🌾</span>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-[#fef5e7] mb-2 group-hover:text-[#f0cb7f] transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-[#fef5e7]/60 mb-4 line-clamp-2">{category.description}</p>
                                        <div className="flex items-center gap-2 text-[#d4a853] font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                            <span>View Products</span>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a853] via-[#c68b2c] to-[#d4a853]"></div>
                <div className="absolute inset-0 pattern-grid opacity-10"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h3 className="text-headline text-[#1a1410] mb-6 reveal">
                        Can&apos;t Find What You Need?
                    </h3>
                    <p className="text-xl text-[#1a1410]/70 mb-10 reveal" style={{ animationDelay: '0.1s' }}>
                        We source a wide variety of products. Contact us with your requirements!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center reveal" style={{ animationDelay: '0.2s' }}>
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1410] text-[#fef5e7] font-bold rounded-full shadow-2xl hover:bg-[#2a1f14] transition-all transform hover:scale-105"
                        >
                            <FaWhatsapp className="text-xl text-green-400" />
                            <span>Ask on WhatsApp</span>
                        </a>
                        <a
                            href={`tel:${defaultSettings.phoneNumber}`}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#1a1410] text-[#1a1410] font-bold rounded-full hover:bg-[#1a1410]/10 transition-all transform hover:scale-105"
                        >
                            <FaPhone className="text-lg" />
                            <span>Call Us</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer settings={defaultSettings} />
        </div>
    );
}
