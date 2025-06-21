import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'heroText1',
      title: 'Hero Text 1 (Top Left)',
      type: 'string',
      description: 'First part of the hero text (e.g., "RO")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroText2',
      title: 'Hero Text 2 (Bottom Right)',
      type: 'string',
      description: 'Second part of the hero text (e.g., "CIO")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'text', rows: 3},
        {name: 'es', title: 'Spanish', type: 'text', rows: 3},
      ],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{type: 'text', rows: 4}],
        },
        {
          name: 'es',
          title: 'Spanish',
          type: 'array',
          of: [{type: 'text', rows: 4}],
        },
      ],
    }),
    defineField({
      name: 'homeAboutDescription',
      title: 'Home About Description',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'text', rows: 3},
        {name: 'es', title: 'Spanish', type: 'text', rows: 3},
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {name: 'usPhone', title: 'US Phone', type: 'string'},
        {name: 'esPhone', title: 'ES Phone', type: 'string'},
        {name: 'email', title: 'Email', type: 'string'},
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Platform', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Site Settings',
      }
    },
  },
})
