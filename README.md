### Kanguro Tech Assignment

#### Pre-requisites
* Docker
* Docker-compose
* Node
* Yarn

#### Description
The project is built in a monorepo structure with [turbo](https://turbo.build/), which it's a bundler made to simplify the creation of monorepos. Inside the monorepo we have two main workspaces, `apps` where we can find two projects `api` and `client`, and `packages`.
* `api` it's our simple server made with [NestJS](https://nestjs.com/).
* `client` it's our frontend app made with [ReactJS](https://react.dev/).
* `packages` it's our shared folder, inside we have functions that both frontend and backend can sahre and use.

#### Quick start
* In the root folder execute the following commands:
1. `yarn install`: To install all the dependencies.
2. `chmod +x ./generate-env-files.sh && ./generate-env-files.sh`: To generate the .env files of all apps.
2. `yarn run docker:start`: To create/start the database.
3. `yarn workspace api run migration:run`: To run all database migrations.
4. `yarn run start:dev`: To start the backend and frontend development apps. The backend it's at [localhost:3000](http://localhost:3000) and you can find the frontend at [localhost:5173](http://localhost:5173).
2. `chmod +x ./populate-points.sh && ./populate-points.sh`: To add some delivery points to the database. The function that does this is in `apps/api/src/services/point.service.ts`, it's called `populateDb`. There you have some sample data, you can change it how you like to make the tests you need.

Once you finished playing around you can turn down the docker container by executing `yarn run docker:stop`

#### Other commands
* `yarn run build`: To build both backend and frontend for production. Quick note: before running this command change the `apps/client/.env VITE_BASE_URL` to be `VITE_BASE_URL=http://localhost:3000`, otherwhise the next command won't work properly. 
* `yarn run start:prod`: To start the apps for production. In production the frontend is served directly from nestjs using staticfiles so you will find it on [localhost:3000](http://localhost:3000).
* `yarn run lint`: Will launch the linter both on frontend and backend.
* `yarn run test`: Will launch the unit tests and coverage report on both frontend and backend.