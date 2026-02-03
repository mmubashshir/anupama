FROM oven/bun:1 AS base
ENV HUSKY=0
ENV NODE_ENV="production"

FROM base AS installer
WORKDIR /app
COPY package.json bun.lockb  ./
RUN bun i

FROM base AS builder
WORKDIR /app
ARG NEXT_PUBLIC_MODE=""
ARG NEXT_PUBLIC_SITE_URL=""
ARG NEXT_PUBLIC_WORDPRESS_BASE_URL=""
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS=""
ARG NEXT_PUBLIC_CLARITY_PROJECT_ID=""
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_WORDPRESS_BASE_URL=${NEXT_PUBLIC_WORDPRESS_BASE_URL}
ENV NEXT_PUBLIC_MODE=${NEXT_PUBLIC_MODE}
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS=${NEXT_PUBLIC_GOOGLE_ANALYTICS}
ENV NEXT_PUBLIC_CLARITY_PROJECT_ID=${NEXT_PUBLIC_CLARITY_PROJECT_ID}
COPY . .
COPY --from=installer /app/node_modules ./node_modules
RUN bun run build


FROM base AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --no-log-init -g nodejs nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
ENV HOST="0.0.0.0"
ENV PORT=3000
EXPOSE 3000
CMD ["bun", "./server.js"]







