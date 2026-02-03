import { client } from '../../../sanity/client';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import CategoryPageClient from '../../../components/CategoryPageClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
    const query = groq`*[_type == "productCategory"]{ "slug": slug.current }`;
    const categories = await client.fetch(query);
    return categories.map((cat: any) => ({ slug: cat.slug }));
}

// Demo products data
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

    if (!category && !demoProducts[slug]) {
        notFound();
    }

    return (
        <CategoryPageClient
            settings={settings}
            category={category}
            products={products}
            allCategories={allCategories}
            slug={slug}
            demoProducts={demoProducts}
        />
    );
}
