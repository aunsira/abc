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

Create `abc` database in MySQL by.

    $ mysql -u root -p;
    $ create database abc;

Run tests
-----

    $ npm test

Start grab index value
-----

    $ gulp scrape

Start application
-----

    $ nodemon

RESTful web service
-----
Open browser and go to `http://localhost:3001/api/indexes?name=nasdaq` for getting nasdaq index value as a response.

Also supports query string parameters(`from_time`, `to_time`) for fetching with a range of specific time (UNIX timestamps)
for example.
```
http://localhost:3001/api/indexes?name=nasdaq&from_time=1493284573&to_time=1493284610
```
