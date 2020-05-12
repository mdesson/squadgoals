FROM mhart/alpine-node:latest

WORKDIR /backend

COPY package*.json /backend/

RUN npm install

COPY . /backend/

EXPOSE 3100

# Add wait-for-it
COPY wait-for-it.sh wait-for-it.sh 
RUN chmod +x wait-for-it.sh

# Run bash
ENTRYPOINT [ "/bin/bash", "-c" ]

# Wait for postgres to be available, then start
CMD ["./wait-for-it.sh" , "postgres:5432" , "--strict" , "--timeout=300" , "--" , "npm start"]
