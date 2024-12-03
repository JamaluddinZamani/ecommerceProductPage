

let bodyLargeImage = document.getElementById("body-left-l-img");
let smallImages = document.getElementById("body-left-bottom-img-container").children;
smallImages = Array(...smallImages);
let modalContainer = document.getElementById("modal-container");

function handleClick(e){
    modalContainer.style.display = "block";
}

smallImages.forEach(img =>{
    img.addEventListener("click",handleClick);
})


let largImgPath = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg"
]



// modal functionality

let modalLargeImg = document.getElementById("modal-top-img");
let modalSmallImageContainer = document.querySelectorAll(".modal-img-container");
let modalCloser = document.getElementById("closer");
let next = document.getElementById("next-icon");
let previous = document.getElementById("previous-icon");

function handleImageSrc(imgID){
    switch (imgID) {
        case "modal-s-1":
            modalLargeImg.src = largImgPath[0]
            bodyLargeImage.src = largImgPath[0]
            break;
        case "modal-s-2":
            modalLargeImg.src = largImgPath[1]
            bodyLargeImage.src = largImgPath[1]
            break;
        case "modal-s-3":
            modalLargeImg.src = largImgPath[2]
            bodyLargeImage.src = largImgPath[2]
            break;
        case "modal-s-4":
            modalLargeImg.src = largImgPath[3]
            bodyLargeImage.src = largImgPath[3]
            break;
        default:
            console.log("invalid Image ID")
            break;
    }
}

function modalHandleClick(e){
    modalSmallImageContainer.forEach(container=>{
        if(container.firstElementChild.classList.contains("active")){
            container.firstElementChild.classList.remove("active")
        }
    })
    e.target.classList.add("active");
    handleImageSrc(e.target.parentElement.id)
}

modalSmallImageContainer.forEach(container=>{
    container.addEventListener("click",modalHandleClick);
})


function nextPrevious(NP){
    switch(NP){
        case "next":
            let nId = null
            modalSmallImageContainer.forEach(container=>{
                if(container.firstElementChild.classList.contains("active")){
                    container.firstElementChild.classList.remove("active")
                    nId = container.id;            
                }
            })
            let nextId = null
            modalSmallImageContainer.forEach(container=>{
                if(container.id === nId){
                    if(container.nextElementSibling !== null){
                        container.nextElementSibling.firstElementChild.classList.add("active")
                        nextId = container.nextElementSibling.id;
                    }else{
                        container.firstElementChild.classList.add("active");
                        nextId = container.id;
                    }
                }
            })
            if(nextId){
                handleImageSrc(nextId);
            }
            break;
        case "previous":
            let pId = null
            modalSmallImageContainer.forEach(container=>{
                if(container.firstElementChild.classList.contains("active")){
                    container.firstElementChild.classList.remove("active")
                    pId = container.id;            
                }
            })
            let previousId = null
            modalSmallImageContainer.forEach(container=>{
                if(container.id === pId){
                    if(container.previousElementSibling !== null){
                        container.previousElementSibling.firstElementChild.classList.add("active")
                        previousId = container.previousElementSibling.id;
                    }else{
                        container.firstElementChild.classList.add("active");
                        previousId = container.id;
                    }
                }
            })
            if(previousId){
                handleImageSrc(previousId);
            }
            break;
        default:
            console.log("invalid input")
            break;
    }

}

next.addEventListener("click",()=>{
   nextPrevious("next");
})

previous.addEventListener("click",()=>{
    nextPrevious("previous");
})

modalCloser.addEventListener("click",(e)=>{
    let src = null
    modalSmallImageContainer.forEach(container=>{
        if(container.firstElementChild.classList.contains("active")){
            src = container.firstElementChild.src;
        }
    })
    smallImages.forEach(img=>{
        if(img.src !== src){
            img.classList.remove("active");
        }else{
            img.classList.add("active");
        }
    })
    modalContainer.style.display = "none";
})




// cart , add to cart button , plus icon and minus icon   event handler  /////////////////////////

let plusIcon = document.getElementById("plus-icon");
let minusIcon = document.getElementById("minus-icon");

let addTocartButton = document.getElementById("body-right-bottom-button");


plusIcon.addEventListener("click", ()=>{
    let productCount = document.getElementById("product-number");
    let x = parseInt(productCount.innerText);
    productCount.innerText = (x + 1);
});
minusIcon.addEventListener("click", ()=>{
    let productCount = document.getElementById("product-number");
    if(productCount.innerText > 0){
        productCount.innerText -= 1;
    }
});

addTocartButton.addEventListener("click" , ()=>{
    let productCount = document.getElementById("product-number");
    if(productCount.innerText > 0){

        // set the top of cart product count and show 
        let cartProductCount = document.getElementById("cart-product-count");
        cartProductCount.innerText = productCount.innerText
        cartProductCount.style.display = "inline";
    }  
});

function cartDetailShow(show){
    let infocart = document.getElementById("information-cart");
    if(show){
        infocart.style.display = "block";
        let cartProductCount = document.getElementById("cart-product-count");
        
        if(cartProductCount.innerText > 0){    
            // remove the empty text
            document.getElementById("cart-body-empty-text").style.display = "none";
        
            // show the cart detail
            document.getElementById("cart-body-detail-countainer").style.display = "flex";

            // set the detal cart product count and last price
            let cartDetailProductCount = document.getElementById("cart-detail-product-count");
            let cartLastPrice = document.getElementById("cart-detail-lastPrice");
            let price = document.getElementById("calcuteable-price");
            cartDetailProductCount.innerText = cartProductCount.innerText;
            let calcprice = parseFloat(cartProductCount.innerText) * parseFloat(price.innerText);
            cartLastPrice.innerText = `$${calcprice}`;

            // show the valid image
            let currentBodyImage = document.getElementById("body-left-l-img");
            let cartImg = document.getElementById("cart-detail-product-image");
            cartImg.src = currentBodyImage.src;

            // show checkout button
            document.getElementById("cart-button").style.display = "block";

        }else{
            document.getElementById("cart-body-empty-text").style.display = "flex";
            
            document.getElementById("cart-body-detail-countainer").style.display = "none";

            document.getElementById("cart-button").style.display = "none";
        }
    }else{
        infocart.style.display = "none";
    }
    
}

let cartIcon = document.getElementById("header-cart-icon");
cartIcon.addEventListener("click", ()=>{
    let infocart = document.getElementById("information-cart");
    if(infocart.style.display === "none"){
        cartDetailShow(true);
    }else{
        cartDetailShow(false);
    }
});




// cart event handler    ///////////////////////////////////////////////////////////

let deleteIcon = document.getElementById("cart-detail-delete-icon");
let cartCheckOutButton = document.getElementById("cart-button");

cartCheckOutButton.addEventListener("click" , ()=>{
    cartDetailShow(false);
});
deleteIcon.addEventListener("click" , ()=>{
    let cartDetailProductCount = document.getElementById("cart-detail-product-count");
    let cartLastPrice = document.getElementById("cart-detail-lastPrice");
    cartDetailProductCount.innerText = "0";
    cartLastPrice.innerText = "0";

    let cartProductCount = document.getElementById("cart-product-count");
    cartProductCount.innerText = "";
    cartProductCount.style.display = "none";

    document.getElementById("cart-body-empty-text").style.display = "flex";
    document.getElementById("cart-body-detail-countainer").style.display = "none";
    document.getElementById("cart-button").style.display = "none";
});





// on mobile menu handler
let mobilMenuIcon = document.getElementById("menu-icon");
mobilMenuIcon.addEventListener("click",(e)=>{
    document.getElementById("mobile-menu").style.display = "flex";
})

let mobileMenuCloser = document.getElementById("mobile-menu-closer");
mobileMenuCloser.addEventListener("click",()=>{
    document.getElementById("mobile-menu").style.display = "none";
})


let previousOnMobile = document.getElementById("previous-icon-onMobile");
previousOnMobile.addEventListener("click",(e)=>{
    let image = document.getElementById("body-left-l-img");
    let pathIndex = null;
    largImgPath.forEach((path,index)=>{
        if(image.src.search(path) !== -1){
            pathIndex = index;
        }
    })
    if(pathIndex !== null && pathIndex > 0){
        image.src = largImgPath[pathIndex - 1];
    }
})


let nextOnMobile = document.getElementById("next-icon-onMobile");
nextOnMobile.addEventListener("click",(e)=>{
    let image = document.getElementById("body-left-l-img");
    let pathIndex = null;
    largImgPath.forEach((path,index)=>{
        if(image.src.search(path) !== -1){
            pathIndex = index;
        }
    })
    if(pathIndex !== null && pathIndex < 3){
        image.src = largImgPath[pathIndex + 1];
    }
})
