function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const edgeProduct = (resultsSearch) => {
  const productElement = {
    sku: resultsSearch.id,
    name: resultsSearch.title,
    image: resultsSearch.thumbnail,
  };
  return productElement;
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const loadingOn = () => {
  const elementP = document.createElement('p');
  elementP.className = 'loading';
  elementP.innerText = 'loading...';
  const items = document.querySelector('.items');
  items.appendChild(elementP);
};

const creatList = async () => {
  const items = document.querySelector('.items');

  loadingOn();

  const listaMl = fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador')
    .then((response) => response.json())
    .then((resultado) => resultado.results.map((itemDoResults) =>
      edgeProduct(itemDoResults)))
    .then((resultadoFinal) => resultadoFinal.forEach((objtPeqn) => {
      items.appendChild(createProductItemElement(objtPeqn));
    }));

  return listaMl;
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const cartItemClickListener = (event) => {
  event.target.remove();
  localStorage.removeItem('olCart', event.target);
  const olCart = document.querySelector('ol');
  localStorage.setItem('olCart', olCart.innerHTML);
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const buscaItemFetch = async (id) => {  
  const itemCartFetch = await
    fetch(`https://api.mercadolibre.com/items/${id}`);
  const itemCartJson = await itemCartFetch.json();  
  return itemCartJson;
};

const addItemCart = async () => {
  const olCart = document.getElementsByClassName('cart__items')[0];
  const btnAddCart = document.querySelectorAll('.item__add');
  btnAddCart.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const txtId = event.target.parentNode.firstChild.innerText;
      const { id: sku, title: name, price: salePrice } = await buscaItemFetch(txtId);
      const elementoLi = createCartItemElement({ sku, name, salePrice });
      olCart.appendChild(elementoLi);
      localStorage.setItem('olCart', olCart.innerHTML);
    });
  });
};

const recCartOnLoad = () => {
  const olCart = document.querySelector('.cart__items');
  const cartLocal = localStorage.getItem('olCart');
  olCart.innerHTML = cartLocal;
  olCart.addEventListener('click', cartItemClickListener);
};

const olRemove = () => {
  const olCartRemove = document.querySelector('.cart__items');
  localStorage.removeItem('olCart');
  olCartRemove.innerHTML = '';
  console.log(olCartRemove);
};

const removeCartItems = () => {
  const btnRemove = document.querySelector('.empty-cart');
  btnRemove.addEventListener('click', olRemove);
};

const creatPriceElement = () => {
  const cart = document.querySelector('.cart');
  const priceTag = document.createElement('section');
  priceTag.className = 'total-price';
  const pTotal = document.createElement('p');
  const pDescription = document.createElement('h4');
  pDescription.innerText = 'VALOR TOTAL:';
  const total = 0;
  console.log(priceTag);
  console.log(cart);
  pTotal.innerText = `$${total}`;
  priceTag.appendChild(pDescription);
  priceTag.appendChild(pTotal);
  cart.appendChild(priceTag);
};

const somaCart = async () => {
const itemsCart = localStorage.getItem('olCart');

};

window.onload = async () => {
  await creatList();
  const p = document.querySelector('.loading');
  p.remove();
  addItemCart();
  recCartOnLoad();  
  removeCartItems();
  creatPriceElement();
  await somaCart();
};
