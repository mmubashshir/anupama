import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

import type { Block, CollectionConfig } from 'payload';

const QuoteBlock: Block = {
  slug: 'Quote',
  imageURL: 'https://placehold.co/600x400?text=Qoute+Block&font=montserrat',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'QuoteBlock',

  fields: [
    // required
    {
      name: 'quoteHeader',
      type: 'text',
      required: true,
    },
    {
      name: 'quoteText',
      type: 'text',
    },
  ],
};

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'published-date',
      type: 'date',
      defaultValue: () => new Date().toUTCString(),
      admin: {
        date: {
          displayFormat: 'd MMM yyy h:mm:ss ',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            BlocksFeature({
              blocks: [QuoteBlock],
            }),
          ];
        },
      }),
    },
    {
      name: 'blocks fields',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [QuoteBlock],
    },
  ],
};
