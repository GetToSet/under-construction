FROM node:12 as gulp_build
COPY . .
RUN yarn install && npm run build

FROM nginx:alpine
COPY --from=gulp_build ./dist /usr/share/nginx/html
