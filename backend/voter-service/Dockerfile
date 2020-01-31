# From Base Image
FROM node:lts-alpine

# Labels
LABEL Repository="sonalimittal/book-service" Creater="Sonali Mttal" email="mittal.sonali221@gmail.com"

# Work Directory
WORKDIR /home/app

# Copy Code
COPY package*.json ./

# Run Commands
RUN npm install

COPY --chown=node:node . .
# Expose Ports which are required for this service
EXPOSE 3200

# Commands to start
CMD ["node" , "app.js"]
