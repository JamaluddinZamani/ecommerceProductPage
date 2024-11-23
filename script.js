
//	image handler //////////////////////////////////////////////////////////////////

let mainLargImg = document.getElementById("body-left-product-img");
let mainSmallImgContainer = document.querySelectorAll(".bottom-product-img-container");
let mainSmallImgMosk = document.querySelectorAll(".main-img-mosk");
let mainSmallImgSoftMosk = document.querySelectorAll(".main-img-soft-mosk");

let modalLargImg = document.getElementById("modal-top-img");
let modalSmallImgContainer = document.querySelectorAll(".modal-bottom-product-img-container");
let modalSmallImgMosk = document.querySelectorAll(".modal-img-mosk");
let modalSmallImgSoftMosk = document.querySelectorAll(".modal-img-soft-mosk");
let modal = document.getElementById("modal-container");
let modalCloser = document.getElementById("closer");


let largImgPath = {
    p1 : "./images/image-product-1.jpg",
    p2 : "./images/image-product-2.jpg",
    p3 : "./images/image-product-3.jpg",
    p4 : "./images/image-product-4.jpg",
}

// let whichImgActive = [true,false,false,false];

function reset(imgMosk,imgContainer,imgSoftMosk = modalSmallImgSoftMosk){
    imgMosk.forEach(element => {
        element.style.display = "none";
        element.setAttribute("active","false");
    });
    imgContainer.forEach(element=>{
        element.setAttribute("active","false");
    });
    imgSoftMosk.forEach(item=>{
        item.style.display = "none";
    });
}

function imgHandler(largImg,smallImgMosk,smallImgContainer){
    smallImgContainer.forEach(div=>{
        if(div.getAttribute("active") == "true"){
            reset(smallImgMosk,smallImgContainer);
            switch (div.getAttribute("number")) {
                case "0":
                    smallImgMosk[0].style.display = "block";
                    largImg.src = largImgPath.p1;
                    smallImgContainer[0].setAttribute("active","true");
                    break;
                case "1":
                    smallImgMosk[1].style.display = "block";
                    largImg.src = largImgPath.p2;
                    smallImgContainer[1].setAttribute("active","true");
                    break;
                case "2" :
                    smallImgMosk[2].style.display = "block";
                    largImg.src = largImgPath.p3;
                    smallImgContainer[2].setAttribute("active","true");
                    break;
                default:
                    smallImgMosk[3].style.display = "block";
                    largImg.src = largImgPath.p4;
                    smallImgContainer[3].setAttribute("active","true");
                    break;
            }
        }
    });
}

mainSmallImgContainer.forEach((element,index)=>{
    element.addEventListener("mouseenter",()=>{
        if(element.getAttribute("active") == "false"){
            switch (index) {
                case 0:
                    mainSmallImgSoftMosk[0].style.display = "block"
                    break;
                case 1:
                    mainSmallImgSoftMosk[1].style.display = "block"
                    break;
                case 2:
                    mainSmallImgSoftMosk[2].style.display = "block"
                    break;
                default:
                    mainSmallImgSoftMosk[3].style.display = "block"
                    break;
            }
        }
    });
});
mainSmallImgContainer.forEach((element,index)=>{
    element.addEventListener("mouseleave",()=>{
        if(element.getAttribute("active") == "false"){
            switch (index) {
                case 0:
                    mainSmallImgSoftMosk[0].style.display = "none"
                    break;
                case 1:
                    mainSmallImgSoftMosk[1].style.display = "none"
                    break;
                case 2:
                    mainSmallImgSoftMosk[2].style.display = "none"
                    break;
                default:
                    mainSmallImgSoftMosk[3].style.display = "none"
                    break;
            }
        }
    });
});
mainSmallImgContainer.forEach((element,index)=>{
    element.addEventListener("click",()=>{
        if(element.getAttribute("active") == "false"){
            modal.style.display = "block";
            cartDetailShow(false);
        }
    });
});





// cart , add to cart button , plus icon and minus icon   event handler  /////////////////////////

let cartIcon = document.getElementById("header-cart-icon");
let detailCart = document.getElementById("information-cart");

let plusIcon = document.getElementById("plus-icon");
let minusIcon = document.getElementById("minus-icon");

let addToCartButton = document.getElementById("body-right-bottom-button");


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
addToCartButton.addEventListener("click" , ()=>{
    let productCount = document.getElementById("product-number");
    if(productCount.innerText > 0){
        
        // set the top of cart product count and show 
        let cartProductCount = document.getElementById("cart-product-count");
        cartProductCount.innerText = productCount.innerText
        cartProductCount.style.display = "inline";

        // remove the empty text
        let cartEmptyText = document.getElementById("cart-body-empty-text");
        cartEmptyText.style.display = "none";
        
        // show the cart detail
        let cartdetail = document.getElementById("cart-body-detail-countainer");
        cartdetail.style.display = "flex";

        // set the detal cart product count and last price
        let cartDetailProductCount = document.getElementById("cart-detail-product-count");
        let cartLastPrice = document.getElementById("cart-detail-lastPrice");
        let price = document.getElementById("calcuteable-price");
        cartDetailProductCount.innerText = productCount.innerText;
        let calcprice = parseFloat(productCount.innerText) * parseFloat(price.innerText);
        cartLastPrice.innerText = `$${calcprice}`;

        // show the valid image
        let currentBodyImage = document.getElementById("body-left-product-img");
        let cartImg = document.getElementById("cart-detail-product-image");
        cartImg.src = currentBodyImage.src;
        
    
    }else{
        let cartProductCount = document.getElementById("cart-product-count");
        cartProductCount.style.display = "none";

        let cartEmptyText = document.getElementById("cart-body-empty-text");
        cartEmptyText.style.display = "inline";
        
        let cartdetail = document.getElementById("cart-body-detail-countainer");
        cartdetail.style.display = "none";
    }    
});

function cartDetailShow(show){
    if(show){
        detailCart.style.display = "block";
    }else{
        detailCart.style.display = "none";
    }
    
}
cartIcon.addEventListener("click", ()=>{
    cartDetailShow(true);
});




// cart event handler    ///////////////////////////////////////////////////////////

let deleteIcon = document.getElementById("cart-detail-delete-icon");
let cartButton = document.getElementById("cart-button");

cartButton.addEventListener("click" , ()=>{
    cartDetailShow(false);
});
deleteIcon.addEventListener("click" , ()=>{
    let cartDetailProductCount = document.getElementById("cart-detail-product-count");
    let cartLastPrice = document.getElementById("cart-detail-lastPrice");
    cartDetailProductCount.innerText = "0";
    cartLastPrice.innerText = "0";

    let cartProductCount = document.getElementById("cart-product-count");
    cartProductCount.style.display = "none";

    let cartEmptyText = document.getElementById("cart-body-empty-text");
    let cartdetail = document.getElementById("cart-body-detail-countainer");
    cartdetail.style.display = "none";
    cartEmptyText.style.display = "inline";
});


// modal  //////////////////////////////////////////////////////////////////////////

modalSmallImgContainer.forEach((element,index)=>{
    element.addEventListener("mouseenter",()=>{
        if(element.getAttribute("active") == "false"){
            switch (index) {
                case 0:
                    modalSmallImgSoftMosk[0].style.display = "block"
                    break;
                case 1:
                    modalSmallImgSoftMosk[1].style.display = "block"
                    break;
                case 2:
                    modalSmallImgSoftMosk[2].style.display = "block"
                    break;
                default:
                    modalSmallImgSoftMosk[3].style.display = "block"
                    break;
            }
        }
    })
});
modalSmallImgContainer.forEach((element,index)=>{
    element.addEventListener("mouseleave",()=>{
        if(element.getAttribute("active") == "false"){
            switch (index) {
                case 0:
                    modalSmallImgSoftMosk[0].style.display = "none"
                    break;
                case 1:
                    modalSmallImgSoftMosk[1].style.display = "none"
                    break;
                case 2:
                    modalSmallImgSoftMosk[2].style.display = "none"
                    break;
                default:
                    modalSmallImgSoftMosk[3].style.display = "none"
                    break;
            }
        }
    })
});
modalSmallImgContainer.forEach((element,index)=>{
    element.addEventListener("click",()=>{
        if(element.getAttribute("active") == "false"){
            reset(modalSmallImgMosk,modalSmallImgContainer);
            element.setAttribute("active","true");
            imgHandler(modalLargImg,modalSmallImgMosk,modalSmallImgContainer);
        }
    })
});


let next = document.getElementById("next-icon");
let previous = document.getElementById("previous-icon");

next.addEventListener("click",()=>{
    let nused = false;
    modalSmallImgContainer.forEach((element,index)=>{
        if(element.getAttribute("active") == "true" && nused == false && element.getAttribute("number") < 3){
            reset(modalSmallImgMosk,modalSmallImgContainer);
            element.nextElementSibling.setAttribute("active","true");
            imgHandler(modalLargImg,modalSmallImgMosk,modalSmallImgContainer);
            nused = true;
        }
    })
});
previous.addEventListener("click",()=>{
    let pused = false;
    modalSmallImgContainer.forEach((div,index)=>{
        if(div.getAttribute("active") == "true" && pused == false && div.getAttribute("number") > 0){
            reset(modalSmallImgMosk,modalSmallImgContainer);
            div.previousElementSibling.setAttribute("active","true");
            imgHandler(modalLargImg,modalSmallImgMosk,modalSmallImgContainer);
            pused = true;
        }
    })
});



modalCloser.addEventListener("click",()=>{
    modal.style.display = "none";
    modalSmallImgContainer.forEach(item=>{
        if(item.getAttribute("active")== "true"){
            mainSmallImgContainer.forEach(div=>{
                if(div.getAttribute("number") == item.getAttribute("number")){
                    reset(mainSmallImgMosk,mainSmallImgContainer);
                    div.setAttribute("active","true");
                    imgHandler(mainLargImg,mainSmallImgMosk,mainSmallImgContainer);
                }
            })
        }
    })
});






