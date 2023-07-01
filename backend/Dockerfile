FROM node:14

# A munkakönyvtár beállítása a konténerben
WORKDIR /usr/src/app

# A csomag*.json fájl(ok) másolása
COPY package*.json ./

# A projekt függőségeinek telepítése
RUN npm install

# Az alkalmazás forráskódjának másolása a konténerbe
COPY . .

# Az alkalmazás portjának megadása (amelyen futni fog)
EXPOSE 5001

# A parancs, amit futtatni szeretnél (amikor a konténer elindul)
CMD [ "npm", "start" ]
