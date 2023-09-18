ARG FUNCTION_DIR="/usr/src/app"

FROM public.ecr.aws/docker/library/node:18-bullseye AS build-image
ARG FUNCTION_DIR

RUN apt-get update && \
  apt-get install -y \
  g++ \
  make \
  cmake \
  unzip \
  libcurl4-openssl-dev

WORKDIR ${FUNCTION_DIR}

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

##### ##### ##### #####

FROM public.ecr.aws/docker/library/node:18-bullseye
ARG FUNCTION_DIR

ENV CI=true
ENV PLAYWRIGHT_BROWSERS_PATH="/browser"

RUN mkdir -p /browser
WORKDIR ${FUNCTION_DIR}

COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

RUN npx playwright install chromium
RUN npx playwright install-deps chromium

COPY ./entry_script.sh /entry_script.sh

RUN chmod 755 /entry_script.sh
ENTRYPOINT [ "/bin/bash", "/entry_script.sh" ]

CMD ["dist/handler/zac.handler"]