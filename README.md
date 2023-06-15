# Book-Managment-webapp

## API Documentation using Postman
DOCS : ("https://documenter.getpostman.com/view/23026707/2s93sgWVsw")
## Hosting on Render.com
BASE_URL : https://book-managment-webapp.onrender.com

created a book management application API using NodeJS and Express.
for managment of records and book

# Brain-Storming Session Data

# Routes and Endpoints

## /users

POST : Create a new user
GET : Get all list of Users

## /users/${id} Dynamic Route

Unique ID will be given to every subscriber
/users/${id} is a dynamic route.
a unique route for a specific subscriber

GET : get the user by ID
PUT : update a user by ID
DELETE : delete a user by ID
-> (Check user has a issued book or fine if there is then dont delete
it warn it and no books are due and no fine then delete the user)

## /users/subscription-details/${id}

GET : Get user Subscription Details

1. Date of Sub
2. Valid Till
3. Fines

## /books

GET : Get all Books in Library
POST : Add a Book in Lib

## /books/${id}

GET : Get a book by ID
PUT : Update a book by ID
DELETE : DELETE a book by ID(ony if it is not issued)

## /books/issued/withFine

<!-- To Do Task ..... -->

GET : Get all issued books with Fine

# subscription Types

Basic : 3 months
Standard : 6 months
Premium : 12 months

Note :Dates will be in format MM/DD/YYYY

# Logic :

If (subscription_date is 01/08/22 && standard )
then Valid till 01/02/23

If (Issued book is to be returned till 01/01/22 && misses the date)
then fine of 100 Rs

If (Issued book is to be returned till 01/01/22 && misses the date && subscription is ended)
then fine of 200rs additional will be awarded
