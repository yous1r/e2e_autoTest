FROM mcr.microsoft.com/playwright:v1.30.0-focal

WORKDIR /root/playwright

COPY sources.list /etc/apt/

RUN apt update

RUN apt install -y vim
 
# Set the environment path to node_modules/.bin
ENV PATH /root/playwright/node_modules/.bin:$PATH

RUN mkdir -p /root/playwright/src/
RUN mkdir -p /root/playwright/lib/
RUN mkdir -p /root/playwright/config/

# COPY the needed files to the app folder in Docker image
COPY package.json .
COPY package.bak.json ./package.json
COPY package-lock.json .
COPY tsconfig.json .
COPY src/ ./src/
COPY lib/ ./lib/
COPY config/ ./config/


RUN npm install