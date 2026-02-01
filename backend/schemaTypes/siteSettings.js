import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'contact', title: 'Contact Details' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    // --- General Info ---
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
      description: 'A short slogan or tagline for the business',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
    }),

    // --- Contact Details ---
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (with Country Code)',
      type: 'string',
      group: 'contact',
      description: 'Include country code, e.g., 919876543210',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      group: 'contact',
      rows: 3,
    }),
    defineField({
      name: 'timings',
      title: 'Business Hours',
      type: 'string',
      group: 'contact',
      description: 'e.g., Mon-Sat: 9:00 AM - 6:00 PM',
    }),
    defineField({
      name: 'googleMapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      group: 'contact',
      description: 'Go to Google Maps -> Share -> Embed a map -> Copy the URL inside src=""',
    }),

    // --- Social Media ---
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter/X URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'logo',
    },
  },
})
