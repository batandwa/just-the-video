FROM nginx
MAINTAINER Batandwa Colani <i@batandwa.me>

EXPOSE 80
# COPY web /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
