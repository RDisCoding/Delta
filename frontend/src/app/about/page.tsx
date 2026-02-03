import { client } from '../../sanity/client';
import { groq } from 'next-sanity';
import AboutPage from '../../components/AboutPage';

const getData = async () => {
    const query = groq`{
    "settings": *[_type == "siteSettings"][0],
    "about": *[_type == "aboutSection"][0]
  }`;
    return client.fetch(query, {}, { next: { revalidate: 60 } });
};

export default async function About() {
    const { settings, about } = await getData();
    return <AboutPage settings={settings} about={about} />;
}
