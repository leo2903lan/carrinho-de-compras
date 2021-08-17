// const BASE_URL = 'https://api.mercadolibre.com/sites/MLB';

// const fetchProduct = async () => {
//   const data = await fetch(`${BASE_URL}/search?q=computador`);
//   const products = await data.json();
//   console.log(products);
//   return products;
// };

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




// async function createElement(promise) {
//   const resultado = await promise.then((result) => result);
//   const objPqn = edgeProduct(resultado);
//   console.log(objPqn);  
// };
// createElement(creatList());

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
    // escreva aqui;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => {
  creatList();
  // fetchProduct();
 };
