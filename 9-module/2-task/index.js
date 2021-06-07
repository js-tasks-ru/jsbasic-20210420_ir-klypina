import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    const carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    const ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);

    const stepSlider = new StepSlider({ steps: 5, value: 2 });
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);

    const cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    this.cart = new Cart(cartIcon);

    this.products = await fetch('products.json').then(result => result.json());
    this.productsGrid = new ProductsGrid(this.products);
    const gridElementsContainer = document.querySelector('[data-products-grid-holder]');
    gridElementsContainer.innerHTML = '';
    gridElementsContainer.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    document.querySelector('body').addEventListener('product-add', this._productAddEvent);
    stepSlider.elem.addEventListener('slider-change', this._sliderChangeEvent);
    ribbonMenu.elem.addEventListener('ribbon-select', this._ribbonSelectEvent);
    document.querySelector('#nuts-checkbox').addEventListener('change', this._changeNutsEvent);
    document.querySelector('#vegeterian-checkbox').addEventListener('change', this._changeVegetarianEvent);
  }

  _productAddEvent = (event) => {
    const productId = event.detail;
    const product = this.products.find(product => product.id === productId);
    this.cart.addProduct(product);
  };

  _sliderChangeEvent = (event) => {
    this.productsGrid.updateFilter({
      maxSpiciness: event.detail
    });
  };

  _ribbonSelectEvent = (event) => {
    this.productsGrid.updateFilter({
      category: event.detail
    });
  };

  _changeNutsEvent = (event) => {
    this.productsGrid.updateFilter({
      noNuts: event.target.checked
    })
  };

  _changeVegetarianEvent = (event) => {
    this.productsGrid.updateFilter({
      vegeterianOnly: event.target.checked
    })
  };
}
