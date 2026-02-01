import { client } from '../sanity/client';
import { urlFor } from '../sanity/imageUrl';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaWhatsapp, FaPhone, FaChevronDown, FaLeaf, FaTruck, FaHandshake, FaAward } from 'react-icons/fa';
import FloatingActions from '../components/FloatingActions';
import LocationMap from '../components/LocationMap';
import Footer from '../components/Footer';

// Fetch all homepage data
const getData = async () => {
  const query = groq`{
    "settings": *[_type == "siteSettings"][0],
    "hero": *[_type == "heroSection"][0],
    "about": *[_type == "aboutSection"][0],
    "categories": *[_type == "productCategory"] | order(order asc),
    "reviews": *[_type == "review"] | order(order asc),
    "faqs": *[_type == "faq"] | order(order asc)
  }`;

  return client.fetch(query, {}, { next: { revalidate: 60 } });
};

export default async function Home() {
  const { settings, hero, about, categories, reviews, faqs } = await getData();

  // Default values for demo
  const defaultSettings = {
    companyName: 'AgroPure Commodities',
    phoneNumber: '+91 98765 43210',
    whatsappNumber: '919876543210',
    email: 'info@agropure.com',
    address: '123 Mandi Road, Agricultural Hub\nNew Delhi - 110001, India',
    timings: 'Mon - Sat: 9:00 AM - 6:00 PM',
    ...settings,
  };

  const defaultHero = {
    title: hero?.title || 'Premium Agricultural Raw Materials',
    subtitle: hero?.subtitle || 'Your trusted partner for high-quality wheat, chana, pulses, and grains. Supplying excellence since decades.',
    ctaPrimaryText: hero?.ctaPrimaryText || 'Contact Us',
    ctaPrimaryLink: hero?.ctaPrimaryLink || '#contact',
    ctaSecondaryText: hero?.ctaSecondaryText || 'View Products',
    ctaSecondaryLink: hero?.ctaSecondaryLink || '/products',
    backgroundImage: hero?.backgroundImage,
  };

  const defaultAbout = {
    sectionTitle: about?.sectionTitle || 'About Us',
    heading: about?.heading || 'Trusted Suppliers of Quality Agricultural Products',
    description: about?.description || 'With years of experience in the agricultural commodities market, we specialize in sourcing and supplying premium quality raw materials. Our commitment to quality, transparency, and customer satisfaction has made us a preferred choice for businesses across the country.',
    image: about?.image,
    stats: about?.stats || [
      { value: '25+', label: 'Years Experience' },
      { value: '500+', label: 'Happy Clients' },
      { value: '1000+', label: 'Tons Supplied' },
      { value: '50+', label: 'Product Varieties' },
    ],
  };

  // Demo categories if none exist
  const demoCategories = categories?.length ? categories : [
    { _id: '1', name: 'Wheat', slug: { current: 'wheat' }, description: 'Premium quality wheat varieties including Sharbati, Lokwan, and more.' },
    { _id: '2', name: 'Chana (Chickpeas)', slug: { current: 'chana' }, description: 'High-grade chickpeas perfect for dal, flour, and various preparations.' },
    { _id: '3', name: 'Pulses & Lentils', slug: { current: 'pulses' }, description: 'Wide range of pulses including Moong, Toor, Masoor, and Urad.' },
    { _id: '4', name: 'Rice', slug: { current: 'rice' }, description: 'Basmati and non-basmati rice varieties for all requirements.' },
    { _id: '5', name: 'Spices', slug: { current: 'spices' }, description: 'Quality spices and condiments sourced from premium farms.' },
    { _id: '6', name: 'Oilseeds', slug: { current: 'oilseeds' }, description: 'Groundnut, Mustard, Sesame, and other oilseeds.' },
  ];

  // Demo reviews if none exist
  const demoReviews = reviews?.length ? reviews : [
    { _id: '1', clientName: 'Rajesh Kumar', company: 'Kumar Traders', location: 'Delhi', rating: 5, reviewText: 'Excellent quality products and reliable service. They have been our trusted supplier for over 5 years.' },
    { _id: '2', clientName: 'Priya Sharma', company: 'Sharma Foods', location: 'Mumbai', rating: 5, reviewText: 'The quality of wheat and chana is consistently good. Highly recommend their services!' },
    { _id: '3', clientName: 'Mohammed Ali', company: 'Ali Enterprises', location: 'Hyderabad', rating: 4, reviewText: 'Great communication and timely delivery. The products meet our quality standards.' },
  ];

  // Demo FAQs if none exist
  const demoFaqs = faqs?.length ? faqs : [
    { _id: '1', question: 'What is the minimum order quantity?', answer: 'We cater to both small and bulk orders. Minimum order quantities vary by product, typically starting from 100 kg for most commodities. Contact us for specific requirements.' },
    { _id: '2', question: 'Do you provide samples before bulk orders?', answer: 'Yes, we provide product samples for quality assessment before you place bulk orders. Sample charges may apply and are adjustable against your order.' },
    { _id: '3', question: 'What are your payment terms?', answer: 'We accept various payment methods including bank transfer, cheque, and cash. Payment terms are flexible and can be discussed based on order volume and relationship.' },
    { _id: '4', question: 'Do you deliver across India?', answer: 'Yes, we deliver across all major cities and regions in India. Delivery charges and timelines depend on the location and order quantity.' },
  ];

  return (
    <div className="flex flex-col w-full">
      <FloatingActions phone={defaultSettings.phoneNumber} whatsapp={defaultSettings.whatsappNumber} />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center text-center px-4 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-900">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 z-0">
          {defaultHero.backgroundImage ? (
            <Image
              src={urlFor(defaultHero.backgroundImage).url()}
              alt="Agricultural background"
              fill
              className="object-cover opacity-30"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[url('/images/wheat-field.jpg')] bg-cover bg-center opacity-20"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-900/60 to-green-900/90"></div>
        </div>

        {/* Animated patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-dots"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up px-4 sm:px-8">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-lg mb-2">
            <span className="text-sm sm:text-base font-semibold tracking-wider text-yellow-300">
              🌾 Quality You Can Trust 🌾
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg leading-tight">
            {defaultHero.title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light px-4">
            {defaultHero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 sm:pt-6 px-6 sm:px-0">
            <a
              href={`https://wa.me/${defaultSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white text-base sm:text-lg font-bold rounded-full shadow-2xl shadow-green-900/50 transform hover:scale-105 transition-all duration-300"
            >
              <FaWhatsapp className="text-xl sm:text-2xl" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href={defaultHero.ctaSecondaryLink}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-base sm:text-lg font-bold rounded-full border-2 border-white/40 hover:border-yellow-400 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {defaultHero.ctaSecondaryText}
            </Link>
          </div>

          {/* Quick contact info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 text-gray-300">
            <a href={`tel:${defaultSettings.phoneNumber}`} className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
              <FaPhone />
              <span>{defaultSettings.phoneNumber}</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <FaChevronDown className="text-white/50 text-2xl" />
        </div>
      </section>

      {/* --- FEATURES STRIP --- */}
      <section className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col items-center gap-2 text-green-900">
              <FaLeaf className="text-2xl sm:text-3xl" />
              <span className="font-bold text-sm sm:text-base">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-green-900">
              <FaTruck className="text-2xl sm:text-3xl" />
              <span className="font-bold text-sm sm:text-base">Pan India Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-green-900">
              <FaHandshake className="text-2xl sm:text-3xl" />
              <span className="font-bold text-sm sm:text-base">Trusted Partner</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-green-900">
              <FaAward className="text-2xl sm:text-3xl" />
              <span className="font-bold text-sm sm:text-base">Best Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50/50 via-white to-yellow-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200/15 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
          <div className="relative h-[400px] sm:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group animate-slide-in-left">
            {defaultAbout.image ? (
              <Image
                src={urlFor(defaultAbout.image).url()}
                alt="About us"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                <span className="text-8xl">🌾</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 via-transparent to-transparent"></div>
          </div>

          <div className="space-y-4 sm:space-y-6 animate-slide-in-right">
            <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 rounded-full">
              <span className="text-green-800 text-xs sm:text-sm font-bold tracking-wider">{defaultAbout.sectionTitle?.toUpperCase()}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-800 to-green-900 bg-clip-text text-transparent leading-tight">
              {defaultAbout.heading}
            </h2>

            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 rounded-full"></div>

            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-light">
              {defaultAbout.description}
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
              {defaultAbout.stats?.slice(0, 4).map((stat: any, index: number) => (
                <div key={index} className="bg-gradient-to-br from-white to-green-50/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-green-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors group pt-2"
            >
              Learn More About Us
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section id="products" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-grid"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center relative z-10">
          <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 rounded-full mb-3 sm:mb-4">
            <span className="text-green-800 text-xs sm:text-sm font-bold tracking-wider">OUR PRODUCTS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-800 to-green-900 bg-clip-text text-transparent mb-3 sm:mb-4">
            What We Supply
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-12 sm:mb-16 font-light px-4">
            Explore our wide range of premium agricultural raw materials
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {demoCategories.map((category: any, index: number) => (
              <Link
                key={category._id}
                href={`/products/${category.slug?.current || category.slug}`}
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100/50 hover:border-green-300 card-hover overflow-hidden flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-green-100 to-yellow-50 flex-shrink-0">
                  {category.image ? (
                    <Image
                      src={urlFor(category.image).url()}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl">🌾</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2.5 text-gray-900 group-hover:text-green-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed font-light line-clamp-3 flex-grow">
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

          <div className="mt-10 sm:mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-base font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span>View All Products</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- CONTACT CTA BANNER --- */}
      <section className="bg-gradient-to-r from-green-700 via-green-800 to-green-700 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h3 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
            Ready to Place an Order?
          </h3>
          <p className="text-green-100 text-base sm:text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Contact us via WhatsApp or call for pricing, samples, and bulk orders. We&apos;re here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${defaultSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-green-700 font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <FaWhatsapp className="text-xl sm:text-2xl text-green-600" />
              <span>WhatsApp Now</span>
            </a>
            <a
              href={`tel:${defaultSettings.phoneNumber}`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full transform hover:scale-105 hover:bg-white/10 transition-all duration-300"
            >
              <FaPhone className="text-lg sm:text-xl" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-yellow-50/50 via-white to-green-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-green-100 via-yellow-100 to-green-100 rounded-full mb-3 sm:mb-4">
              <span className="text-green-800 text-xs sm:text-sm font-bold tracking-wider">TESTIMONIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-800 to-green-900 bg-clip-text text-transparent mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Trusted by businesses across India for quality and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {demoReviews.map((review: any, index: number) => (
              <div
                key={review._id}
                className="group bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100/50 hover:border-green-200 card-hover relative overflow-hidden flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-green-200/25 to-yellow-200/25 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg sm:text-xl transition-all duration-300 ${i < review.rating
                            ? "text-yellow-400 group-hover:scale-110"
                            : "text-gray-300"
                          }`}
                        style={{ transitionDelay: `${i * 0.05}s` }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="text-4xl sm:text-5xl text-green-200/60 font-serif leading-none mb-3">&ldquo;</div>

                  <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed font-light flex-grow">
                    {review.reviewText}
                  </p>

                  {/* Divider */}
                  <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full mb-4"></div>

                  <div>
                    <p className="font-bold text-gray-900">{review.clientName}</p>
                    {review.company && (
                      <p className="text-sm text-gray-500">{review.company}</p>
                    )}
                    {review.location && (
                      <p className="text-sm text-green-600">{review.location}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faqs" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/15 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 rounded-full mb-3 sm:mb-4">
              <span className="text-green-800 text-xs sm:text-sm font-bold tracking-wider">FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-800 to-green-900 bg-clip-text text-transparent mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Find answers to common questions about our products and services
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {demoFaqs.map((faq: any, index: number) => (
              <details
                key={faq._id}
                className="group bg-white hover:bg-gradient-to-r hover:from-white hover:to-green-50/30 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-green-100/50 hover:border-green-200"
              >
                <summary className="flex justify-between items-center font-semibold text-base sm:text-lg text-gray-900 list-none">
                  <span className="pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-full transition-transform duration-300 group-open:rotate-180 group-open:bg-gradient-to-br group-open:from-green-500 group-open:to-green-600">
                    <FaChevronDown className="text-green-600 group-open:text-white transition-colors text-sm" />
                  </span>
                </summary>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-100">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed font-light">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- LOCATION MAP --- */}
      <LocationMap embedUrl={defaultSettings.googleMapEmbedUrl} />

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-white to-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4">
              <span className="text-green-800 text-sm font-semibold tracking-wider">GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-800 to-green-900 bg-clip-text text-transparent mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              For orders, inquiries, or samples - reach out to us via WhatsApp or phone. We respond quickly!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Buttons */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h3>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/${defaultSettings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  <FaWhatsapp className="text-2xl" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${defaultSettings.phoneNumber}`}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  <FaPhone className="text-xl" />
                  <span>Call {defaultSettings.phoneNumber}</span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-green-100">
                <p className="text-gray-500 text-sm mb-4">Or send us an inquiry:</p>
                <a
                  href={`mailto:${defaultSettings.email}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {defaultSettings.email}
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send an Inquiry</h3>
              <form action="https://formsubmit.co/info@agropure.com" method="POST" className="space-y-4">
                <input type="hidden" name="_subject" value="New inquiry from AgroPure Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    name="phone"
                    type="tel"
                    className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="Email Address"
                />
                <textarea
                  name="message"
                  className="w-full p-4 bg-gray-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all h-32 resize-none"
                  placeholder="Your requirements (product, quantity, etc.)"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer settings={defaultSettings} />
    </div>
  );
}