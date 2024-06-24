# Use an official Node.js runtime as a base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable
ENV PORT=3000

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]