import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    const modalBody = createElement(`<div></div>`);
    this.cartItems.forEach(({ product, count }) => modalBody.append(this.renderProduct(product, count)));
    modalBody.append(this.renderOrderForm());

    this.modal.setBody(modalBody);

    this.modal.elem.addEventListener('click', (event) => {
      let button = event.target.closest('.cart-counter__button');
      if (!button) return;

      const productId = button.closest('.cart-product').dataset.productId;
      const amount = button.classList.contains('cart-counter__button_minus') ? -1 : 1;

      this.updateProductCount(productId, amount);
    });

    this.modalForm = this.modal.elem.querySelector('.cart-form');
    this.modalForm.addEventListener('submit', event => this.onSubmit(event));

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.querySelector('body').classList.contains('is-modal-open')) {
      const modalBody = this.modal.elem.querySelector('.modal__body');
      const productElement = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"]`);

      if (cartItem.count === 0) {
        productElement.remove();

        if (this.cartItems.length === 0) this.modal.close();
      } else {
        productElement.querySelector('.cart-counter__count').innerHTML = cartItem.count;
        productElement.querySelector('.cart-product__price').innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      }

      modalBody.querySelector('.cart-buttons__info-price').innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.modalForm.querySelector('button[type="submit"]').classList.add('is-loading');

    const formData = new FormData(this.modalForm);
    const responsePromise = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST'
    });

    responsePromise.then(response => {
      this.modal.setTitle('Success!');
      this.cartItems = [];

      const modalBody = createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`);
      this.modal.setBody(modalBody);
      this.cartIcon.update(this);
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

