# training-express-fileupload

Training code to quickstart file's server with express-fileupload and custom role access with Mongo(Mongoose). 

Each route needs to be allowed into a `accesses` Mongo query from the such Schema, performing as a role management for that reason it needed to create for every route their allow document in the collection with the pathname route for the specified user role and CRUD operation. It is necessary to ensure exists the folder to upload the file for earch route adding it to inside's `paths.js` JSON, The auth middleware works with a [generic-app](https://github.com/sebastianaf/generic-app) *encrypted token* usign JWT that needs to be provided. to ensure it works it's needed to provide the same `API_TOKEN` env variable.

## Requirements

- NodeJS
- Docker
- Docker compose

### 1.Create environment variables

Create a `.env` from `.env.example` file in the root folder with all environment variables, this variables will be used by the containers, it need to be reached by `docker-compose.yml` file.

### 2. Run

At the end just type

```
docker compose -p training-express-fileupload -up -d --build
```

This commands will wake up the services access it through port specified in `$*_PORT` environment variables.

Nevertheless is recomended to use a docker private network with a reverse proxy.

Use this code if you need it, don´t forget to share, have a nice day.
