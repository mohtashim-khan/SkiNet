FROM alpine:latest

RUN apk add bash

RUN apk add openjdk11-jre

RUN apk add maven

COPY ./pom.xml /application/backend/pom.xml

RUN mvn -f /application/backend/pom.xml dependency:go-offline -B

COPY ./src ./application/backend/src

RUN mvn -f /application/backend/pom.xml -Dmaven.test.skip clean package spring-boot:repackage

ENTRYPOINT ["java", "-jar", "/application/backend/target/application-release.jar"]
