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


const progressBar = document.querySelector(".progress-bar");
window.addEventListener("scroll", function(e){
    const scrollY = window.pageYOffset;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const width = (scrollY / height)*100;
    progressBar.style.width = `${width}%`;
});

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