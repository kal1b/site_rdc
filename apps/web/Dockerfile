FROM node:20-alpine
WORKDIR /workspace
COPY package.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json
COPY infra/mock-1c/package.json infra/mock-1c/package.json
RUN npm install
COPY . .
WORKDIR /workspace/apps/web
EXPOSE 3000
CMD ["npm","run","dev"]
