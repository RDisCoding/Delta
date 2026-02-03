import { client } from '../../sanity/client';
import { groq } from 'next-sanity';
import ProductsPage from '../../components/ProductsPage';

const getData = async () => {
    const query = groq`{
    "settings": *[_type == "siteSettings"][0],
    "categories": *[_type == "productCategory"] | order(order asc) {
      _id, name, slug, description, image,
      "productCount": count(*[_type == "product" && references(^._id)])
    }
  }`;
    return client.fetch(query, {}, { next: { revalidate: 60 } });
};

export default async function Products() {
    const { settings, categories } = await getData();
    return <ProductsPage settings={settings} categories={categories} />;
}
