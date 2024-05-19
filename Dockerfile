FROM node:18.20.2-alpine3.19

COPY ./api /opt/cine-hub
WORKDIR /opt/cine-hub
RUN npm ci --only-production

EXPOSE 3000
CMD ["npm", "start"]
