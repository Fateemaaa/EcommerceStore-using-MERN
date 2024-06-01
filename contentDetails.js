console.clear();

// Extract the `id` from the URL query string
const productId = location.search.split('?')[1];
console.log("Product ID:", productId);

// Update the badge counter if there's a cookie for it
if (document.cookie.indexOf(',counter=') >= 0) {
    const counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

// Create the product details dynamically
function dynamicContentDetails(product) {
    const mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';

    // Image Section
    const imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    const imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = product.preview;

    imageSectionDiv.appendChild(imgTag);

    // Product Details Section
    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    const h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode(product.name));

    const h4 = document.createElement('h4');
    h4.appendChild(document.createTextNode(product.brand));

    const detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    const h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.appendChild(document.createTextNode('Rs ' + product.price));

    const h3Description = document.createElement('h3');
    h3Description.appendChild(document.createTextNode('Description'));

    const para = document.createElement('p');
    para.appendChild(document.createTextNode(product.description));

    const productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    const h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.appendChild(document.createTextNode('Product Preview'));
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    // Product Images Preview
    product.photos.forEach((photoUrl) => {
        const imgTagProductPreviewDiv = document.createElement('img');
        imgTagProductPreviewDiv.id = 'previewImg';
        imgTagProductPreviewDiv.src = photoUrl;
        imgTagProductPreviewDiv.onclick = function () {
            imgTag.src = photoUrl;
        };
        productPreviewDiv.appendChild(imgTagProductPreviewDiv);
    });

    // Add to Cart Button
    const buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    const buttonTag = document.createElement('button');
    buttonTag.appendChild(document.createTextNode('Add to Cart'));
    buttonTag.onclick = function () {
        // Retrieve existing cart items or initialize a new cart
        let cart = {};
        let counter = 1;

        // If cart exists, read and update it
        if (document.cookie.indexOf(',counter=') >= 0) {
            cart = JSON.parse(document.cookie.split(',')[0].split('=')[1]);
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }

        // Add or update the product quantity in the cart
        cart[productId] = (cart[productId] || 0) + 1;

        // Update cookies
        document.cookie = `orderId=${JSON.stringify(cart)},counter=${counter}`;
        document.getElementById("badge").innerHTML = counter;
    };
    buttonDiv.appendChild(buttonTag);

    // Append sections to the main container
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3Description);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    document.getElementById('containerProduct').appendChild(mainContainer);
}

// Fetch the product data and render the details
const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        const productDetails = JSON.parse(this.responseText);
        dynamicContentDetails(productDetails);
    } else if (this.readyState === 4) {
        console.log('Failed to fetch product details.');
    }
};
httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId, true);
httpRequest.send();
