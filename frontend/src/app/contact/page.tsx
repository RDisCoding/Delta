import { client } from '../../sanity/client';
import { groq } from 'next-sanity';
import ContactPage from '../../components/ContactPage';

const getData = async () => {
    const query = groq`*[_type == "siteSettings"][0]`;
    return client.fetch(query, {}, { next: { revalidate: 60 } });
};

export default async function Contact() {
    const settings = await getData();
    return <ContactPage settings={settings} />;
}
