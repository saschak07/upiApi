# upiApi

## Tech stacks

* Node.js

* express

* mongoDb

## database schema

collection 1: ->user

```json
{
    "_id" : ObjectId("5f81da0d5675a40d7bc947cc"),
    "name" : "saswata",
    "userName" : "mashi",
    "passwd" : "$2a$08$T.q5hEFtlIUjg7i0yxIAa.SJq7nVGHk4wYf7SYrIICvsJki9lQdmC",
    "tokens" : [ 
        {
            "_id" : ObjectId("5f81da195675a40d7bc947ce"),
            "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJtYXNoaSIsImlhdCI6MTYwMjM0NTQ5N30.yjOcdoxeUeDLDRxWMQEe3auCxooELZND6y_0gwsL3DE"
        }
    ],
    "accountNumber" : "83QJ43DK",
    "createdAt" : ISODate("2020-10-10T15:58:05.335Z"),
    "updatedAt" : ISODate("2020-10-10T16:03:10.973Z"),
    "__v" : 3
}
```

collection 2: ->account details

```json

{
    "_id" : ObjectId("5f8270872a64d202b9368a7f"),
    "accountNumber" : "83QJ43DK",
    "description" : "ABC Ltd",
    "date" : ISODate("2018-12-31T18:30:00.000Z"),
    "withdraw" : 5000,
    "deposit" : null,
    "balance" : 70000,
    "createdAt" : ISODate("2020-10-11T02:40:07.639Z"),
    "updatedAt" : ISODate("2020-10-11T02:40:07.639Z"),
    "__v" : 0
}
```

### Exposed REST APIs

1. Register user:
 
 url: http://localhost:3000/register
 
 http method: POST
 
 request body
 
 ```json
{
    "name": "saswata",
    "userName": "saschak",
    "passwd": "hojapani!!!"
}
```
respone:
```json

{
    "accountNumber": "88GY81HS",
    "userName": "saschak",
    "name": "saswata"
}
```

2. Login user:
 
 url: http://localhost:3000/login
 
 http method: POST
 
 request body
 
 ```json
{
    "userName": "mashi",
    "passwd": "hojapani!!!"
}
```
respone:
```json

{
    "userName": "mashi",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJtYXNoaSIsImlhdCI6MTYwMjM4NDg4OH0.-8bsfLNSIEmNIhRsiB5Y3rvUYRLkWIZdqixNCOGsKXw"
}
```

3. Logout user:
 
 url: http://localhost:3000/logout
 
 http method: POST
 
 headers: Authentication = Bearer <JWTTOKEN>
 
respone:
 200 OK

3. Upload CSV:
 
 url: http://localhost:3000/uploadCsv
 
 http method: POST
 
 request body:
form data, key = uploadfile, value = <File.csv>
 
respone:
```json

{
    "creditLimit": 26518.3,
    "rate": "8.0%"
}
```


