1) Install NodeJS (Lastest)
2) Install scoop
3) Install git bash

Install and run postgresql server (git bash)
1) scoop install postgresql
2) cd C:/users/[YourUser]/scoop/apps/postgresql/11.1/bin
3) pg_ctl -D "../Data" start

Project setup (shell / cmd)
1) git clone 
2) cd app/api
3) npm i
4) npm start

Install knex globally
1) npm i knex -g

Database Commands (shell / cmd)

Create new migration:
1) knex migrate:make [name_of_migration]
2) open newly created file in src/database/migrations folder
3) knex migate:latest

Create new seed:
1) knex seed:make [next_index_name_of_the_table]
2) open newly created file in src/database/seeds folder
3) knex seed:run
