import { client } from '../../sanity/client';
import { urlFor } from '../../sanity/imageUrl';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaPhone, FaSearch } from 'react-icons/fa';
import FloatingActions from '../../components/FloatingActions';
import Footer from '../../components/Footer';

// Fetch products page data
const getData = async () => {
    const query = groq`{
    "settings": *[_type == "siteSettings"][0],
    "categories": *[_type == "productCategory"] | order(order asc) {
      _id,
      name,
      slug,
      description,
      image,
      "productCount": count(*[_type == "product" && references(^._id)])
    }
  }`;

    return client.fetch(query, {}, { next: { revalidate: 60 } });
};

export default async function ProductsPage() {
    const { settings, categories } = await getData();

    const defaultSettings = {
        companyName: 'AgroPure Commodities',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        ...settings,
    };

    // Demo categories if none exist
    const demoCategories = categories?.length ? categories : [
        { _id: '1', name: 'Wheat', slug: { current: 'wheat' }, description: 'Premium quality wheat varieties including Sharbati, Lokwan, MP Wheat, and more. Ideal for flour mills and food processing.', productCount: 8 },
        { _id: '2', name: 'Chana (Chickpeas)', slug: { current: 'chana' }, description: 'High-grade chickpeas including Desi Chana, Kabuli Chana, and various grades for dal manufacturing and exports.', productCount: 6 },
        { _id: '3', name: 'Pulses & Lentils', slug: { current: 'pulses' }, description: 'Wide range of pulses including Moong, Toor, Masoor, Urad, and more. Available in split and whole varieties.', productCount: 12 },
        { _id: '4', name: 'Rice', slug: { current: 'rice' }, description: 'Premium Basmati and non-basmati rice varieties. From aromatic long-grain to medium-grain for different culinary needs.', productCount: 10 },
        { _id: '5', name: 'Spices', slug: { current: 'spices' }, description: 'Quality whole and ground spices including turmeric, coriander, cumin, and red chili sourced from premium farms.', productCount: 15 },
        { _id: '6', name: 'Oilseeds', slug: { current: 'oilseeds' }, description: 'Groundnut, Mustard, Sesame, Soybean, and other oilseeds for oil extraction and food processing industries.', productCount: 7 },
        { _id: '7', name: 'Maize (Corn)', slug: { current: 'maize' }, description: 'Yellow and white maize varieties for food, feed, and industrial applications. Available in bulk quantities.', productCount: 4 },
        { _id: '8', name: 'Millets', slug: { current: 'millets' }, description: 'Nutritious millets including Bajra, Jowar, Ragi, and Foxtail Millet. Growing demand for health-conscious consumers.', productCount: 6 },
    ];

    return (
        <div className="flex flex-col w-full">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-green-900 via-green-800 to-green-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-yellow-400/30 mb-4">
                        <span className="text-yellow-300 text-sm font-semibold tracking-wider">OUR PRODUCTS</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Agricultural Raw Materials
                    </h1>
                    <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto mb-8">
                        Explore our wide range of premium quality grains, pulses, and agricultural commodities
                    </p>

                    {/* Quick Contact */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm interested in your products. Please share more details.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all"
                        >
                            <FaWhatsapp className="text-xl text-green-400" />
                            <span>Inquire on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {demoCategories.map((category: any, index: number) => (
                            <Link
                                key={category._id}
                                href={`/products/${category.slug?.current || category.slug}`}
                                className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100/50 hover:border-green-300 overflow-hidden flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative w-full aspect-square bg-gradient-to-br from-green-100 to-yellow-50">
                                    {category.image ? (
                                        <Image
                                            src={urlFor(category.image).url()}
                                            alt={category.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-7xl group-hover:scale-110 transition-transform duration-300">🌾</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Product count badge */}
                                    {category.productCount > 0 && (
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                                            <span className="text-sm font-semibold text-green-700">{category.productCount} Products</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 flex-grow">
                                        {category.description}
                                    </p>

                                    <div className="mt-4 flex items-center text-green-600 font-semibold group-hover:text-green-700">
                                        <span>View Products</span>
                                        <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-green-700 via-green-800 to-green-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                        Can&apos;t Find What You Need?
                    </h3>
                    <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                        We source a wide variety of agricultural products. Contact us with your specific requirements!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm looking for a specific product that I couldn't find on your website. Can you help?`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-green-700 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all"
                        >
                            <FaWhatsapp className="text-2xl text-green-600" />
                            <span>Ask on WhatsApp</span>
                        </a>
                        <a
                            href={`tel:${defaultSettings.phoneNumber}`}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white font-bold rounded-full transform hover:scale-105 hover:bg-white/10 transition-all"
                        >
                            <FaPhone className="text-xl" />
                            <span>Call Us</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer settings={defaultSettings} />
        </div>
    );
}
