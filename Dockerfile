FROM maven:3-jdk-8

# 准备源代码
ENV APP_ROOT=/app
RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT
ADD . $APP_ROOT

# 安装Node、NPM、ICE
ENV NODE_VERSION=v8.11.1
RUN wget https://nodejs.org/download/release/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.gz -O node.tar.gz
RUN tar -zxvf node.tar.gz -C /opt/
RUN sudo ln -s /opt/node-${NODE_VERSION}-linux-x64/bin/node /usr/local/bin/node
RUN sudo ln -s /opt/node-${NODE_VERSION}-linux-x64/bin/npm /usr/local/bin/npm
RUN npm config set registry https://registry.npm.taobao.org
RUN npm i ice-scripts -g

# Build前端


# Maven
COPY docker/settings.xml /usr/share/maven/conf/
RUN mvn clean install -DskipTests=true -Dmaven.javadoc.skip=true -B -V

# Real Run
ENV JAVA_OPTS ""
ENV SPRING_PROFILES_ACTIVE test
EXPOSE 8080
CMD ["/bin/sh", "-c", "java $JAVA_OPTS -jar target/app.jar --spring.profiles.active=$SPRING_PROFILES_ACTIVE"]
