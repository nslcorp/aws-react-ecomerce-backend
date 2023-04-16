FROM node:14-alpine as base
WORKDIR /app

# Copy Dependancie
COPY package*.json ./
RUN npm install && npm cache clean --force  # - 45mb save with "cache clean"

# Build
# (-245MB) second layer reduces from 345MB to 105MB.
WORKDIR /app
COPY . .
RUN npm run build

FROM node:12-alpine as application
COPY --from=base /app/package*.json ./
RUN npm install --only=production && npm cache clean --force   # (-3 MB) save with "cache clean"
COPY --from=base ./app/dist ./dist

USER node
EXPOSE 4000
ENTRYPOINT ["node", "dist/main.js"]
