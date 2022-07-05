# NOTES

NestJS Microservices - 4 Parts Tutorial

### Repo

- [Release Finish · brianjohnsonsr/nestjs.micro.client](https://github.com/brianjohnsonsr/nestjs.micro.client/releases/tag/finish)

### Other

- [How To Create a NestJS Redis Microservice? - DZone Microservices](https://dzone.com/articles/how-to-create-a-nestjs-redis-microservice)
- [Creating microservices in Nest.js - Architect.io](https://www.architect.io/blog/2020-09-08/creating-microservices-nestjs/)

## Redis with Docker

- [Docker Hub](https://hub.docker.com/_/redis)
- [Could not connect to Redis at 127.0.0.1:6379: Connection refused in docker](https://stackoverflow.com/questions/42529393/could-not-connect-to-redis-at-127-0-0-16379-connection-refused-in-docker)
- [Using Redis with Docker and NodeJS/Express](https://medium.com/geekculture/using-redis-with-docker-and-nodejs-express-71dccd495fd3)

```shell
$ docker run --name some-redis -p 6379:6379 redis -d
```

## Redis in System

- [How to Install &amp; Configure Redis on openSUSE Leap 15 - LinuxCapable](https://www.linuxcapable.com/how-to-install-configure-redis-on-opensuse-leap-15/)

```shell
$ sudo zypper in redis
$ /usr/sbin/redis-server
...
24763:M 05 Jul 2022 21:29:59.440 * Ready to accept connections
```

## Redis Cli

```shell
$ redis-cli
127.0.0.1:6379> quit
```

## Run Server

install on both services

```shell
$ cd server/
$ npm i redis@3.1.2
$ cd ../client
$ npm i redis@3.1.2
```

- [Connecting Redis microservice in NestJS causes app to get stuck](https://stackoverflow.com/questions/72125220/connecting-redis-microservice-in-nestjs-causes-app-to-get-stuck)

> don't use redis 4 for ex `"redis": "^4.0.6"`, it will not works, never reachs `[Main] Microservice is listening...`
> read From [nestjs microservice redis docs](https://docs.nestjs.com/microservices/redis) To start building Redis-based microservices, first install the required package (note as of now the supported Redis version is ^3, not the latest ^4):

change on both client and server to change from `Transport.TCP` to `Transport.REDIS`

`server/src/main.ts`

```typescript
const microserviceOptions = {
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379',
  },
};
```

`client/src/math.service.ts`

```typescript
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }
```

## Run Client and Server

```shell
# win1
$ cd server/
$ npm run start:dev
# win2
$ cd client
$ npm run start:dev
```

## Send some Curls

- [POST Form Data with cURL](https://davidwalsh.name/curl-post-file)

fire some curls to client

```shell
$ curl -X POST -H 'Content-Type: application/json' -d "{ \"data\": [1,2,3,4] }" http://localhost:3000/add
# outcomme
10
# server outcome
[Nest] 25925   - 07/05/2022, 9:35 PM   [AppController] Adding 1,2,3,4
# client outcome
[Nest] 26111   - 07/05/2022, 9:35 PM   [AppController] Adding 1,2,3,4
```
