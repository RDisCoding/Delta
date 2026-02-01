import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'aboutSection',
    title: 'About Section',
    type: 'document',
    fields: [
        defineField({
            name: 'sectionTitle',
            title: 'Section Title',
            type: 'string',
            initialValue: 'About Us',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 6,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'About Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', title: 'Value', type: 'string' },
                        { name: 'label', title: 'Label', type: 'string' },
                    ],
                    preview: {
                        select: {
                            title: 'value',
                            subtitle: 'label',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'mission',
            title: 'Our Mission',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'vision',
            title: 'Our Vision',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'values',
            title: 'Our Values',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of core values',
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            media: 'image',
        },
    },
})
