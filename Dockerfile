# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to workdir
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon 

# Copy all source code to workdir
COPY . .

# Install bcrypt and its dependencies (needed for bcrypt to work with Alpine-based images)
RUN apk add --no-cache make gcc g++ python3 && \
  npm install bcrypt

# Rebuild bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Expose the port that the app will listen on
EXPOSE 9000

# Start the app
CMD ["yarn", "start"]