# Movieligent

## Requirements

The task is to create a simple Typescript React UI that has an input box. Upon pressing a button, it queries movies using the value of the input, through an external api and displays the results in a list.

The recommended api is "The Movie Database" (https://developers.themoviedb.org/3/search/search-movies - registration required).

If you encounter any issues querying that api, any json or graphql one with similar functionalities can be used.

Notable checkpoints:

- Testing (any framework, any level)
- Loading spinner
- Search is automatically triggered after at least 3 characters entered
- Search by pressing ENTER
- Caching
- Pagination, limits
- Adding movies to favorites, stored locally, refreshing automatically
- Displaying favorites in the list and on a different part of the screen (eg right side or top)

Please provide `README.md` file with every necessary information to run your code, tests.

## Prerequisites
- docker
- npm 
- node version 20
- a valid api key for https://developer.themoviedb.org/

## Getting started

- don't forget to sign in to dockerhub
    - otherwise pulling node image will fail
    - `docker login`
- navigate to the project root
- run `sh shell-scripts/init.sh`
- edit `movie-service/.env`, add your own `TMDB_AUTH` api key
- stop all docker-compose processes
- make sure that `localhost:80` and `localhost:27017` is not in use
- still in the project root run `docker-compose up`
- anytime you make a change outside of any service's src folder stop and run `docker-compose up --build`
- visit http://localhost/ in the browser

## Running tests
- navigate to the project root
- run `sh shell-scripts/test.sh`

## Features
- init.sh script
  - installs packages
  - copies or creates the necessary .env files
- full-stack web application
  - storing favourites in a database
  - hiding apikey from the client
  - not having to query anything to see favourites
  - showing favourites is browser (local storage) independent
- shared library
  - shared types and logic
  - using local package (not production ready)
- openapi
  - generated api calls for the client
  - generated code is shared between the services
  - api calls are kept in sync
  - api tests are also in sync
- development mode
  - docker compose
    - code is shared with volumes for live reloading and restarting
    - database included
    - if there is a change in the shared library compose needs to be restarted
  - live reload in the browser
  - restarting server if code change is detected
- getting database url from envs
  - easy to add more databases in development mode, no need to use more databases which is easier to work with
  - easy to add separate databases in production
- vscode is supported out of the box
  - formats code
  - organises imports
- prettier is used, related extension is recommended to install
- tailwindcss for the least css possible
- data is mapped out of compose via volumes, so you don't lose your data between development sessions
- testing with in-memory database for independent tests
- error handling middleware
- error handling on the client
- loading state handling on the client
- client-side caching
- testing main functionalities
- paging
- validating requests
- list movies
- add favourites
- list favourites
- site build
- responsive design
- search movies when user hits enter
- search movies if user stops typing

## Out of scope
- authentication
- production mode
- better way of sharing code than volumes and local file paths
- running the app independently from used ports
- husky pre-commit hook
- deployment / separate databases
