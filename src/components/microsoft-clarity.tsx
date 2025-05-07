import React from 'react';
import Script from 'next/script';

import { env } from '~/env';

function MicrosoftClarity() {
  if (process.env.NODE_ENV === 'production') {
    return (
      <Script id="microsoft-clarity-script" strategy="afterInteractive">
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ''}");
          `}
      </Script>
    );
  }
  return <></>;
}

export default MicrosoftClarity;
