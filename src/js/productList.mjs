import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img src="${product.Image}" alt="Image of ${product.Name}"/>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

// Define the renderList function
export function renderList(renderSelector, productListData) {
  const container = document.querySelector(renderSelector);
  container.innerHTML = productListData.map(productCardTemplate).join('');
}

// Filtering out unnecessary tents
function filterTents(products) {
  const neededTents = ['Marmot Ajax Tent', 'The North Face Talus Tent', 'The North Face Alpine Guide Tent', 'Cedar Ridge Rimrock Tent'];
  return products.filter(product => neededTents.includes(product.Name));
}

// Define the productList function
export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const container = document.querySelector(selector);
  // get the list of products
  const products = await getData(category);
  // Filter products to show only the needed 4 tents
  const filteredProducts = filterTents(products);
  // render out the filtered product list to the element
  renderListWithTemplate(productCardTemplate, container, filteredProducts);
}
