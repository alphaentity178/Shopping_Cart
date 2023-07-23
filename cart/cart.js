let lable = document.getElementById("lable");
let shoppingCart = document.getElementById("shopping-cart");

let basket =JSON.parse(localStorage.getItem("data")) || [];

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0);
}
calculation();

let generateCartItmes = () =>{
    if(basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemData.find((y)=>y.id === id) || [];
            let {img, name, price} = search;
            return `
            <div class = "cart-item">
            <img width = "100" src = ${img}  alt = "" />
            <div class = "details">
             <div class = "taitle-price-x">
                <h4 class = "taitle-price">
                   <p>${name}</p>
                   <p class = "cart-item-price">$ ${price}</p> 
                </h4>
                <i onclick = "removeItem('${id}')" class="bi bi-x-lg"></i>
             </div>

             <div class="buttons">
                <i onclick = "decrement('${id}')" class="bi bi-dash-lg"></i>
                <div id = ${id} class="quantity">${item}</div>
                <i onclick = "increment ('${id}')" class="bi bi-plus-lg"></i>
            </div>

             <h3>$ ${item * search.price}</h3>
            </div>
            </div>
            `
        }).join("")
    }else{
    shoppingCart.innerHTML = ``;
    lable.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href = "index.html">
    <button class = "HomeBtn">Back to home</button>
    </a>
    `;
    }
}

generateCartItmes();

let increment = (id) =>{
    let search = basket.find((x)=> x.id === id)
    if(search === undefined){
        basket.push({
            id : id,
            item : 1
        })
    }else{
        search.item += 1;  
    }
    generateCartItmes();
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) =>{
    let search = basket.find((x)=> x.id === id)
    if(search === undefined) return;
    else  if(search.item === 0)return;
    else{
        search.item -= 1;
    }
    update(id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItmes();
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id)=>{
    let search = basket.find((x)=> x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id) =>{
    basket = basket.filter((x) => x.id !== id)
    generateCartItmes();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
}

let clearCart = () =>{
    basket = [];
    generateCartItmes();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
}

let totalAmount = () =>{
    if(basket.length !== 0){
        let amount = basket.map((x) =>{
            let {item, id} = x;
            let search = shopItemData.find((y)=>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x+y,0);
        lable.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class = "checkOut">Check Out</button>
        <button onclick = "clearCart()" class = "removeAll">Clear Cart</button>
        `
    }else return;
}
totalAmount();