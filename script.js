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

const subCart = async (price) => {
  const itemEvent = price.target.innerText.split('$')[1];
  const priceLocalStorage = localStorage.getItem('total');
  const subPrice = Number(priceLocalStorage) - itemEvent;
  localStorage.setItem('total', subPrice);
  const elementoP = document.getElementById('pElement');
  elementoP.innerText = subPrice;
};

const cartItemClickListener = async (event) => {
  await subCart(event);
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

const somaCart = async (price) => {
  const itemsCart = localStorage.getItem('total');
  const somaPrice = Number(itemsCart) + price;
  localStorage.setItem('total', somaPrice);
  const elementoP = document.querySelector('total-price,p');    
  elementoP.innerText = somaPrice;
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

      await somaCart(salePrice);
    });
  });
};

const creatPriceElement = () => {
  const cart = document.querySelector('.cart');
  const priceTag = document.createElement('section');
  priceTag.className = 'total-price';
  const pTotal = document.createElement('p');
  pTotal.id = 'pElement';
  // const pDescription = document.createElement('h4');
  // pDescription.innerText = 'VALOR TOTAL:';
  const totalLocal = localStorage.getItem('total');
  const total = 0 + Number(totalLocal);

  pTotal.innerText = total;
  // priceTag.appendChild(pDescription);
  priceTag.appendChild(pTotal);
  cart.appendChild(priceTag);
  localStorage.setItem('total', total);
};

const recCartOnLoad = () => {
  const olCart = document.querySelector('.cart__items');
  const cartLocal = localStorage.getItem('olCart');
  // const somaLocalStorage = localStorage.getItem('total');
  olCart.innerHTML = cartLocal;
  creatPriceElement();
  olCart.addEventListener('click', cartItemClickListener);
};

const olRemove = () => {
  const olCartRemove = document.querySelector('.cart__items');
  localStorage.removeItem('olCart');
  localStorage.removeItem('total');
  const elementoP = document.querySelector('total-price,p');
  elementoP.innerText = 0;  
  olCartRemove.innerHTML = '';
};

const removeCartItems = () => {
  const btnRemove = document.querySelector('.empty-cart');
  btnRemove.addEventListener('click', olRemove);
};

window.onload = async () => {
  await creatList();
  const p = document.querySelector('.loading');
  p.remove();
  addItemCart();
  recCartOnLoad();  
  removeCartItems();
};
