import sanitizeHtml from 'sanitize-html';

import { cn } from '~/utils/cn';

function WPContentRenderer(props: {
  content: string | null;
  className?: string;
}) {
  const { content, className } = props;

  if (!content || content.trim() === '') {
    return null;
  }

  const sanitizedHtml = sanitizeHtml(content, {
    nonBooleanAttributes: ['class', 'style', 'aria-*'],
    allowedAttributes: { '*': ['class', 'style', 'aria-*'] },
  });

  return (
    <article
      className={cn('article', className)}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default WPContentRenderer;
