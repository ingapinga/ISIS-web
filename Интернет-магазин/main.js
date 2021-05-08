let product_list;
Load();
document.querySelector('#sort').addEventListener("change", Sort);
document.querySelector('#filter').addEventListener("change", Filter);

async function Load() {
    let f = await fetch('../product_list.json')
    product_list = await f.json();
    Sort();
}

function Update() {
    let l = document.querySelector('.product_container .products');
    l.innerHTML = '';
    for (i in product_list) {
        let available;
        let available_txt;
        if (product_list[i].product_available == "yes") {
            available = "product_to_cart"
            available_txt = "В корзину"
        }
        else {
            available = "product_not_available";
            available_txt = "Нет в наличии"
        }
        l.innerHTML += `
        <div class="single_product">
                            <div class="img_container">
                                <a href="#" class="product_img"><img src="${product_list[i].product_img}" alt="product_img"></a>
                            </div>
                            <div class="description_container">
                                <div class="main_traits">
                                    <span class="product_price">${product_list[i].product_price} руб.</span>
                                    <a href="#" class="product_name">${product_list[i].product_name}</a>
                                </div>
                                <span class="product_description">${product_list[i].product_description}</span>
                                <div class="${available} button"><a href="#" >${available_txt}</a></div>
                            </div>
                        </div>
        `
    }
}

function Sort() {
    switch (document.querySelector('.product_options #sort').value) {
        case 'low-to-high':
            for (let i = 0; i < product_list.length; i++)
                for (let j = i + 1; j < product_list.length; j++)
                    if (+product_list[i].product_price > +product_list[j].product_price)
                        [product_list[i], product_list[j]] = [product_list[j], product_list[i]];
            break;
        case 'high-to-low':
            for (let i = 0; i < product_list.length; i++)
                for (let j = i + 1; j < product_list.length; j++)
                    if (+product_list[i].product_price < +product_list[j].product_price)
                        [product_list[i], product_list[j]] = [product_list[j], product_list[i]];
            break;

    }
    Update();
}

function Filter() {
    
    /*
    switch (document.querySelector('.product_options #sfilter').value) {
        case "all":
            for (let i = 0; i < product_list.length; i++)
               // if (product_list[i].)
                    break;
        case "available":
            for (let i = 0; i < product_list.length; i++)
                if (product_list[i].product_available == "yes" && product_list[i].indexOf('hidden') == -1)
                    product_list[i].push('hidden');
                else if (product_list[i].product_available != "yes" && product_list[i].indexOf('hidden') != -1)
                    product_list[i].splice('hidden');
            break;
        case "not-available":
            for (let i = 0; i < product_list.length; i++)
                if (product_list[i].product_available == "yes" && product_list[i].indexOf('hidden') == -1)
                    product_list[i].splice('hidden');
                else if (product_list[i].product_available != "yes" && product_list[i].indexOf('hidden') != -1)
                    product_list[i].push('hidden');
            break;


    } */
    Update();
}


(function ($) {
    "use strict";


    new WOW().init();

    $(".cart_link > a").on("click", function () {
        $(".mini_cart").addClass("active");
    });

    $(".mini_cart_close > a").on("click", function () {
        $(".mini_cart").removeClass("active");
    });
})(jQuery);