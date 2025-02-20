<h1 align="center">
   Golden Raspberry Awards 
</h1>

<h4 align="center"> 
  The list of nominees and winners of the Worst Picture category at the Golden Raspberry Awards.
</h4>


<h1 align="center"> Getting Started</h1> 

<h4 align="center"><b>Localhost endpoint:</b> localhost:3000/v1/award/intervals </h4> 


## Setup application

- NodeJs 18:00 ou higher ✅;
- TypeScript ✅;
- Prisma ✅;
- Fastify ✅;

## How it Works

#### Clone the repository 

```
https://github.com/NailsonCodens/golden-raspberry-awards
```

#### Install the dependencies

```
npm install
```

#### Make a copy of .env.example and rename the copy as .env

```
sudo cp .env.example .env
```
#### Add the values ​​in the environment variables

```
NODE_ENV=dev
PORT=3000
DATABASE_URL="file:./dev.db"

```

#### Run in localhost

```
npm run dev 
```

#### Where are hte csv list? 

##### Development mode
```
src/data/move-list.csv 
```
##### Build mode
```
build/data/move-list.csv 
```

#### Run e2e tests

```
npm run test:e2e 
```

#### Run build

```
npm run build
```


#### Run the build version

```
node build/server.js
```


Obrigado pela oportunidade de participar deste teste Outsera!