console.clear();

// Update the cart badge count if available
if (document.cookie.indexOf(',counter=') >= 0) {
    const counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

const cartContainer = document.getElementById('cartContainer');
const boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// Function to dynamically render the cart section
function dynamicCartSection(product, itemCounter) {
    const boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    const boxImg = document.createElement('img');
    boxImg.src = product.preview;
    boxDiv.appendChild(boxImg);

    const boxh3 = document.createElement('h3');
    const h3Text = document.createTextNode(`${product.name} × ${itemCounter}`);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    const boxh4 = document.createElement('h4');
    const h4Text = document.createTextNode(`Amount: Rs ${product.price * itemCounter}`);
    boxh4.appendChild(h4Text);
    boxDiv.appendChild(boxh4);

    cartContainer.appendChild(boxContainerDiv);
    return cartContainer;
}

// Container for the total amount
const totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

const totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

const totalh2 = document.createElement('h2');
const h2Text = document.createTextNode('Total Amount');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

// Function to update the total amount in the cart
function amountUpdate(amount) {
    const totalh4 = document.createElement('h4');
    const totalh4Text = document.createTextNode(`Amount: Rs ${amount}`);
    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);
    totalDiv.appendChild(buttonDiv);
}

// Add "Place Order" button
const buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

const buttonTag = document.createElement('button');
buttonDiv.appendChild(buttonTag);

const buttonLink = document.createElement('a');
buttonLink.href = '/orderPlaced.html';
buttonTag.appendChild(buttonLink);

const buttonText = document.createTextNode('Place Order');
buttonTag.onclick = function () {
    console.log("Order Placed");
};
buttonTag.appendChild(buttonText);

// Fetch product data and populate cart
const httpRequest = new XMLHttpRequest();
let totalAmount = 0;

httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        const contentTitle = JSON.parse(this.responseText);

        // Retrieve items from cookies
        let cart = {};
        const cookieString = document.cookie;
        const counter = cookieString.indexOf(',counter=') >= 0 ? Number(cookieString.split(',')[1].split('=')[1]) : 0;
        document.getElementById("totalItem").innerHTML = `Total Items: ${counter}`;

        if (cookieString.indexOf('orderId=') >= 0) {
            cart = JSON.parse(cookieString.split(',')[0].split('=')[1]);
        }

        // Populate the cart with the counted items
        for (const id in cart) {
            const product = contentTitle.find(p => p.id == id);
            if (product) {
                dynamicCartSection(product, cart[id]);
                totalAmount += product.price * cart[id];
            }
        }

        amountUpdate(totalAmount);
        cartContainer.appendChild(totalContainerDiv);
    } else if (this.readyState === 4) {
        console.log('Failed to load product data.');
    }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
httpRequest.send();
