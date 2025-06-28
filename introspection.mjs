import { spawnSync } from 'child_process';

const result = spawnSync(
  'pnpm',
  [
    'gql-tada generate schema',
    `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}`,
    '--output',
    './schema.graphql',
  ],
  { encoding: 'utf-8', shell: true },
);

if (result.stderr || result.error) {
  console.error(result.stderr);
  process.exit(1);
}

if (result.stdout) {
  console.log(result.stdout);
  process.exit(0);
}
