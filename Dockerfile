
# FROM ubuntu:latest
# Use the official Node.js 14 image as the base image
FROM node:18-alpine3.17 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# RUN apt-get update && apt-get install -y git

# Install the app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "start" ]