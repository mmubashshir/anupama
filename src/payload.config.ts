import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [],

  secret: '01100f67-31eb-42ff-a76b-d709eb45d197',

  db: postgresAdapter({
    pool: {
      user: 'admin',
      password: 'admin',
      database: 'anupama',
      port: 5433,
    },
  }),

  sharp,
});
