// shopping data

const cart = [
  {
    id: "P101",
    name: "Laptop",
    price: 60000.456,
    quantity: 1,
    category: "electronics",
  },
  {
    id: "P102",
    name: "Mouse",
    price: 799.99,
    quantity: 2,
    category: "electronics",
  },
  {
    id: "P103",
    name: "Notebook",
    price: 99.5,
    quantity: 3,
    category: "stationery",
  },
];

// QUESTIONS
// 1. Prepare cart data
//     a. Sort cart items by price.
//     b. Locate the first item belonging to a specific category.
// 2. Validate cart items
//     a. Ensure all items have a quantity greater than zero.
// 3. Calculate pricing
//     a. Compute the total cart value.
//     b. Apply tax and discount rules.
// 4. Encapsulate logic
//     a. Group pricing logic inside an object.
//     b. Use this to access tax rates, discounts, and cart data.
// 5. Ensure correctness
//     a. Round monetary values appropriately.
//     b. Do not mutate the original cart data.
// */

// deep copy vs shallow copy => in this data , we only hava to deal with top /level keys and values -> choosing shallow copy won't harm us
// as there is no nested obects or arrays prsent that may lead to modification .
// if this json would have contained a nested object or array -> we would prefer deep copy orver shallow

// For this i am using object methods as i have use class method in previous problem . We can also do class method here. I choose object one 
// for learnign.

const ProductOperation = {
  products: cart.map((item) => ({ ...item })),
  tax: 0.3,
  discount: 0.1,

  // question 1a => sort prices in ascending order
  sortByPrice() {
    const sortedProducts = [...this.products].sort((a, b) => a.price - b.price); // sorts in ascending order
    return sortedProducts;
  },
  // question 1b => find first product of category
  firstCategoryProduct(category) {
    return this.products.find((item) => item.category === category);
  },
  // question 2  => quantity greater than 0
  ValidCartItems() {
    const validItems = [...this.products].filter((u) => u.quantity > 0);
    return validItems;
  },
  // quesiton 3a => finding total cart value
  totalCartValue() {
    return this.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
  // question 3b => applying tax and discount on it
  calculateDiscountedAndAfterTaxValue() {
    const total = this.totalCartValue(); // 60000.456 + 799.99*2 + 99.5*3
    const discounted = total * (1 - this.discount); // discount applied
    const afterTax = discounted * (1 + this.tax); // tax applied
    return Math.round(afterTax * 100) / 100; // round to 2 decimals
  },
};

console.log(ProductOperation.calculateDiscountedAndAfterTaxValue());
console.log(ProductOperation.sortByPrice());
console.log(ProductOperation.firstCategoryProduct("electronics"));
console.log(ProductOperation.ValidCartItems())
