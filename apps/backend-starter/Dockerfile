# syntax=docker/dockerfile:experimental
# ---- Base Node ----
FROM mhart/alpine-node:15 AS base

# set working directory
WORKDIR /root/tractr

# copy project file
COPY ./package.json  .
COPY ./tsconfig.json  .
COPY apps/backend-starter/package.json  .
COPY apps/backend-starter/tsconfig.json  .
COPY apps/backend-starter/tsconfig.build.json  .
COPY apps/backend-starter/prisma .

# ---- Production Dependencies ----
FROM base AS dependencies.prod
WORKDIR /root/tractr
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm i --legacy-peer-deps --only=prod --ignore-scripts

# ---- Dependencies ----
FROM base AS dependencies.dev
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm i --legacy-peer-deps 
RUN npm run generate


# ---- Dependencies ----
FROM dependencies.dev AS build
COPY apps/backend-starter/src .
RUN npm run build

#
# ---- Release ----
FROM dependencies.prod AS release
WORKDIR /root/tractr/apps/backend-starter
ENV TRACTR_EXPOSE_PORT=3000
COPY --from=build /root/tractr/apps/backend-starter/dist ./dist

# expose port and define CMD
EXPOSE $TRACTR_EXPOSE_PORT
CMD npm run start:prod