import config from '@payload-config';

import '@payloadcms/next/css';

import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';

import { importMap } from './admin/importMap.js';
import type { ServerFunctionClient } from 'payload';
import type React from 'react';

import './custom.scss';

interface Args {
  children: React.ReactNode;
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

function Layout({ children }: Args) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}

export default Layout;
