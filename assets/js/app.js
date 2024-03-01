
// globals
const productSection = document.getElementById('app');
const navElement = document.getElementById('navigation');
const basketIcon = document.getElementById('basketIcon')



let myProducts = null



// page load
InitApp()



/* Model code------------------------------------------------------------- */

function GetProductData() {

    fetch('https://dummyjson.com/products?limit=100')

        .then((result) => {
            //console.log(result);
            return result.json()
        }
        )

        .then((json) => {
            //console.log(json);
            ProductsRecived(json)
        });
}


function GetProductsByCategory(myCategoryURL) {

    fetch(myCategoryURL)

        .then((result) => {
            //console.log(result);
            return result.json()
        }
        )

        .then((json) => {



            recivedProductsByCategory(json)
        });

}


function GetCategoryData() {

    fetch('https://dummyjson.com/products/categories')

        .then((result) => {
            return result.json()
        }
        )

        .then((json) => {
            //console.log(json);
            CategoryRecived(json)
        });
}



function SaveBasketData(basketData) {
    //create code to save data object to local storage

}


function ReadLocalStorageData() {

    // write code to read data object and return it
    return myBasket
}


/* controller code------------------------------------------------------------- */



function InitApp() {
    InitializeBasket()
    GetProductData()
    GetCategoryData()
}

function recivedProductsByCategory(productsByC) {

    let myProductArray = productsByC.products

    CreateProductView(myProductArray)

}



function CategoryRecived(CategoryData) {
    // hoved kategori arrays
    let myElectronics = []
    let myCosmetics = []
    let myVehicles = []
    let womensFashion = []
    let mensFashion = []
    let myMisc = []

    CategoryData.forEach(category => {

        switch (category) {

            case 'laptops':
            case 'lighting':
            case 'smartphones':

                myElectronics.push(category)
                break;

            case 'fragrances':
            case 'skincare':
                myCosmetics.push(category)

                break;

            case 'automotive':
            case 'motorcycle':
                myVehicles.push(category)

                break;

            case 'tops':
            case 'womens-dresses':
            case 'womens-shoes':
            case 'womens-watches':
            case 'womens-bags':
            case 'womens-jewellery':

                womensFashion.push(category)

                break;

            case 'tops':
            case 'mens-shirts':
            case 'mens-shoes':
            case 'mens-watches':
                mensFashion.push(category)

                break;

            default:

                myMisc.push(category)
                break;
        }

    });

    // add all to misc
    myMisc.push('All')

    // build datastructure to view code
    let myNavigationData = [
        {
            superCategoryname: 'Electronics',
            subCategories: myElectronics
        },
        {
            superCategoryname: 'Cosmetics',
            subCategories: myCosmetics
        },
        {
            superCategoryname: 'Vehicles',
            subCategories: myVehicles
        },
        {
            superCategoryname: 'mens fashion',
            subCategories: mensFashion
        },
        {
            superCategoryname: 'womans fashion',
            subCategories: womensFashion
        },
        {
            superCategoryname: 'misc',
            subCategories: myMisc
        }

    ]



    CreateNavBar(myNavigationData)
}

//----------------------------------------------------------------------
function ProductsRecived(productData) {

    //console.log(productData)

    myProducts = productData.products

    let myFeaturedProducts = [];

    myFeaturedProducts.push(myProducts[8], myProducts[29], myProducts[19])
    //console.log(myFeaturedProducts);

    CreateProductView(myFeaturedProducts)
    // CreateProductView(myProducts)
}

//----------------------------------------------------------------------

function NavCallback(CategoryName) {
    console.log(CategoryName);
    // get data from API  bug API url og send videre
    if (CategoryName == "All") {
        CreateProductView(myProducts)
    }
    else {
        let myCategoryURL = `https://dummyjson.com/products/category/${CategoryName}`

        GetProductsByCategory(myCategoryURL)
    }



}

//----------------------------------------------------------------------

function ProductCallback(myId) {

    //console.log(myId);
    let myClickedProduct = null


    myProducts.forEach(product => {

        if (product.id == myId) {
            myClickedProduct = product
        }
    }
    )

    if (myClickedProduct == null) {
        // ingen produkt
        alert('no product')
    }
    else {
        // produkt
        //console.log(myClickedProduct)
        clearApp();
        buildProduct(myClickedProduct)

    }

}

//----------------------------------------------------------------------

function LogoCallback() {
    GetProductData()
}

//----------------------------------------------------------------------

function InitializeBasket() {
    // write code to start basket


}




//----------------------------------------------------------------------

function AddToBasket(productId) {
    // write code to add to basket you get product id

}

//----------------------------------------------------------------------

function BasketIconCallback() {
    // write code to get products from local storage and send them on to BuildBasket as an array of product objects

}

//----------------------------------------------------------------------

function BasketRemove(id) {
    // write code to remove product id from basket data array


}

//----------------------------------------------------------------------


function paymentCallBack() {
    alert('weee i am getting paid');
}

//----------------------------------------------------------------------

function BasketClear() {
    // write code to clear all data in the basket
}

// helper functions
//----------------------------------------------------------------------
//----------------------------------------------------------------------


function getProduct(id) {
    let myProduct = false
    myProducts.forEach(product => {
        if (id == product.id) {
            myProduct = product
        }
    });

    return myProduct
}


/* view code------------------------------------------------------------- */

function BuildBasket(products) {
    clearApp()

    let myBasketHTML = '<section id="basketWiev">'
    if (products.length > 0) {
        products.forEach(product => {
            // console.log(product);

            let myHTML = `<figure><img src="${product.thumbnail}"><h2>${product.title}</h2><p>PRIS: ${product.price}</p><button onclick="BasketRemove(${product.id})">remove</button></figure>`


            myBasketHTML += myHTML
        })
        myBasketHTML += `<section id="basketTools"><button onclick="paymentCallBack()">Go to payment</button><button onclick="BasketClear()">clear basket</button></section>`
    } else {
        myBasketHTML += `<h1>basket empty go buy stuff</h1><button onclick="GetProductData()">OK</button>`

    }

    myBasketHTML += '</section>'

    productSection.innerHTML = myBasketHTML
}


function UpdateBasketIcon(items) {

    let myUpdateElement = document.getElementById('basketProductText')
    myUpdateElement.innerHTML = items

}

function CreateNavBar(Categorydata) {

    navElement.innerHTML = ''

    Categorydata.forEach(superCatData => {

        // ul from category array

        let mySubCats = '<ul>'
        superCatData.subCategories.forEach(subCatName => {
            let myListElement = `<li><div class="navRollover"onClick="NavCallback('${subCatName}')">${subCatName}</div></li>`
            mySubCats += myListElement
        });
        mySubCats += '</ul>'

        //console.log(mySubCats);
        //console.log(superCat.superCategoryname);
        let myCatHTML = `<div class="navCategories"><h3>${superCatData.superCategoryname}</h3>
        ${mySubCats}
        </div>`
        navElement.innerHTML += myCatHTML
    });



}

//----------------------------------------------------------------------
function CreateProductView(myCards) {
    //console.log(myCards);
    clearApp()

    let myHTML = '<section id="featuredProducts">'

    myCards.forEach(product => {
        // console.log(product);

        myHTML += `<figure><h2>${product.title}</h2><img onclick="ProductCallback(${product.id})" src="${product.thumbnail}"><h3>PRIS: ${product.price} rabat: ${product.discountPercentage}</h3>
         <button onclick="AddToBasket(${product.id})" >add to basket</button>
        </figure>`

    })

    myHTML += '</section>'

    productSection.innerHTML = myHTML
}


//----------------------------------------------------------------------
function buildProduct(product) {

    let myHTML = `<section class="productDetails"><figure><h2>${product.title}</h2>
  
    <img src="${product.images[0]}">
    <img src="${product.images[2]}">
    <img src="${product.images[3]}">
    <h3>PRIS: ${product.price}</h3>
    <p>${product.description}</p>
    <button onclick="AddToBasket(${product.id})" >add to basket</button>
    </figure></section>
    `


    productSection.innerHTML = myHTML
}


//----------------------------------------------------------------------
function clearApp() {
    productSection.innerHTML = ""
}



