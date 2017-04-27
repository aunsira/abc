Abc
=====

A Service for periodically scraping http://www.nasdaq.com/, parse out the index value of the Nasdaq, and store the result in the database.

Requires
--------

- MySQL
- npm

Installation
------------
Clone this repository and run

    $ npm install

Start grab index value
-----

    $ gulp scrape

Start application
-----

    $ nodemon

RESTful web service
-----
Open browser and go to `http://localhost:3001/api/indexes?name=nasdaq` for getting example
of index value response
