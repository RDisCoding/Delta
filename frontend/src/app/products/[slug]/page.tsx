import { client } from '../../../sanity/client';
import { urlFor } from '../../../sanity/imageUrl';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaPhone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import FloatingActions from '../../../components/FloatingActions';
import Footer from '../../../components/Footer';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
    const query = groq`*[_type == "productCategory"]{ "slug": slug.current }`;
    const categories = await client.fetch(query);
    return categories.map((cat: any) => ({ slug: cat.slug }));
}

// Fetch category and products data
const getData = async (slug: string) => {
    const query = groq`{
    "settings": *[_type == "siteSettings"][0],
    "category": *[_type == "productCategory" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      description,
      image
    },
    "products": *[_type == "product" && category->slug.current == $slug] | order(order asc) {
      _id,
      name,
      slug,
      description,
      image,
      features,
      specifications
    },
    "allCategories": *[_type == "productCategory"] | order(order asc) {
      _id,
      name,
      slug
    }
  }`;

    return client.fetch(query, { slug }, { next: { revalidate: 60 } });
};

export default async function ProductCategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const { settings, category, products, allCategories } = await getData(slug);

    const defaultSettings = {
        companyName: 'AgroPure Commodities',
        phoneNumber: '+91 98765 43210',
        whatsappNumber: '919876543210',
        email: 'info@agropure.com',
        ...settings,
    };

    // Demo data based on slug
    const demoProducts: { [key: string]: any[] } = {
        wheat: [
            { _id: '1', name: 'Sharbati Wheat', description: 'Premium quality Sharbati wheat known for its golden color and high gluten content. Ideal for making soft rotis and bread.', features: ['High Protein Content', 'Golden Color', 'Premium Grade', 'MP Origin'] },
            { _id: '2', name: 'Lokwan Wheat', description: 'Popular variety with excellent taste and aroma. Perfect for all-purpose flour and chapati making.', features: ['Aromatic', 'Versatile Use', 'Maharashtra Origin', 'Consistent Quality'] },
            { _id: '3', name: 'MP Wheat', description: 'High-quality wheat from Madhya Pradesh farms. Known for its purity and nutritional value.', features: ['Pure Quality', 'High Yield', 'Farm Fresh', 'Bulk Available'] },
            { _id: '4', name: 'Durum Wheat', description: 'Hard wheat variety ideal for pasta, semolina, and couscous production.', features: ['High Gluten', 'Pasta Grade', 'Export Quality', 'Semolina Use'] },
        ],
        chana: [
            { _id: '1', name: 'Desi Chana', description: 'Traditional brown chickpeas with rich flavor. Perfect for making chana dal and various Indian dishes.', features: ['Rich Taste', 'High Protein', 'Traditional Variety', 'Uniform Size'] },
            { _id: '2', name: 'Kabuli Chana', description: 'Large white chickpeas ideal for chole, salads, and Middle Eastern cuisines.', features: ['Large Size', 'Creamy Texture', 'Export Quality', 'Premium Grade'] },
            { _id: '3', name: 'Chana Dal', description: 'Split chickpeas ready for cooking. Quick-cooking and versatile for various recipes.', features: ['Split & Polished', 'Quick Cooking', 'Dal Grade', 'Hygenic Processing'] },
        ],
        pulses: [
            { _id: '1', name: 'Toor Dal', description: 'Yellow pigeon peas, also known as Arhar dal. Staple in Indian kitchens for sambar and dal.', features: ['Premium Quality', 'Polished', 'Quick Cooking', 'Rich Protein'] },
            { _id: '2', name: 'Moong Dal', description: 'Green gram split and skinless. Light and easy to digest, perfect for khichdi and soups.', features: ['Easy Digest', 'High Nutrition', 'Skinless', 'Uniform Yellow'] },
            { _id: '3', name: 'Masoor Dal', description: 'Red lentils that cook quickly. Popular for everyday dal preparation across India.', features: ['Fast Cooking', 'Economical', 'Split Variety', 'Rich Iron'] },
            { _id: '4', name: 'Urad Dal', description: 'Black gram used for making dal makhani, idli, and dosa batter.', features: ['South Indian Use', 'High Protein', 'Split/Whole', 'Premium Quality'] },
        ],
        rice: [
            { _id: '1', name: 'Basmati Rice (1121)', description: 'Extra-long grain aromatic rice. Premium export quality with excellent elongation.', features: ['20mm+ Length', 'Aromatic', 'Low GI', 'Aged Rice'] },
            { _id: '2', name: 'Sona Masoori', description: 'Lightweight and aromatic medium-grain rice. Popular in South Indian cuisine.', features: ['Medium Grain', 'Light Weight', 'Low Starch', 'Daily Use'] },
            { _id: '3', name: 'Kolam Rice', description: 'Short grain rice from Maharashtra. Soft and sticky when cooked.', features: ['Short Grain', 'Soft Texture', 'Regional Variety', 'Affordable'] },
        ],
        spices: [
            { _id: '1', name: 'Turmeric (Haldi)', description: 'High curcumin content turmeric from premium farms. Available in whole and powder form.', features: ['High Curcumin', 'Sangli Origin', 'Bright Color', 'Export Quality'] },
            { _id: '2', name: 'Red Chili', description: 'Dried red chilies with perfect heat level. Available in various grades and varieties.', features: ['Guntur Variety', 'High Color', 'Consistent Heat', 'Sorted Quality'] },
            { _id: '3', name: 'Coriander Seeds', description: 'Aromatic coriander seeds for grinding or whole use. Essential spice for Indian cooking.', features: ['Aromatic', 'Clean Seeds', 'MP Origin', 'Bold Size'] },
            { _id: '4', name: 'Cumin Seeds', description: 'Premium quality cumin with strong aroma. Essential for tempering and spice mixes.', features: ['Strong Aroma', 'Gujarat Origin', 'Singapore Quality', 'Uniform Size'] },
        ],
        oilseeds: [
            { _id: '1', name: 'Groundnut', description: 'High oil content groundnuts for oil extraction and food processing.', features: ['High Oil', 'Bold Size', 'Gujarat Origin', 'HPS Quality'] },
            { _id: '2', name: 'Mustard Seeds', description: 'Black and yellow mustard seeds for oil extraction and cooking.', features: ['High Oil', 'Rajasthan Origin', 'Clean Seeds', 'Uniform Size'] },
            { _id: '3', name: 'Sesame Seeds', description: 'White and black sesame seeds for oil, tahini, and culinary uses.', features: ['High Quality', 'Hulled/Natural', 'Export Grade', 'Rich Oil'] },
        ],
        maize: [
            { _id: '1', name: 'Yellow Maize', description: 'Feed and food grade yellow corn. Used for poultry feed, starch, and food products.', features: ['High Starch', 'Feed Grade', 'Food Grade', 'Bulk Available'] },
            { _id: '2', name: 'White Maize', description: 'Food grade white corn for human consumption and specialty products.', features: ['Human Grade', 'Low Moisture', 'Clean Kernels', 'Export Quality'] },
        ],
        millets: [
            { _id: '1', name: 'Bajra (Pearl Millet)', description: 'Nutritious pearl millet rich in iron and fiber. Popular in Rajasthan and Gujarat.', features: ['High Iron', 'Gluten Free', 'Traditional Grain', 'Health Food'] },
            { _id: '2', name: 'Jowar (Sorghum)', description: 'Versatile sorghum grain for flour, porridge, and animal feed.', features: ['Gluten Free', 'High Fiber', 'Multi Use', 'Sustainable Crop'] },
            { _id: '3', name: 'Ragi (Finger Millet)', description: 'Super nutritious millet rich in calcium. Excellent for health-conscious consumers.', features: ['High Calcium', 'Diabetic Friendly', 'Baby Food', 'South Indian Staple'] },
        ],
    };

    // Get category data (from CMS or demo)
    const categoryData = category || {
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        description: `Premium quality ${slug} products sourced from the best farms across India.`,
    };

    // Get products (from CMS or demo)
    const productList = products?.length ? products : (demoProducts[slug] || []);

    if (!categoryData && !demoProducts[slug]) {
        notFound();
    }

    return (
        <div className="flex flex-col w-full">
            <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-green-900 via-green-800 to-green-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Back to All Products</span>
                    </Link>

                    <div className="text-center">
                        <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-yellow-400/30 mb-4">
                            <span className="text-yellow-300 text-sm font-semibold tracking-wider">PRODUCT CATEGORY</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {categoryData.name}
                        </h1>
                        <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto">
                            {categoryData.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="bg-white border-b border-green-100 sticky top-16 sm:top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
                        {(allCategories?.length ? allCategories : Object.keys(demoProducts).map((key, i) => ({ _id: i, name: key.charAt(0).toUpperCase() + key.slice(1), slug: { current: key } }))).map((cat: any) => (
                            <Link
                                key={cat._id}
                                href={`/products/${cat.slug?.current || cat.slug}`}
                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${(cat.slug?.current || cat.slug) === slug
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                                    }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                    {productList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {productList.map((product: any, index: number) => (
                                <div
                                    key={product._id}
                                    className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100/50 hover:border-green-300 overflow-hidden flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-green-100 to-yellow-50">
                                        {product.image ? (
                                            <Image
                                                src={urlFor(product.image).url()}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-6xl">🌾</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                                            {product.description}
                                        </p>

                                        {/* Features */}
                                        {product.features && product.features.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {product.features.slice(0, 4).map((feature: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                                                    >
                                                        <FaCheckCircle className="text-green-500 text-[10px]" />
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* CTA */}
                                        <a
                                            href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm interested in ${product.name} from the ${categoryData.name} category. Please share pricing and availability.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02]"
                                        >
                                            <FaWhatsapp className="text-lg" />
                                            <span>Inquire Now</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <span className="text-6xl mb-4 block">📦</span>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Products Coming Soon</h3>
                            <p className="text-gray-600 mb-6">We&apos;re adding products to this category. Contact us for availability.</p>
                            <a
                                href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm looking for ${categoryData.name} products. Can you help?`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
                            >
                                <FaWhatsapp />
                                <span>Ask on WhatsApp</span>
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-green-700 via-green-800 to-green-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                        Interested in {categoryData.name}?
                    </h3>
                    <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                        Contact us for pricing, samples, and bulk order inquiries. We offer competitive rates and reliable delivery.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`https://wa.me/${defaultSettings.whatsappNumber}?text=Hi, I'm interested in bulk ${categoryData.name} products. Please share your best prices.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-green-700 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all"
                        >
                            <FaWhatsapp className="text-2xl text-green-600" />
                            <span>Get Quote on WhatsApp</span>
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
