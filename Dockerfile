FROM node:20-alpine
WORKDIR /opt/app
RUN apk add nano
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production

CMD ["node", "./dist/src/main.js"]