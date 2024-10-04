// const cart = document.querySelector('.cart');
// const cartProducts = document.querySelector('.cart__products');

// // видимость корзины
// function updateCartVisibility() {
//     if (cartProducts.children.length > 0) {
//         cart.classList.add('visible');
//     } else {
//         cart.classList.remove('visible');
//     }
// }

// // удаление товара из корзины
// function removeProductFromCart(productId) {
//     const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);
//     if (existingProduct) {
//         existingProduct.remove();
//         updateCartVisibility();
//     }
// }

// // увеличение/уменьшение количества товара
// document.addEventListener('click', (event) => {
//     const target = event.target;
//
//     if (target.classList.contains('product__quantity-control')) {
//         const productElement = target.closest('.product');
//         const quantityValue = productElement.querySelector('.product__quantity-value');
//         let quantity = parseInt(quantityValue.textContent);

//         if (target.classList.contains('product__quantity-control_inc')) {
//             quantity++;
//         } else if (target.classList.contains('product__quantity-control_dec') && quantity > 1) {
//             quantity--;
//         }

//         quantityValue.textContent = quantity;
//     }

//
//     if (target.classList.contains('product__add')) {
//         const productElement = target.closest('.product');
//         const productId = productElement.getAttribute('data-id');
//         const productImageSrc = productElement.querySelector('.product__image').src;
//         const quantityValue = productElement.querySelector('.product__quantity-value').textContent;

//         // проверка наличия товара в корзине
//         const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);
//         if (existingProduct) {
//             // Увеличиваем количество товара
//             const productCount = existingProduct.querySelector('.cart__product-count');
//             productCount.textContent = parseInt(productCount.textContent) + parseInt(quantityValue);
//         } else {
//             // добавление товара в корзину
//             const cartProduct = document.createElement('div');
//             cartProduct.className = 'cart__product';
//             cartProduct.setAttribute('data-id', productId);

//             // контейнер для деталей товара
//             const productDetails = document.createElement('div');
//             productDetails.className = 'cart__product-details';
//             productDetails.innerHTML = `
//                 <img class="cart__product-image" src="${productImageSrc}">
//                 <div class="cart__product-count">${quantityValue}</div>
//             `;

//             const removeButton = document.createElement('button');
//             removeButton.className = 'cart__product-remove';
//             removeButton.textContent = 'Удалить';

//             // компануем карточку товара
//             cartProduct.appendChild(productDetails);
//             cartProduct.appendChild(removeButton);

//             cartProducts.appendChild(cartProduct);
//         }

//         updateCartVisibility();
//     }

//     // удаление товара
//     if (target.classList.contains('cart__product-remove')) {
//         const cartProduct = target.closest('.cart__product');
//         const productId = cartProduct.getAttribute('data-id');
//         removeProductFromCart(productId);
//     }
// });


const cartProductsContainer = document.querySelector('.cart__products');
const cartTitle = document.querySelector('.cart__title');
const addButtons = document.querySelectorAll('.product__add');

// изменеие количества в магазине ("products")
document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('product__quantity-control')) {
        const productElement = target.closest('.product');
        const quantityValueElement = productElement.querySelector('.product__quantity-value');
        let quantity = parseInt(quantityValueElement.textContent);

        if (target.classList.contains('product__quantity-control_inc')) {
            quantity++;
        } else if (target.classList.contains('product__quantity-control_dec') && quantity > 1) {
            quantity--;
        }

        quantityValueElement.textContent = quantity;
    }
});

addButtons.forEach(button => {
    button.addEventListener('click', event => {
        const product = event.target.closest('.product');
        const productId = product.getAttribute('data-id');
        const productImage = product.querySelector('.product__image').src;
        const productQuantity = parseInt(product.querySelector('.product__quantity-value').textContent, 10);

        addProductToCart(productId, productImage, productQuantity);
        animateProductToCart(product.querySelector('.product__image'));
    });
});

function addProductToCart(id, imageSrc, quantity) {
    let existingProduct = cartProductsContainer.querySelector(`.cart__product[data-id="${id}"]`);

    if (existingProduct) {
        // увеличение количества товара
        let productCount = existingProduct.querySelector('.cart__product-count');
        productCount.textContent = parseInt(productCount.textContent, 10) + quantity;
    } else {
        // добавление товара в корзину
        const cartProduct = document.createElement('div');
        cartProduct.className = 'cart__product';
        cartProduct.setAttribute('data-id', id);

        cartProduct.innerHTML = `
            <img class="cart__product-image" src="${imageSrc}">
            <div class="cart__product-details">
                <div class="cart__product-count">${quantity}</div>
                <button class="cart__product-remove">Удалить</button>
            </div>
        `;

        cartProductsContainer.appendChild(cartProduct);

        // удаление товара из корзины
        cartProduct.querySelector('.cart__product-remove').addEventListener('click', () => {
            cartProduct.remove();
            saveCartToLocalStorage();
        });
    }

    saveCartToLocalStorage();
}

// Анимация
function animateProductToCart(productImage) {
    const clonedImage = productImage.cloneNode(true);
    clonedImage.style.position = 'absolute';
    clonedImage.style.zIndex = 1000;

    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartTitle.getBoundingClientRect();

    clonedImage.style.left = `${productRect.left}px`;
    clonedImage.style.top = `${productRect.top}px`;
    clonedImage.style.width = `${productImage.width}px`;

    document.body.appendChild(clonedImage);

    setTimeout(() => {
        clonedImage.style.transition = 'all 0.7s ease-in-out';
        clonedImage.style.left = `${cartRect.left}px`;
        clonedImage.style.top = `${cartRect.top}px`;
        clonedImage.style.width = '50px';
    }, 100);

    setTimeout(() => {
        clonedImage.remove(); // удаление клона изображения после завершения анимации
    }, 800);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartProducts', cartProductsContainer.innerHTML);
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartProducts');
    if (savedCart) {
        cartProductsContainer.innerHTML = savedCart;

        // Обновляем обработчики для кнопок удаления
        cartProductsContainer.querySelectorAll('.cart__product-remove').forEach(button => {
            button.addEventListener('click', event => {
                const product = event.target.closest('.cart__product');
                product.remove();
                saveCartToLocalStorage();
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);
