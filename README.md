# ftc_bud
Application for managing materials, inventories and projections of usage.

[X] Create Front End Back End folders
[X] Initialize npm in Back End
[X] Install dependencies - express, pg, knex, axios, -D nodemon
[X] Spin up EXPRESS on server.js mod .json for start/dev commands
[X] Initialize - knex init - and set up database - brewing
[X] Create tables for commodity in database - brewing - commodity, uom, type, container, supplier, enviro, location
[X] Create CRUDs for table mtl_uom in dbAPI and server.js
[X] Clean up index.js - set up express routes -> new server.js + routes folder/files
[X] set up environment variable - .env file - npm install dotenv
[X] Deploy to heroku - set up env variables on heroku
[X] Install heroku cli
[X] Migrate tables to postgres on heroku]
[x] Problems migrating. Moved knex.js file to /root updated file paths in knex.js Worked!
[X] Postgres deployed to heroku! /back - heroku run knex migrate:latest -a bud-materials
[X] Set up users table and register a user
## working in branch dev
[X] Install bcryptjs
[X] Set up bcryptjs to hash passwords create login route
[X] Set up cookies and sessions for persistent login using express-session
[X] Create protected routes
[X] morgan, helmet and cors
[X] Added permissions column to user table for further restricted access
[X] Added ENDPOINT.md to track endpoints

## Working in branch develop
[X]dev branch merged and deleted