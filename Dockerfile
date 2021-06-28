FROM node:14-alpine as source
# Usage Alpine https://github.com/gliderlabs/docker-alpine/blob/master/docs/usage.md

LABEL authors="Albert Iblyaminov <albert@iblyaminov.io>" \
      org.label-schema.vendor="PDF Service" \
      org.label-schema.name="PDF Service Image" \
      org.label-schema.description="PDF Service" \
      org.label-schema.schema-version="1.0" \
      org.opencontainers.image.source="https://github.com/rieset/pdf-service"

ENV BUILD_DEPS="" \
    RUNTIME_DEPS="" \
    NODE_ENV="production" \
    PORT="3000" \
    USER="app" \
    FRONTEND_INSTANCES="1" \
    FRONTEND_MEMORY="256M" \
    NODE_OPTIONS="--max_old_space_size=2048" \
    LABEL="Untld frontend" \
    CHROME_BINARY_PATH="/app/.apt/opt/google/chrome/chrome" \
    CHROME_DRIVER_PATH="/app/.chromedriver/bin/chromedriver" \
    INSTANCES=2 \
    MEMORY="250M" \
    SERVICE_NAME="PDF SERVICE" \
    SERVICE_NAME_RATIO=".54"

WORKDIR /home/$USER

# hadolint ignore=DL3018
RUN set -x && \
    apk add --no-cache $RUNTIME_DEPS && \
    apk add --no-cache --virtual build_deps $BUILD_DEPS && \
    yarn global add pm2 && \
    # Delete virtual dev package
    apk del build_deps

RUN addgroup -g 2000 app && \
    adduser -u 2000 -G app -s /bin/sh -D app

USER $USER

COPY --chown=$USER:$USER . .

RUN yarn install --production=false && \
    yarn build

CMD ["pm2-runtime", "start", "./pm2.config.js"]
