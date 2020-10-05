FROM node:12.16.1 as build-stage

RUN mkdir -p /pichupido-client-user

WORKDIR /pichupido-client-user

COPY package*.json ./ /pichupido-client-user/

RUN npm install

COPY . ./pichupido-client-user

RUN npm run build

FROM nginx:stable as production-stage

COPY ./.nginx/nginx.conf /pichupido-client-user/nginx.conf

RUN envsubst /pichupido-client-user/nginx.conf > /etc/nginx/nginx.conf

COPY --from=build-stage /pichupido-client-user/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]