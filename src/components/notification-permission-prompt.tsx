'use client';

import { Button } from '~/components/button';

import { cn } from '~/utils/cn';

export interface NotificationPermissionPromptProps {
  open: boolean;
  className?: string;
  title?: string;
  description?: string;
  loading?: boolean;
  onAllow?: () => void;
  onLater?: () => void;
  allowLabel?: string;
  laterLabel?: string;
}

export default function NotificationPermissionPrompt({
  open,
  className,
  title = 'Stay in the loop',
  description = 'Enable notifications to get timely updates and important alerts. We’ll only send relevant messages—no spam.',
  loading = false,
  onAllow,
  onLater,
  allowLabel = 'Allow notifications',
  laterLabel = 'Later',
}: NotificationPermissionPromptProps) {
  if (!open) return null;

  return (
    <section
      aria-label="Notifications permission"
      className={cn(
        'fixed z-40',
        // mobile: bottom full-width; desktop: bottom-right
        'right-0 bottom-0 left-0 md:right-6 md:bottom-6 md:left-auto',
        // safe area for modern phones
        'px-3 pb-[max(env(safe-area-inset-bottom),0px)] md:pb-0',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto w-full md:mx-0 md:w-[24rem]',
          'text-card-foreground rounded-t-xl border bg-white shadow-lg md:rounded-xl',
          'pointer-events-auto p-4 md:p-5',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm leading-6 font-medium text-balance">
              {title}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Button
            onClick={onAllow}
            disabled={loading}
            variant="default"
            className="shrink-0 cursor-pointer bg-green-400 hover:bg-green-500 focus:ring-green-400"
          >
            {loading ? 'Requesting…' : allowLabel}
          </Button>

          <Button
            variant="outline"
            onClick={onLater}
            disabled={loading}
            className="shrink-0 cursor-pointer bg-transparent"
          >
            {laterLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
