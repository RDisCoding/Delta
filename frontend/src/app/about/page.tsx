import { client } from '../../sanity/client';
import { urlFor } from '../../sanity/imageUrl';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaTruck, FaHandshake, FaAward, FaCheckCircle, FaWhatsapp, FaPhone } from 'react-icons/fa';
import FloatingActions from '../../components/FloatingActions';
import Footer from '../../components/Footer';

// Fetch about page data
const getData = async () => {
    const query = groq`{
    "settings": *[_type == "siteSettings"][0],
    "about": *[_type == "aboutSection"][0]
  }`;

    return client.fetch(query, {}, { next: { revalidate: 60 } });
};

export default async function AboutPage() {
    const { settings, about } = await getData();

    const defaultSettings = {
        companyName: 'AgroPure Commodities',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        address: '123 Mandi Road, Agricultural Hub\nNew Delhi - 110001, India',
        timings: 'Mon - Sat: 9:00 AM - 6:00 PM',
        ...settings,
    };

    const defaultAbout = {
        heading: about?.heading || 'Your Trusted Partner for Premium Agricultural Raw Materials',
        description: about?.description || 'With decades of experience in the agricultural commodities market, we have established ourselves as a reliable supplier of high-quality raw materials. Our journey began with a simple mission - to bridge the gap between farmers and businesses by providing consistent, quality products at fair prices.',
        image: about?.image,
        stats: about?.stats || [
            { value: '25+', label: 'Years of Experience' },
            { value: '500+', label: 'Satisfied Clients' },
            { value: '1000+', label: 'Tons Supplied Monthly' },
            { value: '50+', label: 'Product Varieties' },
        ],
        mission: about?.mission || 'To be the most trusted supplier of agricultural raw materials, ensuring quality, consistency, and fair pricing for all our partners.',
        vision: about?.vision || 'To revolutionize the agricultural supply chain by creating lasting partnerships and delivering excellence in every grain.',
        values: about?.values || ['Quality First', 'Transparency', 'Customer Satisfaction', 'Integrity', 'Reliability'],
    };

    return (
        <div className="flex flex-col w-full">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-green-900 via-green-800 to-green-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-yellow-400/30 mb-4">
                        <span className="text-yellow-300 text-sm font-semibold tracking-wider">ABOUT US</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Know Our Story
                    </h1>
                    <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto">
                        Building trust, one grain at a time
                    </p>
                </div>
            </section>

            {/* Main About Content */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Image */}
                        <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            {defaultAbout.image ? (
                                <Image
                                    src={urlFor(defaultAbout.image).url()}
                                    alt="About us"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                                    <span className="text-9xl">🌾</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                {defaultAbout.heading}
                            </h2>
                            <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {defaultAbout.description}
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We work directly with farmers and agricultural cooperatives to source the finest grains, pulses, and seeds. Our rigorous quality control ensures that every product meets the highest standards before reaching our clients.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-green-700 via-green-800 to-green-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-grid"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {defaultAbout.stats.map((stat: any, index: number) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-green-100 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Mission */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 sm:p-10 rounded-3xl border border-green-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <FaLeaf className="text-white text-2xl" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {defaultAbout.mission}
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 sm:p-10 rounded-3xl border border-yellow-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <FaAward className="text-white text-2xl" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {defaultAbout.vision}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">Our Core Values</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {defaultAbout.values.map((value: string, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-green-100 hover:shadow-lg hover:border-green-300 transition-all"
                            >
                                <FaCheckCircle className="text-green-500" />
                                <span className="font-semibold text-gray-800">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We stand apart through our commitment to quality and customer service
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 text-center hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FaLeaf className="text-green-600 text-2xl" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Premium Quality</h4>
                            <p className="text-gray-600 text-sm">Rigorous quality checks on every batch</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 text-center hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FaTruck className="text-green-600 text-2xl" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Reliable Delivery</h4>
                            <p className="text-gray-600 text-sm">On-time delivery across India</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 text-center hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FaHandshake className="text-green-600 text-2xl" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Fair Pricing</h4>
                            <p className="text-gray-600 text-sm">Competitive rates for all orders</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 text-center hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FaAward className="text-green-600 text-2xl" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Expert Support</h4>
                            <p className="text-gray-600 text-sm">Dedicated team for your needs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-green-700 via-green-800 to-green-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                        Ready to Partner With Us?
                    </h3>
                    <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss your requirements. We&apos;re here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-green-700 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all"
                        >
                            <FaWhatsapp className="text-2xl text-green-600" />
                            <span>WhatsApp Us</span>
                        </a>
                        <a
                            href={`tel:${defaultSettings.phoneNumber}`}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white font-bold rounded-full transform hover:scale-105 hover:bg-white/10 transition-all"
                        >
                            <FaPhone className="text-xl" />
                            <span>Call Now</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer settings={defaultSettings} />
        </div>
    );
}
