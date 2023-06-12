# Base image
FROM node:14.17.0

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy source code
COPY . .

# Expose ports
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
