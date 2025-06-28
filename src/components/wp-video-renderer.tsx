import sanitizeHtml from 'sanitize-html';

import { cn } from '~/utils/cn';

function WPVideoRenderer(props: {
  content: string | null;
  className?: string;
}) {
  const { content, className } = props;

  if (!content) {
    return (
      <div>
        // TODO: Put a Video placeholder
        <p>Video Content found</p>
      </div>
    );
  }

  const sanitizedHtml = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      iframe: [
        'src',
        'frameborder',
        'allow',
        'allowfullscreen',
        'loading',
        'title',
        'referrerpolicy',
      ],
    },
    allowedSchemes: ['https'],
  });

  return (
    <article
      className={cn('article', className)}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default WPVideoRenderer;
