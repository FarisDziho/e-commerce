var users = [
  {
    id: 1,
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    password: "JohnDoe",
    cart: {
      ItemIds: [1, 2, 3],
    },
  },
  {
    id: 2,
    name: "Sam Walker",
    email: "SamWalker@gmail.com",
    password: "SamWalker",
    cart: {
      ItemIds: [1, 2],
    },
  },
  {
    id: 3,
    name: "CJ",
    email: "CJ@gmail.com",
    password: "CJ",
    cart: {
      ItemIds: [1, 2, 3, 4],
    },
  },
];

var items = [
  {
    id: 1,
    name: "laptop",
    price: 1000,
    img: "https://m.media-amazon.com/images/I/71dqjxW8g5L._QL65_AC_UL640_.jpg",
  },
  {
    id: 2,
    name: "watch",
    price: 100,
    img: "https://m.media-amazon.com/images/I/61uCuln0wtL._QL65_AC_UL640_.jpg",
  },
  {
    id: 3,
    name: "car",
    price: 10000,
    img: "https://m.media-amazon.com/images/I/61j4rGqQdsL._AC_UL320_.jpg",
  },
  {
    id: 4,
    name: "USB",
    price: 10,
    img: "https://m.media-amazon.com/images/I/61qaKGE40wL._QL65_AC_UL640_.jpg",
  },
];

module.exports = {
  users,
  items,
};
