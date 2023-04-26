FROM node:16.15.1-slim
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5001
CMD npm run start
