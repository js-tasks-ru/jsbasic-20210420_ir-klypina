import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this._render(this.products);
  }

  _render(products) {
    const innerElem = `
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `;

    this.elem = createElement(innerElem);
    this._addProducts(products);
  }

  _addProducts(products) {
    const productsInnerElement = this.elem.querySelector('.products-grid__inner');
    productsInnerElement.innerHTML = '';

    products.forEach(product => {
      const productElement = new ProductCard(product);
      productsInnerElement.append(productElement.elem);
    });
  }

  updateFilter(filters) {
    for (const key in filters) {
      this.filters[key] = filters[key];
    }

    const filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) return false;
      if (this.filters.vegeterianOnly && !product.vegeterian) return false;
      if (this.filters.maxSpiciness && product.spiciness > this.filters.maxSpiciness) return false;
      if (this.filters.category && !(product.category === this.filters.category)) return false;

      return true;
    });

    this._addProducts(filteredProducts);
  }
}
