# Use Node.js as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first (improves Docker layer caching)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Create the production build
RUN npm run build

# Install a lightweight static file server
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5173

# Start the production server and serve the React build
CMD ["serve", "-s", "dist", "-l", "5173"]