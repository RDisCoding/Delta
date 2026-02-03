'use client';

import { urlFor } from '../sanity/imageUrl';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaPhone, FaArrowLeft, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
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

interface CategoryPageClientProps {
    settings: any;
    category: any;
    products: any[];
    allCategories: any[];
    slug: string;
    demoProducts: { [key: string]: any[] };
}

export default function CategoryPageClient({
    settings,
    category,
    products,
    allCategories,
    slug,
    demoProducts,
}: CategoryPageClientProps) {
    useScrollReveal();

    const defaultSettings = {
        companyName: 'AgroPure',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        ...settings,
    };

    const categoryData = category || {
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        description: `Premium quality ${slug} products sourced from the best farms across India.`,
    };

    const productList = products?.length ? products : (demoProducts[slug] || []);

    return (
        <div className="flex flex-col w-full grain-overlay bg-[#1a1410]">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#2a1f14] to-[#1a1410]"></div>
                <div className="absolute inset-0 pattern-grid opacity-30"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Breadcrumb */}
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-[#d4a853] hover:text-[#f0cb7f] mb-8 transition-colors reveal"
                    >
                        <FaArrowLeft />
                        <span>Back to All Products</span>
                    </Link>

                    <div className="text-center">
                        <span className="inline-block px-4 py-2 glass-gold rounded-full mb-6 reveal" style={{ animationDelay: '0.1s' }}>
                            <span className="text-[#f0cb7f] text-sm font-semibold uppercase tracking-widest">Product Category</span>
                        </span>
                        <h1 className="text-headline text-[#fef5e7] mb-6 reveal" style={{ animationDelay: '0.2s' }}>
                            <span className="text-gradient-gold">{categoryData.name}</span>
                        </h1>
                        <p className="text-xl text-[#fef5e7]/70 max-w-2xl mx-auto reveal" style={{ animationDelay: '0.3s' }}>
                            {categoryData.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="py-4 relative z-40 border-y border-[#d4a853]/20">
                <div className="absolute inset-0 bg-[#1a1410]/95 backdrop-blur-md"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex gap-3 py-2 overflow-x-auto scrollbar-hide">
                        {(allCategories?.length ? allCategories : Object.keys(demoProducts).map((key, i) => ({ _id: String(i), name: key.charAt(0).toUpperCase() + key.slice(1), slug: { current: key } }))).map((cat: any) => (
                            <Link
                                key={cat._id}
                                href={`/products/${cat.slug?.current || cat.slug}`}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${(cat.slug?.current || cat.slug) === slug
                                    ? 'bg-gradient-to-r from-[#d4a853] to-[#c68b2c] text-[#1a1410] shadow-lg'
                                    : 'glass text-[#fef5e7]/70 hover:text-[#fef5e7] hover:bg-[#d4a853]/10'
                                    }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20 sm:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0d0a08]"></div>
                <div className="absolute inset-0 pattern-dots"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    {productList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {productList.map((product: any, index: number) => (
                                <div
                                    key={product._id}
                                    className="glass rounded-2xl overflow-hidden card-premium group reveal flex flex-col"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Image */}
                                    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#2a1f14] to-[#1a1410] overflow-hidden flex-shrink-0">
                                        {product.image ? (
                                            <Image
                                                src={urlFor(product.image).url()}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-7xl group-hover:scale-110 transition-transform duration-500">🌾</span>
                                            </div>
                                        )}
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-transparent to-transparent opacity-60"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#fef5e7] mb-3 group-hover:text-[#f0cb7f] transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-[#fef5e7]/60 leading-relaxed mb-5 line-clamp-3 flex-grow">
                                            {product.description}
                                        </p>

                                        {/* Features */}
                                        {product.features && product.features.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {product.features.slice(0, 4).map((feature: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#d4a853]/10 text-[#d4a853] text-xs font-medium rounded-full border border-[#d4a853]/20"
                                                    >
                                                        <FaCheckCircle className="text-[10px]" />
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* CTA - Always at bottom */}
                                        <a
                                            href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm interested in ${product.name} from the ${categoryData.name} category. Please share pricing and availability.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full btn-premium flex items-center justify-center gap-2 mt-auto"
                                        >
                                            <FaWhatsapp className="text-lg" />
                                            <span>Inquire Now</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <span className="text-7xl mb-6 block">📦</span>
                            <h3 className="text-2xl font-bold text-[#fef5e7] mb-3">Products Coming Soon</h3>
                            <p className="text-[#fef5e7]/60 mb-8 max-w-md mx-auto">
                                We&apos;re adding products to this category. Contact us for availability.
                            </p>
                            <a
                                href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm looking for ${categoryData.name} products. Can you help?`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-premium inline-flex items-center gap-2"
                            >
                                <FaWhatsapp />
                                <span>Ask on WhatsApp</span>
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 sm:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a853] via-[#c68b2c] to-[#d4a853]"></div>
                <div className="absolute inset-0 pattern-grid opacity-10"></div>

                {/* Decorative circles */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h3 className="text-headline text-[#1a1410] mb-6 reveal">
                        Interested in {categoryData.name}?
                    </h3>
                    <p className="text-xl text-[#1a1410]/70 mb-10 max-w-2xl mx-auto reveal" style={{ animationDelay: '0.1s' }}>
                        Contact us for pricing, samples, and bulk order inquiries. We offer competitive rates and reliable delivery.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center reveal" style={{ animationDelay: '0.2s' }}>
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm interested in bulk ${categoryData.name} products. Please share your best prices.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1410] text-[#fef5e7] font-bold rounded-full shadow-2xl hover:bg-[#2a1f14] transition-all transform hover:scale-105"
                        >
                            <FaWhatsapp className="text-xl text-green-400" />
                            <span>Get Quote on WhatsApp</span>
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
