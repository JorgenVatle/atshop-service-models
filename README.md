# TypeScript Service Models for ATShop 2.0
A collection of models for interacting with the ATShop API. Easily **c**reate, **r**ead, **u**pdate and **d**elete 
ATShop resources.

![npm](https://img.shields.io/npm/v/atshop-service-models.svg)
![node](https://img.shields.io/node/v/atshop-service-models.svg)

> **NOTICE** This is still very much a work in progress. The documentation for this package is mostly provided 
exclusively through TypeScript type hints.

## Installation & Setup
There's a couple steps to getting started with `atshop-service-models`.

### 1. Install
Just pull in the package through npm.
```bash
npm install atshop-service-models
```

### 2. Install dependencies.
Depending on where you're implementing these models, you'll also need to pull in and setup a 
[Feathers](https://feathersjs.com/) client.
```bash
npm install @feathersjs/feathers @feathersjs/socketio-client socket.io-client
```

### 3. Setting up the Feathers client.
To set up `atshop-service-models`, you'll first need to get your API client up and running.
```typescript
import Feathers from '@feathersjs/feathers';
import FeathersIO from '@feathersjs/socketio-client';
import SockeIO from 'socket.io-client';

const SocketClient = FeathersIO(SockeIO('https://api.atshop.io'));
const FeathersClient = Feathers();

FeathersClient.configure(SocketClient);
```

### 4. Setting up `atshop-service-models`
```typescript
import { SetupServiceModels } from 'atshop-service-models';

SetupServiceModels({
    app: FeathersClient,
});
```

**Setup complete!**

## Shops

### Fetch a shop by domain or ID.
```typescript
import ShopModel from 'atshop-service-models/models/ShopModel';

// Fetch a shop by subdomain: (e.g. test-shop.atshop.io)
let Shop = await ShopModel.find({ domain: 'test-shop' }).fetchOne();

// Fetch a shop by custom domain: (e.g. example.com)
Shop = await ShopModel.find({ customDomain: 'example.com' });

// Fetch a shop by ID
Shop = await ShopModel.get('ZBAWZE4LzB4RoguGY');
```

### Fetch a shop's products.  
```typescript
const products = await Shop.products.fetch(); // Returns an instance of PaginatedServiceModel.

products.data.forEach((product) => {
    console.log(product.name);          // Product name.
    console.log(product.description);   // Product description markdown.
    console.log(product.minQuantity);   // Minimum order quantity for the product.
    console.log(product.stockCount);    // Remaining stock.
    console.log(product.value);         // Dinero.js instance of the product price.
                                        // https://sarahdayan.github.io/dinero.js/
});
```

### Fetch a shop's categories
```typescript
const categories = await Shop.categories.fetch();

categories.data.forEach((category) => {
    console.log(category.title);    // Category heading
    console.log(category.slug);     // Category slug
    console.log(category.position); // Position of category relative to other categories.
});
```

## Orders

### Get an order by ID
```typescript
import OrderModel from 'atshop-service-models/models/OrderModel';

const order = await OrderModel.get('orderIdHere');

console.log(await order.product);       // Product ordered. 
console.log(await order.humanValue());  // Order value in a human format.
console.log(order.quantity);            // Quantity of product ordered.
console.log(order.description);         // Order description.
```

## Adding your own properties and methods
You can rather easily extend a model with your own functionality if you have any implementation specific needs.
```typescript
import OrderServiceModel from 'atshop-service-models/models/OrderModel';

class OrderModel extends OrderServiceModel {
    
    get emailer() {
        return new MyEmailerService({ defaultEmail: this.email });
    }
    
    sendThankYouEmail() {
        this.emailer.send({ message: 'Thank you for placing an order!' });
    }
    
}

// Send email.
OrderModel.get('someOrderId').then((order) => order.sendThankYouEmail());
```

## Hooking into real-time events
If you're using the [Feathers Socket.io client](https://docs.feathersjs.com/api/client/socketio.html) as described in
the above setup instructions, you'll be able to listen for changes made to ATShop resources. This isn't strictly a 
feature of `atshop-service-models` as this functionality is provided directly by the [Feathers](https://feathersjs.com/)
instance you passed `atshop-service-models` during setup. 

```typescript
import OrderModel from 'atshop-service-models/models/OrderModel';

// Do note that you will receive events for all orders that are created for shops you have administrative permissions for.
OrderModel.service.on('created', (orderData) => {
    const order = new OrderModel(orderData);
    const product = await order.product;
    const stock = product.stockForSale.count();
    
    console.log(`An order was created by ${order.email}, you'll have ${stock - order.quantity} stock left after the order has been paid for.`)
})
```

See the [Feathers Events](https://docs.feathersjs.com/api/events.html) documentation for more information on this. 

## License
This repository is licensed under the ISC license.

Copyright (c) 2019, Jørgen Vatle.