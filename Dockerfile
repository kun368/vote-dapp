FROM java:8

ENV JAVA_OPTS ""
ENV SPRING_PROFILES_ACTIVE test
ENV JAR_NAME vote-dapp

COPY target/${JAR_NAME}.jar /app.jar
EXPOSE 8080
CMD ["/bin/sh", "-c", "java $JAVA_OPTS -jar /app.jar --spring.profiles.active=$SPRING_PROFILES_ACTIVE"]
