export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItem = {};

    for (const item of this.cartItems) {
      if (item.product.id === product.id) {
        item.count++;
        cartItem = { ...item };
        break;
      }
    }

    if (Object.keys(cartItem).length === 0) {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = {};

    for (let i = 0; i < this.cartItems.length; i++) {
      const item = this.cartItems[i];

      if (item.product.id === productId) {
        item.count += amount;
        cartItem = { ...item };

        if (item.count === 0) {
          this.cartItems.splice(i, 1);
        }
      }
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let totalCount = 0;

    for (const item of this.cartItems) {
      totalCount += item.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (const item of this.cartItems) {
      totalPrice += item.count * item.product.price;
    }

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

