import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'heroSection',
    title: 'Hero Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Hero Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true },
            description: 'High-quality image of agricultural products/fields',
        }),
        defineField({
            name: 'ctaPrimaryText',
            title: 'Primary CTA Button Text',
            type: 'string',
            initialValue: 'Contact Us',
        }),
        defineField({
            name: 'ctaPrimaryLink',
            title: 'Primary CTA Link',
            type: 'string',
            initialValue: '#contact',
        }),
        defineField({
            name: 'ctaSecondaryText',
            title: 'Secondary CTA Button Text',
            type: 'string',
            initialValue: 'View Products',
        }),
        defineField({
            name: 'ctaSecondaryLink',
            title: 'Secondary CTA Link',
            type: 'string',
            initialValue: '/products',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'backgroundImage',
        },
    },
})
