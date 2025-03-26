# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY ./dist /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]