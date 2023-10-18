ARG FUNCTION_DIR="/usr/src/app"

FROM public.ecr.aws/docker/library/node:18-bullseye
ARG FUNCTION_DIR

RUN apt-get update && \
  apt-get install -y \
  g++ \
  make \
  cmake \
  unzip \
  libcurl4-openssl-dev \
  git \
  curl \
  unzip \
  docker.io \
  sudo

WORKDIR ${FUNCTION_DIR}

COPY package.json package-lock.json ./

RUN npm ci

RUN npx playwright install-deps chromium

RUN chown -R node:node ${FUNCTION_DIR}

USER node

RUN npx playwright install chromium

COPY . .

# RUN npm run build
