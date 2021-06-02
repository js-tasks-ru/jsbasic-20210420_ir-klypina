export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let newItem = true;

    for (const item of this.cartItems) {
      if (item.product.id === product.id) {
        item.count++;
        newItem = false;
        break;
      }
    }

    if (newItem) {
      this.cartItems.push({ product: product, count: 1 });
    }

    this.onProductUpdate(this.cartItems);

    console.log(this.cartItems);
  }

  updateProductCount(productId, amount) {
    for (let i = 0; i < this.cartItems.length; i++) {
      const item = this.cartItems[i];

      if (item.product.id === productId) {
        item.count += amount;

        if (item.count === 0) {
          this.cartItems.splice(i, 1);
        }
      }
    }

    this.onProductUpdate(this.cartItems);

    console.log(this.cartItems);
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

