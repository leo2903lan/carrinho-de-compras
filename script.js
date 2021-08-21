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

const creatList = () => {
  const items = document.querySelector('.items');
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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemCart = async () => {
  const buttonAddCart = document.querySelector('.item_add');
  // const itemCartID = document.querySelector('.item_sku');
  const itemCartFetch = await fetch(`https://api.mercadolibre.com/items/${'MLB1341706310'}`);
  const itemCartJson = await itemCartFetch.json();
  const { sku, name, salePrice } = itemCartJson;
  console.log({
    sku,
    name,
    salePrice,
  });
    // createCartItemElement({ sku, name, salePrice });
};
addItemCart();

function cartItemClickListener(event) {
  
}



window.onload = () => {
  creatList();
 };
