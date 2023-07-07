# Kezdd a selenium/node-chrome képpel, ami tartalmazza a Chrome-ot és a ChromeDrivert
FROM selenium/node-chrome:latest

# Telepítsd a Java és Maven szükséges verzióját
USER root
RUN apt-get update && apt-get install -y maven openjdk-11-jdk

# Állítsd be a munkakönyvtárat a konténerben
WORKDIR /tests

# Másold át a POM fájlt és a src könyvtárat a munkakönyvtárba
COPY pom.xml /tests
COPY src /tests/src

# Futass Maven parancsot a függőségek letöltésére
RUN mvn dependency:go-offline -B

# Másold át a maradék fájlokat
COPY . .

# Futass Maven parancsot a tesztek futtatására
CMD ["mvn", "test"]
