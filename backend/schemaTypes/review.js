import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company/Business Name',
      type: 'string',
      description: 'Optional - Client\'s company or business name',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or region of the client',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional client photo',
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
      title: 'clientName',
      subtitle: 'company',
      media: 'image',
    },
  },
})