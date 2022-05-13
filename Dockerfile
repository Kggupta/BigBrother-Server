FROM node:12-alpine
COPY . .
RUN npm install
CMD ["node", "server.js"]
EXPOSE 5000

