# fullstack-graphql-airbnb-clone

A Fullstack GraphQL Airbnb Clone with React and React Native.

- Branches are in the order they were coded.
- Watch how this was made: https://www.youtube.com/playlist?list=PLN3n1USn4xlnfJIQBa6bBjjiECnk6zL6s
- This builds off the GraphQL Typescript Server I made: https://github.com/benawad/graphql-ts-server-boilerplate.
- You can see the YouTube Playlist for how that was made here: https://www.youtube.com/playlist?list=PLN3n1USn4xlky9uj6wOhfsPez7KZOqm2V
- Join the Discord: https://discord.gg/Vehs99V

## Packages

This project is made up of 5 packages that share code using Yarn Workspaces.

- web (React.js website)
- app (React Native app)
- server (GraphQL Typescript server)
- common (Code shared between web, app, and server)
- controller (Components shared between web and app)

## Installation

1. Clone project

```
git clone https://github.com/benawad/fullstack-graphql-airbnb-clone.git
```

2. cd into folder

```
cd fullstack-graphql-airbnb-clone
```

3. Download dependencies

```
yarn
```

4. Start PostgreSQL server
5. Create database called `graphql-ts-server-boilerplate`

```
createdb graphql-ts-server-boilerplate
```

6. [Add a user](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e) with the username `postgres` and and no password. (You can change what these values are in the [ormconfig.json](https://github.com/benawad/graphql-ts-server-boilerplate/blob/master/ormconfig.json))

7. Connect to the database with `psql` and add the uuid extension:

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
``` 

8. Install and start Redis

9. In `packages/server` create a file called `.env` and add the following line inside: `FRONTEND_HOST=http://localhost:3000`

10. Run `yarn build` in `packages/common`

11. Run `yarn build` in `packages/controller`

12. Get Google Maps API key and put it here https://github.com/benawad/fullstack-graphql-airbnb-clone/blob/master/packages/web/public/index.html#L14 Videos doing that: https://youtu.be/-QQnzDVcTCo and https://youtu.be/xLlIgokKiLc



## Usage

1. Start server `yarn start` in `packages/server`

2. Now you can run `yarn start` in `packages/web` or `packages/app` to start the website or app.

3. How to get credentials working in graphql playground: https://youtu.be/oM-EmNdhwI4?t=8m39s

## Deploy

### Server

1. https://www.youtube.com/watch?v=qQAozc1MkdU
2. https://www.youtube.com/watch?v=0t-rE5wUP-E

### Website

1. https://www.youtube.com/watch?v=FiU3SHEaFwk
2. https://www.youtube.com/watch?v=vPu1sfuYFzw
3. https://www.youtube.com/watch?v=Ry6Zobb-kaw

## Features

1. Website register/login
2. Deploy backend and frontend
3. App register/login
4. Website and App forgot password
5. Website and App create listing
6. Website and App view listings
7. Logout
8. Website chat
