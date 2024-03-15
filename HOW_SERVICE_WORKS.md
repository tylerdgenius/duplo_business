# Technical guide to using this service

This service was built with one core design pattern in mind - Singleton Pattern. This means that most things (be it services, modules, configs e.t.c) use this pattern to interact with each other.

Service also interacts seamlessly with Repository pattern that nest is based on and interfaces with a postgres database.

## Database Initiation

Create an .env file in the project root directory and create the following variables inside it

```env
APP_PORT=
APP_VERSION=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USENAME=
DATEBASE_PASSWORD=
DATABASE_NAME=
DATABASE_TYPE=
```

Note: Each variable should retain the exact naming inference as the system is expecting that exact naming in order to bootstrap itself. Keep in mind that the appropriate data types are postgres, mysql or as otherwise defined by the typeorm on the nestjs website

## Api Versioning

The core versioning control is based on the version defined on the .env file. The flow works as such

```bash

--- .env defines the version ---- the module version loader grabs the created version number if it exists ---- version loader loads all the modules inside the version folder

```

### What the heck does that mean?

Here's an example to further illustrate this --

You create a user management module on version 1 of this microservice in the following folder

src/modules/{{currentVersion}}/{{modulefolderName}}

You register this module in the version loader

### Seed the database

Run the service and before starting any registration, it is crucial to seed the database as this populates all the necessary permissions needed to work with the system

The appropriate endpoint to hit is {{BASE_URL}}/permissions/create
