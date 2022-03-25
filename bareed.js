/**************************************************************
 * Point: defines a point on the map using X and Y coordinates
 *
 * x: x coordinate
 * y: y coordinate
 *
 * distanceTo(point): takes a point, calculates the distance to
 *                     that point from the current point.
 *
 * let point = new Point(x, y);
 ****************************************************************/
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo = point => {
    let xDelta = this.x - point.x;
    let yDelta = this.y - point.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta); // PYTHAGORAS!
  };

  equals = point => point.x === this.x && point.y === this.y;

  static randomPoint = (maxX, maxY) => {
    let x = Math.random() * (maxX || 100);
    let y = Math.random() * (maxY || 100);
    return new Point(x, y);
  };
}

/**********************************************************
 * Wallet: keeps track of money
 *
 * money: how much money is in the wallet. Defaults to 0.
 *
 * credit(amount): adds `amount` to `money`.
 *
 * debit(amount): subtracts `amount` from `money`.
 *
 * let wallet = new Wallet(money);
 **********************************************************/
class Wallet {
  // implement Wallet!
  constructor(money = 0) {
    this.money = money;
  }

  credit = amount => {
    this.money += amount;
  }

  debit = amount => {
    this.money -= amount;
  }
}

/**********************************************************
 * Person: defines a person with a name (and feelings)
 *
 * name: name of said person
 * location: a Point instance
 * wallet: a Wallet instance initially with 0.
 *
 * moveTo(point): updates the `location` to `point`
 *
 * let person = new Person(name, x, y);
 **********************************************************/
class Person {
  // implement Person!
  constructor(name,location1, location2, wallet) {
    this.name = name;
    this.location = new Point(location1, location2);
    this.wallet = new Wallet(wallet);
  }

  moveTo = point => { 
   this.location = point;
  };
}

/**********************************************************
 * Vendor: defines a vendor
 * Subclasses Person
 *
 * range: the maximum distance this vendor can travel - initially 5
 * price: the cost of a single ice cream - initially 1
 *
 * sellTo(customer, numberOfIceCreams):  sells a specific number of ice creams
 *     to the customer by doing the following:
 *         - Moves to the customer's location
 *         - Transfers money from the customer's wallet
 *           to the vendor's wallet
 *
 * new vendor = new Vendor(name, x, y);
 **********************************************************/
class Vendor extends Person{
  // implement Vendor!
  constructor(name, location1, location2, wallet, range = 5, price = 1) {
    super(name, location1, location2, wallet);
    this.range = range;
    this.price = price;
  }

  sellTo = (customer, numberOfIceCreams) => {
    this.moveTo(customer.location); 
    let totalPrice = this.price * numberOfIceCreams;
    
    this.wallet.credit(totalPrice);
    customer.wallet.debit(totalPrice);
  }
}

/**********************************************************
 * Customer: defines a customer
 * Subclasses Person
 *
 * wallet: a Wallet instance initially with 10.
 *
 * _isInRange(vendor): checks if the customer is in range of vendor.
 *
 * _haveEnoughMoney(vendor, numberOfIceCreams): checks if the customer
 *     has enough money to buy a specific number of ice creams from vendor.
 *
 * requestIceCream(vendor, numberOfIceCreams): if the customer is in the vendor's
 *     range and has enough money for ice cream, a request is sent to the vendor.
 *
 * new customer = new Customer(name, x, y);
 **********************************************************/
class Customer extends Person {
  // implement Customer!
  constructor(name, location1, location2, wallet = 10) {
    super(name, location1, location2, wallet);
  }

  _isInRange = vendor => {
    let customerRange = this.location.distanceTo(this.location);

    if(customerRange <= vendor.range) return true;
    else return false;
  }

  _haveEnoughMoney = (vendor, numberOfIceCreams) => {
    let totalPrice = vendor.price * numberOfIceCreams;

    if(this.wallet >= totalPrice) return true;
    else return false;
  }

  requestIceCream = (vendor, numberOfIceCreams) => {
    if(this._isInRange(vendor) === true && this._haveEnoughMoney(vendor, numberOfIceCreams) === true) {
      vendor.sellTo(this.Customer, numberOfIceCreams);
    }
  }
}

export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
