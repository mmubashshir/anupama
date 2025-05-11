import { GoogleAnalytics } from '@next/third-parties/google';

import { env } from '~/env';

function GoogleAnalyticsScript() {
  if (env.NEXT_PUBLIC_MODE === 'production') {
    return <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ''} />;
  }

  return <></>;
}

export default GoogleAnalyticsScript;
