# From Base Image
FROM node:10-alpine as builder

# Labels
LABEL Repository="sonalimittal/book-service" Creater="Sonali Mttal" email="mittal.sonali221@gmail.com"

# Work Directory
WORKDIR /home/app

# Copy Code
COPY package*.json ./

# Run Commands
RUN npm install
COPY . /home/app
# Expose Ports which are required for this service
# EXPOSE 4200

# Entrypoint
# ENTRYPOINT [ "npm" ]

# Commands to start
# CMD ["npm", "start"]
RUN npm run build

# Stage 2
# FROM nginx:1.13.12-alpine

# COPY --from=node /home/app/dist /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx

# ## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder

COPY --from=builder home/app/dist/* /usr/share/nginx/html/
