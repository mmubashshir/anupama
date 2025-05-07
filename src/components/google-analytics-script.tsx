import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

import { env } from '~/env';

function GoogleAnalyticsScript() {
  if (process.env.NODE_ENV === 'production') {
    return <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ''} />;
  }
  return <></>;
}

export default GoogleAnalyticsScript;
