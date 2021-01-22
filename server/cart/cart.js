const { Cart } = require('../../models');

const itemIds = Cart.findAll();
console.log(itemIds);
console.log("helo");