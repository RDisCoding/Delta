import { client } from '../sanity/client';
import { groq } from 'next-sanity';
import HomePage from '../components/HomePage';

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

  return (
    <HomePage 
      settings={settings}
      hero={hero}
      about={about}
      categories={categories}
      reviews={reviews}
      faqs={faqs}
    />
  );
}