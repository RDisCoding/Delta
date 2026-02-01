import { client } from '../../sanity/client';
import { groq } from 'next-sanity';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import FloatingActions from '../../components/FloatingActions';
import LocationMap from '../../components/LocationMap';
import Footer from '../../components/Footer';

// Fetch contact page data
const getData = async () => {
    const query = groq`*[_type == "siteSettings"][0]`;
    return client.fetch(query, {}, { next: { revalidate: 60 } });
};

export default async function ContactPage() {
    const settings = await getData();

    const defaultSettings = {
        companyName: 'AgroPure Commodities',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        address: '123 Mandi Road, Agricultural Hub\nGrain Market, Sector 5\nNew Delhi - 110001, India',
        timings: 'Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed',
        googleMapEmbedUrl: settings?.googleMapEmbedUrl,
        ...settings,
    };

    return (
        <div className="flex flex-col w-full">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-green-900 via-green-800 to-green-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-yellow-400/30 mb-4">
                        <span className="text-yellow-300 text-sm font-semibold tracking-wider">GET IN TOUCH</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Contact Us
                    </h1>
                    <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto">
                        For orders, inquiries, or samples - reach out via WhatsApp or call us. We respond quickly!
                    </p>
                </div>
            </section>

            {/* Quick Contact Buttons */}
            <section className="py-8 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-green-800 hover:bg-green-900 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all"
                        >
                            <FaPhone className="text-xl" />
                            <span>Call {defaultSettings.phoneNumber}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Details & Form */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    Let&apos;s Talk Business
                                </h2>
                                <p className="text-lg text-gray-600">
                                    We&apos;re here to help with all your agricultural raw material needs. Reach out for pricing, samples, or bulk orders.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* WhatsApp - Most Prominent */}
                                <a
                                    href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white group hover:shadow-xl transition-all"
                                >
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <FaWhatsapp className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">WhatsApp (Preferred)</h3>
                                        <p className="text-green-100">Quick responses • Send inquiries anytime</p>
                                        <p className="font-semibold mt-2">Click to Chat →</p>
                                    </div>
                                </a>

                                {/* Phone */}
                                <a
                                    href={`tel:${defaultSettings.phoneNumber}`}
                                    className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-green-100 group hover:shadow-xl hover:border-green-300 transition-all"
                                >
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                        <FaPhone className="text-green-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">Phone</h3>
                                        <p className="text-green-600 font-semibold text-lg">{defaultSettings.phoneNumber}</p>
                                        <p className="text-gray-500 text-sm">Call during business hours</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href={`mailto:${defaultSettings.email}`}
                                    className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-green-100 group hover:shadow-xl hover:border-green-300 transition-all"
                                >
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                        <FaEnvelope className="text-green-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">Email</h3>
                                        <p className="text-green-600 font-semibold">{defaultSettings.email}</p>
                                        <p className="text-gray-500 text-sm">For detailed inquiries</p>
                                    </div>
                                </a>

                                {/* Address */}
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-green-100">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-green-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">Office Address</h3>
                                        <p className="text-gray-700 whitespace-pre-line">{defaultSettings.address}</p>
                                    </div>
                                </div>

                                {/* Timings */}
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-green-100">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaClock className="text-green-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">Business Hours</h3>
                                        <p className="text-gray-700 whitespace-pre-line">{defaultSettings.timings}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-green-100">
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send an Inquiry</h3>
                            <p className="text-gray-600 mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>

                            <form action="https://formsubmit.co/info@agropure.com" method="POST" className="space-y-5">
                                <input type="hidden" name="_subject" value="New inquiry from AgroPure Website - Contact Page" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="text" name="_honey" style={{ display: 'none' }} />

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                            placeholder="+91 98765 43210"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company/Business Name</label>
                                    <input
                                        name="company"
                                        type="text"
                                        className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                        placeholder="Your company name (optional)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Interest</label>
                                    <select
                                        name="product_interest"
                                        className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                                    >
                                        <option value="">Select a product category</option>
                                        <option value="Wheat">Wheat</option>
                                        <option value="Chana">Chana (Chickpeas)</option>
                                        <option value="Pulses">Pulses & Lentils</option>
                                        <option value="Rice">Rice</option>
                                        <option value="Spices">Spices</option>
                                        <option value="Oilseeds">Oilseeds</option>
                                        <option value="Other">Other / Multiple Products</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Requirements *</label>
                                    <textarea
                                        name="message"
                                        className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all h-32 resize-none"
                                        placeholder="Tell us about your requirements (products, quantity, delivery location, etc.)"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    Send Inquiry
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Or directly message us on{' '}
                                    <a
                                        href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 font-semibold hover:underline"
                                    >
                                        WhatsApp
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Map */}
            <LocationMap embedUrl={defaultSettings.googleMapEmbedUrl} />

            {/* Final CTA */}
            <section className="py-12 bg-gradient-to-r from-green-700 via-green-800 to-green-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        We&apos;d Love to Hear From You!
                    </h3>
                    <p className="text-green-100 mb-6">
                        Whether you&apos;re a small business or a large enterprise, we have solutions for you.
                    </p>
                    <a
                        href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm interested in your agricultural products. Can we discuss?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-700 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all"
                    >
                        <FaWhatsapp className="text-2xl text-green-600" />
                        <span>Start a Conversation</span>
                    </a>
                </div>
            </section>

            <Footer settings={defaultSettings} />
        </div>
    );
}
