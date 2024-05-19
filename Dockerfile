FROM node:20-slim
WORKDIR /app
COPY . .
# RUN cd /app && npm i -y
CMD npm run dev