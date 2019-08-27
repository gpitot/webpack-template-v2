FROM nginx
RUN apt-get -y update
#RUN apt-get -y install curl vim
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]