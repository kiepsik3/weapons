let weapons = [{ name: "The Grim Reaper", img: "./images/gun.png", price: 31000 }, { name: "Sniper", img: "./images/gun.png", price: 89500 }, { name: "Duty Calls", img: "./images/gun.png", price: 450000 }, { name: "MP40", img: "./images/gun.png", price: 75300 }, { name: "M16", img: "./images/gun.png", price: 24800 }, { name: "Thompson", img: "./images/gun.png", price: 12500 }];

/* I left the idea to creating the second array, although the first version of app was using it. It is enough for now, maybe for more-functional features second array might be helpfurl.
let checkout = [];
*/

let allFundsValue = 150000;
let checkoutItemsCount = 0;
let purchaseValue = 0;

let itemsContainer = document.getElementById('shoppingCart');

let allFundsElement = document.getElementById('fundsValue');
let checkoutItemsAmountElement = document.getElementById('checkoutItemsAmount');
let purchaseValueElement = document.getElementById('purchaseValue');

let checkoutContainer = document.getElementById('checkoutContainer')

allFundsElement.textContent = numberWithSpaces(allFundsValue);
checkoutItemsAmountElement.textContent = checkoutItemsCount.toString();
purchaseValueElement.textContent = purchaseValue.toString();

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function numberWithoutSpaces(x) {
    return x.toString().replace(/ /g, '');
}

(function createWeapons() {
        weapons.forEach(key => {
        let singleItem = document.createElement("div");
        singleItem.className = "shopping-cart__item";
        itemsContainer.appendChild(singleItem);

        let itemName = document.createElement("span");
        itemName.className = "item-name";
        itemName.textContent = key.name;
        singleItem.appendChild(itemName);

        let itemImage = document.createElement("img");
        itemImage.className = "item-img";
        itemImage.src = key.img;
        singleItem.appendChild(itemImage);

        let itemPrice = document.createElement("button");
        itemPrice.className = "item-price";
        singleItem.appendChild(itemPrice);
        itemPrice.onclick = addToCart;

        let itemPriceLabel = document.createElement("span");
        itemPriceLabel.className = "item-price__label";
        itemPriceLabel.textContent = numberWithSpaces(key.price);
        itemPrice.appendChild(itemPriceLabel);

        let itemPriceIcon = document.createElement("span");
        itemPriceIcon.className = "item-price__icon";
        itemPrice.appendChild(itemPriceIcon);
    });
})();

function addToCart() {
    let getWeaponName = this.parentNode.childNodes[0].textContent;
    let getWeaponImg = this.parentNode.childNodes[1].getAttribute("src");
    let getWeaponPrice = this.childNodes[0].textContent;
    let goldIconButton = this.childNodes[1];

    let checkoutItem = document.createElement("div");
    checkoutItem.className = "checkout-item";
    checkoutContainer.appendChild(checkoutItem);

    let checkoutItemName = document.createElement("span");
    checkoutItemName.className = "checkout-item__label";
    checkoutItemName.textContent = getWeaponName;
    checkoutItem.appendChild(checkoutItemName);

    let checkoutItemPrice = document.createElement("span");
    checkoutItemPrice.className = "checkout-item__price";
    checkoutItemPrice.textContent = getWeaponPrice;
    checkoutItem.appendChild(checkoutItemPrice);

    let checkoutItemImg = document.createElement("img");
    checkoutItemImg.className = "checkout-item__img";
    checkoutItemImg.src = getWeaponImg;
    checkoutItem.appendChild(checkoutItemImg);

    checkoutItemsAmountElement.textContent = checkoutContainer.childElementCount.toString();

    let currentFundsValue = allFundsValue -= parseInt(numberWithoutSpaces(getWeaponPrice));
    allFundsElement.innerHTML = numberWithSpaces(currentFundsValue);

    let currentPurchaseValue = purchaseValue += parseInt(numberWithoutSpaces(getWeaponPrice));
    purchaseValueElement.innerHTML = numberWithSpaces(currentPurchaseValue);

    if (!this.parentElement.classList.contains("shopping-cart__item--in-cart")) {
        this.parentElement.classList.add("shopping-cart__item--in-cart");
        this.childNodes[0].textContent = "In cart";
        goldIconButton.style.display = "none";
        /* I am not sure about deleting items from checkout cart, for now it is not possible, maybe TODO */
        this.setAttribute("disabled", true);
    }
    isTooExpensive();
}

let allItems = document.querySelectorAll('.shopping-cart__item');

function isTooExpensive() {
    allItems.forEach(element => {
        let allItemsPrices = parseInt(numberWithoutSpaces(element.childNodes[2].childNodes[0].textContent));
        if (Number.isInteger(allItemsPrices) && allItemsPrices > allFundsValue && !element.classList.contains('shopping-cart__item--too-expensive')) {
            element.classList += " shopping-cart__item--too-expensive";
            element.childNodes[2].setAttribute("disabled", true);
        }
    })
};

isTooExpensive();

function purchase() {
    while (checkoutContainer.hasChildNodes()) {
        checkoutContainer.removeChild(checkoutContainer.lastChild);
    }

    checkoutItemsAmountElement.textContent = "0";
    purchaseValueElement.textContent = "0";

    allItems.forEach(e => {
        if(e.classList.contains("shopping-cart__item--in-cart")) {
            e.classList.remove("shopping-cart__item--in-cart");
            e.classList.add("shopping-cart__item--owned");
            e.childNodes[2].childNodes[0].textContent = "Owned";
        }
    });
}