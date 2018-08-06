# OrdersRestfulAPI

This is a demo of a Orders Restful API that connects to a mongo cloud database. This demonstrates how to connect to a mongo db (No SQL) and how to set up different routes for get, add, delete, and update requests.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
Valid email
Mongo Atlas DB account ( https://mongodb.com)
Postman for testing different requests
Node.js 8.113 LTS
```

### Installing

```
Step 1: Download zip file and unzip it.
Step 2: Set up free version of cluster at cloud.mongodb.com, and click the connect button after cluster generates to get your mongodb path.
Step 3: Change the app file to put your Mongo DB path on line 10: Ex. mongoose.connect('mongodb://username:pw!@cluster0-shard....
Step 3: Install the following Node packages.
- npm install --save express
- npm install --save mongoose
- npm install --save nodemon
- npm install --save morgan
- npm install --save mongodb 
Step 4: Open postman and access local host as a test localhost:"YOUR_PORT#"/orders/ (EX. localhost:3001/orders/)
Step 5: Congratulations you have successfully setup the Orders API.
```

### Supported Methods
  
  <_The request type_>

  `GET` | `POST` | `DELETE` | `PUT`
  
### Valid URL Params

Products
* localhost:3001/products/
* localhost:3001/products/productId

Orders
* localhost:3001/order/
* localhost:3001/order/orderId

## Built With

* JSON - Dependecies 
* Javascript - DOM Manipulation

## Contributing

Please read [CONTRIBUTING.md](https://github.com/gremlokk) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Github](http://github.com) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

**Fredrick Ryans** - *Initial work* - [Gremlokk](https://github.com/gremlokk)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under my own two hands - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

This project was inspired to increase productivity by allowing users to have a easy way to send web pages to themselves fast.

