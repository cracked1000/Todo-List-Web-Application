# Build and Test stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Run tests and generate JaCoCo coverage report
RUN mvn clean test jacoco:report

# Build the application (skip tests since we already ran them)
RUN mvn package -DskipTests

# Run stage - Using full JDK image which supports ARM
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]