import sanitizeHtml from 'sanitize-html';

import { cn } from '~/utils/cn';

function WPContentRenderer(props: {
  content: string | null;
  className?: string;
}) {
  const { content, className } = props;

  if (!content) {
    return (
      <div>
        <p>No Content found</p>
      </div>
    );
  }

  const sanitizedHtml = sanitizeHtml(content);

  return (
    <article
      className={cn('article', className)}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default WPContentRenderer;
