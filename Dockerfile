FROM node:alpine as builder
WORKDIR app
COPY .
RUN npm install
RUN npm run build

FROM httpd:2.4
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/
