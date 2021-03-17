FROM node:12 as gulp_build
COPY . .
RUN yarn install && yarn run gulp

FROM nginx:alpine
COPY --from=gulp_build ./dist /usr/share/nginx/html
