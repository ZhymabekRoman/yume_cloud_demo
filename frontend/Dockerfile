# Use an official Node runtime as a parent image
FROM node:21

RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/* 

# Set the working directory in the container
WORKDIR /app

# ENV PROD=1

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

RUN chown -R 1000:1000 /app

# Build the project
# RUN npm run dev

# Your application might serve the static files with a server
# For example, using serve npm package
# RUN npm install -g serve
# CMD ["serve", "-s", "build"]

# If you're using Caddy to serve the files, you might not need the above CMD
# and instead rely on Caddyfile configuration