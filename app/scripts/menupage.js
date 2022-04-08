$(document).ready(function () {
    $(".header-slide-list").slick({
        prevArrow:
            "<button type='button' class='header-prev slick-prev pull-left'><i class='fal fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:
            "<button type='button' class='header-next slick-next pull-right'><i class='fal fa-angle-right' aria-hidden='true'></i></button>",
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                },
            },
        ],
    });
});

function debounceFn(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this,
        args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const progressBar = document.querySelector(".progress-bar");
const header = document.querySelector(".header");
const headerSlide = document.querySelector(".header-slide");
const headerSlideList= document.querySelector(".header-slide-list");
const headerSlideContent = document.querySelectorAll(".header-slide-content");
const headerFixed = document.querySelector(".header-fixed");


window.addEventListener("scroll", debounceFn(function(e){
    const scrollY = window.pageYOffset;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const width = (scrollY / height)*100;
    progressBar.style.width = `${width}%`;
    const headerHeight = header.offsetHeight;
    if(scrollY >= headerHeight){
        headerFixed && headerFixed.classList.add("is-fixed");
    }else{
        document.body.style.paddingTop = `0px`;
        headerFixed && headerFixed.classList.remove("is-fixed");
    }
},20));

function handleAnimation(e){
    [...headerSlideContent].forEach(item => item.classList.add("animation"));
    setTimeout(()=>{
    [...headerSlideContent].forEach(item => item.classList.remove("animation"));
    },1000)
}

headerSlide.addEventListener("mouseenter", function(e){
    const headerNext = headerSlideList.querySelector(".header-next");
    const headerPrev = headerSlideList.querySelector(".header-prev");
    headerNext.style = "opacity: 1";
    headerPrev.style = "opacity: 1";
    headerNext.addEventListener("click", handleAnimation);
    headerPrev.addEventListener("click", handleAnimation);
});

headerSlide.addEventListener("mouseleave", function(e){
    const headerNext = headerSlideList.querySelector(".header-next");
    const headerPrev = headerSlideList.querySelector(".header-prev");
    headerNext.style = "opacity: 0";
    headerPrev.style = "opacity: 0";
});

const mealSelectedList = document.querySelector(".meal-selected-list");
const bookPlus = document.querySelectorAll(".book-plus");
[...bookPlus].forEach(item => item.addEventListener("click", handleBookPlus));
const menuSliderItem = document.querySelectorAll(".menu-slider-item");
const cartIcon = document.querySelector(".cart-icon");
let iconMinusNoEvent = [];
let iconPlusNoEvent = [];
let priceAll = [];
const mealSelectedTotal = document.querySelector(".meal-selected-total-num") ;
const mealSelectedTotalDiv = document.querySelector(".meal-selected-total-wrapper ")
const mealSelectedPayment = document.querySelector(".meal-selected-payment-wrapper ")

function handleBookPlus(e){
    e.preventDefault();
    const image = e.target.parentNode.previousElementSibling.querySelector("img");
    const priceMeal = e.target.previousElementSibling.querySelector(".menu-slider-number").textContent;
    priceAll.push(parseFloat(priceMeal));
    const nameMeal = e.target.previousElementSibling.querySelector(".menu-slider-name").textContent;
    const srcImage = image.getAttribute("src");
    const imageCard = e.target.parentNode.parentNode;
    const imageCardTop = imageCard.offsetTop;
    const imageCardLeft = imageCard.offsetLeft;
    const imageCardWidth = imageCard.offsetWidth;
    creactMealImage(srcImage);
    const imageMeal = document.body.querySelector(".meal-selected");
    const imageMealWidth = imageMeal.offsetWidth;
    const imageMealHeight = imageMeal.offsetHeight;
    const leftImageMeal = imageCardLeft + imageCardWidth - imageMealWidth/2;
    const topImageMeal = imageCardTop - imageMealHeight/2;
    imageMeal.style = `top: ${topImageMeal}px; left: ${leftImageMeal}px`;
    const scrollY = window.pageYOffset;
    setTimeout(function(){
        imageMeal.style = `top: ${scrollY + document.body.offsetHeight - 30 - imageMealHeight}px; left: ${document.body.offsetWidth - 30 -imageMealWidth}px`;
        mealSelectedList.classList.remove("is-show");
        mealSelectedList.parentNode.style.height = `0px`;
        setTimeout(() =>{
            imageMeal.parentNode.removeChild(imageMeal);
            renderMeal(srcImage,nameMeal,priceMeal);
            // if(mealSelectedList.classList.contains("is-show")){
            //     const imageMealSeclectedAll = mealSelectedList.querySelectorAll("img");
            //     const imageMealSeclectedIndex = [...imageMealSeclectedAll].findIndex(item => item.getAttribute("src") === srcImage);
            //     const imageMealSeclected = [...imageMealSeclectedAll][imageMealSeclectedIndex];
            //     const iconMinusSingle = imageMealSeclected.parentNode.parentNode.parentNode.querySelector(".fa-minus-circle");
            //     const iconPlusSingle = imageMealSeclected.parentNode.parentNode.parentNode.querySelector(".fa-plus-circle");
            //     iconMinusNoEvent.push(iconMinusSingle);
            //     iconPlusNoEvent.push(iconPlusSingle);
            //     iconMinusSingle.classList.add("booked");
            //     mealSelectedList.parentNode.style.height = `${mealSelectedList.scrollHeight}px`;
            //     [...iconPlusNoEvent].map(item => item.addEventListener("click", function(e){
            //         const mealSelectedItem = e.target.parentNode.parentNode;
            //         const mealSelectedNumber = mealSelectedItem.querySelector(".meal-selected-number");
            //         let number = parseInt(mealSelectedNumber.textContent);
            //         number++;
            //         //number= number +1-iconPlusNoEvent.length;
            //         mealSelectedNumber.textContent = number;
            //     }));
            //     iconMinusNoEvent.forEach(item => item.addEventListener("click", function(e){
            //         const mealSelectedItem = e.target.parentNode.parentNode;
            //         const mealSelectedNumber = mealSelectedItem.querySelector(".meal-selected-number");
            //         let number = parseInt(mealSelectedNumber.textContent);
            //         number--;
            //         //number = number -1 + iconMinusNoEvent.length;
            //         if(number < 0){
            //             mealSelectedItem.parentNode.removeChild(mealSelectedItem);
            //             mealSelectedList.parentNode.style.height = `${mealSelectedList.scrollHeight}px`;
            //             if(mealSelectedList.scrollHeight === 40){
            //                 mealSelectedList.classList.remove("is-show");
            //                 mealSelectedList.parentNode.style.height = `0px`;
            //             };
            //         }
            //         mealSelectedNumber.textContent = number;
            //     }));
            // }
        },1000)
    },300);
    mealSelectedTotal.textContent = priceAll.reduce(function(prevValue,currentValue){
        return prevValue + currentValue;
    },0);
}
function creactMealImage(src){
    const template = 
    `
        <img src="${src}" alt="" class="meal-selected">
    `;
    document.body.insertAdjacentHTML( "beforeend",template)
}

cartIcon.addEventListener("click", function(){
    mealSelectedList.classList.toggle("is-show");
    const height = mealSelectedPayment.scrollHeight + mealSelectedList.scrollHeight + mealSelectedTotalDiv.scrollHeight
    mealSelectedList.parentNode.style.height = `${height}px`  ;
    if(!mealSelectedList.classList.contains("is-show")){
        mealSelectedList.parentNode.style.height = `0px`;
        return;
    };
    const iconMinus = mealSelectedList.querySelectorAll(".fa-minus-circle");
    const iconPlus = mealSelectedList.querySelectorAll(".fa-plus-circle");
    [...iconMinus].forEach(item => item.classList.add("is-updating"));
    [...iconPlus].forEach(item => item.classList.add("is-updating"));
    [...iconMinus].forEach(item => item.addEventListener("click", function(e){
        const mealSelectedItem = e.target.parentNode.parentNode;
        const mealSelectedNumber = mealSelectedItem.querySelector(".meal-selected-number");
        let number = parseInt(mealSelectedNumber.textContent);
        number --;
        if(number < 0){
            mealSelectedItem.parentNode.removeChild(mealSelectedItem);
            mealSelectedList.parentNode.style.height = `${height}px`;
            if(mealSelectedList.scrollHeight === 40){
                mealSelectedList.classList.remove("is-show");
                mealSelectedList.parentNode.style.height = `0px`;
            };
        }
        mealSelectedNumber.textContent = number;
    }));
    [...iconPlus].forEach(item => item.addEventListener("click", function(e){
        const mealSelectedItem = e.target.parentNode.parentNode;
        const mealSelectedNumber = mealSelectedItem.querySelector(".meal-selected-number");
        let number = parseInt(mealSelectedNumber.textContent);
        number ++;
        mealSelectedNumber.textContent = number;
    }));
});

function renderMeal(src,name,price){
    const template =
    `
    <div class="meal-selected-item">
        <div class="meal-selected-content">
            <div class = "meal-selected-image">
                <img src="${src}" alt="">
            </div> 
            <div class="meal-selected-info">
                <p class="global-title meal-selected-name">${name}</p>
                <span class="global-title meal-selected-price">${price}</span>
                <span class ="global-title meal-selected-dollar">$</span>
            </div> 
        </div>
        <div class="meal-selected-amount">
            <i class="fas fa-minus-circle"></i>
            <span class="global-text meal-selected-number">1</span> 
            <i class="fas fa-plus-circle"></i>
        </div> 
    </div>
    `;
    mealSelectedList.insertAdjacentHTML("beforeend", template);
}


// const menuPageEdit = document.querySelector(".menu-page-edit");
// const menuPageList = document.querySelector(".menu-page-list");
// menuPageEdit.offsetWidth= mealSelectedList.offsetWidth;
// const meal={
//     imageMeal:"",
//     nameMeal:"",
//     priceMeal:"",
//     selling: false,
// }
// const endpoint = " http://localhost:3000/meal";
// async function addNewDishes(imageMeal, nameMeal, priceMeal, selling){
//     await fetch(`${endpoint}`, {
//         method: 'POST',
//         body: JSON.stringify({
//             imageMeal,
//             nameMeal, 
//             priceMeal, 
//             selling,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
// }
// const formMenuPageAdd = document.querySelector(".menu-page-add");
// formMenuPageAdd.addEventListener("submit", function(e){
//     e.preventDefault();
//     const imageMeal = this.elements["meal-image-add"].value;
//     const nameMeal = this.elements["meal-name-add"].value;
//     const priceMeal = parseFloat(this.elements["meal-price-add"].value);
//     const selling = this.elements["meal-sell-add"].checked;
//     console.log(imageMeal, nameMeal, priceMeal,selling);
//     addNewDishes(imageMeal,nameMeal,priceMeal,selling);
// });

const iconSearch = document.querySelector(".seacrh-icon");
iconSearch.addEventListener("click", createModal);
function createModal(){
    console.log("abc");
    const template = 
    `
        <div class=modal>
            <div class="modal-content">
                <input class="modal-input modal-input" type="text" placeholder="Enter the dishes's name">
                <i class="fas fa-search modal-search"></i>
            </div>
            <i class="fas fa-times modal-close"></i>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend",template);
}
document.body.addEventListener("click",function(e){
    if(e.target.matches(".modal-close")){
        const modal = e.target.parentNode;
        modal.parentNode.removeChild(modal);
    }
    else if(e.target.matches(".modal")){
        e.target.parentNode.removeChild(e.target);
    }
});