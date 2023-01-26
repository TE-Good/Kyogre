# Kyogre
## Motivational Quotes

<img src="https://vignette.wikia.nocookie.net/omniversal-battlefield/images/1/1f/382.png/revision/latest?cb=20170430033800" width="50%">

### About

Kyogre is a displays (mostly) motivational quotes through a the website http://kyogre-quotes.herokuapp.com/, or through the CLI.

### How to use

* To run it local from one port run `npm start` (add `--local` to use local mongo database).
* To run applications frontend and backend separately for development;
  + Frontend: `npm run front`
  + Backend: `npm run back` (add `--local` to use local mongo database)
* You can add the flag `--local` to run off the local mongo database on both of the following commands;
  * `npm start --local`
  * `npm run back --local`
* To seed the database run `npm run seed`, this will seed the your local mongo database or remote cloud database (Mongo Atlas). You will need to have a json file of quotes to run this.

### Extra:
* To get the application through CLI run `npm run cli`
