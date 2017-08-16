# api-boilerplate

A hapi starter boilerplate to speed up basic bootstraping of backend applications. Work in progress.

## Config

Server configuration is loaded through ENV variables. For development they are read through the `.env` file, for production they have to be provided when starting the server.

To start developing copy the `.env.example` to `.env` and fill it with your values.

**NOTE:** Make sure to keep `.env` out of the repository.

## Style guide

The style guide used is [standard.js](https://standardjs.com/). It can be run through `npm run format` manually, and it will be run automatically on `git commit`.
