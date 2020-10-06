FROM node:12.16.1 as build-stage

RUN mkdir -p /pichupido-client-user

WORKDIR /pichupido-client-user

COPY package*.json ./ /pichupido-client-user/

RUN npm install

COPY . ./pichupido-client-user

RUN npm run build

FROM nginx:stable as production-stage

COPY .nginx/nginx.conf.template /etc/nginx/conf.d/default.conf.template

COPY --from=build-stage /pichupido-client-user/dist /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
