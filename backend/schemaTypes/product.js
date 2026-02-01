import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'productCategory' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'features',
            title: 'Key Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of key features or highlights',
        }),
        defineField({
            name: 'specifications',
            title: 'Specifications',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'value', title: 'Value', type: 'string' },
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'value',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category.name',
            media: 'image',
        },
    },
})
