import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'class',
  title: 'Class',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Class Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'text', rows: 4},
        {name: 'es', title: 'Spanish', type: 'text', rows: 4},
      ],
    }),
    defineField({
      name: 'type',
      title: 'Class Type',
      type: 'string',
      options: {
        list: [
          {title: 'Heels', value: 'heels'},
          {title: 'Hip Hop', value: 'hip-hop'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Workshop', value: 'workshop'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Class Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'previewVideo',
      title: 'Preview Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'dates',
      title: 'Class Dates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'date', title: 'Date', type: 'datetime'},
            {name: 'duration', title: 'Duration (minutes)', type: 'number'},
            {name: 'capacity', title: 'Capacity', type: 'number'},
            {name: 'price', title: 'Price', type: 'number'},
            {name: 'location', title: 'Location', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'teacher',
      title: 'Teacher',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Set to false to hide this class from the booking page',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'image',
    },
  },
})
