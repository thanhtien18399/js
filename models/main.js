var Productapi = new ProducutApi();
var cartDetails = [];
async function start(text) {
  let type = text;
  // console.log(type);
  if (type === undefined) {
    type = "all";
  }
  let data = await Productapi.fetchUser(type);
  renderTable(data);
}

function getEle(selector) {
  return document.querySelector(selector);
}

function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
    <div class="item">
        <div class="header-container">
        ${product.type === "iphone" ? `<i class="icon-apple fa-brands fa-apple"></i>` : `<i class="fa-solid fa-s"></i>`}
           
            <span class="in-stock">In Stock</span>
        </div>
        <div class="img-container">
            <img src="${product.img}"
                alt="" class="product-img">
        </div>
        <span class="title-name">${product.name}</span>
        <div class="content-container">
            <div class="name-product">
            <p> ${product.name} </p>
            <i class="icon-heart fa-solid fa-heart"></i>
            </div>
       <div class="dec"> 
            <p>${product.desc}</p> 
       </div>
       <div class="purchase">
        <p class="product-price">$ 400</p>
        <span class="btn-add">
      <div>
        <button onclick="addItem(this)" class="add-btn">Add <i class="fas fa-chevron-right"></i></button>
        </div></span>
      </div>
        </div>
     </div>
        `;
  }
  getEle(".box").innerHTML = content;
}
start();

document.getElementById("cart").onclick= ()=>{
  CartIsEmpty();
}

document.getElementById("filter").onchange = () => {
  let content = document.getElementById("filter").value;
  start(content);
  // var contact = "áldjasd";
  // var contact = 15;
};
function RenderCart() {
  var content = "";
    for (var i = 0; i < cartDetails.length; i++) {
      var product = cartDetails[i];
      content += `
      <div class="cart-item">
                    <div class="cart-img">
                      <img
                        src=${product.img}
                        alt="">
                    </div>
                    <strong class="name">${product.name}</strong>
                    <span class="qty-change">
                      <div>
                        <button class="btn-qty" onclick="qtyChange(this,'sub')"><i
                            class="fas fa-chevron-left"></i></button>
                        <p class="qty">${product.qty}</p>
                        <button class="btn-qty" onclick="qtyChange(this,'add')"><i
                            class="fas fa-chevron-right"></i></button>
                      </div>
                    </span>
                    <p class="price">$ ${product.price}</p>
                    <button onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                  </div>
      `
  }
  getEle(".cart-items").innerHTML = content;
  
}

function addItem(e) {

  let t = e.parentElement.parentElement.parentElement.parentElement.parentElement;
  t.getElementsByClassName("btn-add")[0].innerHTML=QtyBtn();
  let n = t.getElementsByClassName("title-name")[0].innerText
    , a = parseFloat(t.getElementsByClassName("product-price")[0].innerText.replace("$ ", ""))
    , s = t.getElementsByClassName("product-img")[0].src;
    let i = {
      name: n,
      price: a,
      img: s,
      qty: 1
    };
    for(let i= 0;i<cartDetails.length;i++){
      if(n===cartDetails[i].name){
        cartDetails[i].qty+=1;
        RenderCart();
        return ;
      }
    }
  // CartItems(i),
  cartDetails.push(i)
  RenderCart()
  // CartItemsTotal()
  
}
function AddBtn() {
    return "\n  <div>\n    <button onclick='addItem(this)' class='add-btn'>Add <i class='fas fa-chevron-right'></i></button>\n  </div>"
}
function QtyBtn(e=1) {
    return 0 === e ? AddBtn() : `\n  <div >\n    <button class='btn-qty' onclick="qtyChange(this,'sub')"><i class='fas fa-chevron-left'></i></button>\n    <p class='qty'>${e}</p>\n    <button class='btn-qty' onclick="qtyChange(this,'add')"><i class='fas fa-chevron-right'></i></button>\n  </div>`
}


function removeItem(e) {
  let t = e.parentElement.getElementsByClassName("name")[0].innerText
    , n = document.getElementsByClassName("product-name");
  cartDetails.forEach((e, a) => {
    if (t == e.name) {
      cartDetails.splice(a, 1);
      for (let e of n)
        if (t == e.innerText) {
          SwitchBtns(e.parentElement.parentElement)
        }
    }
  }
  ),
    RenderCart()
  CartIsEmpty()
  // CartItemsTotal()
}
function CartIsEmpty() {
  if(0 === cartDetails.length){
    getEle(".cart-items").innerHTML = "<span class='empty-cart'>Looks Like You Haven't Added Any Product In The Cart</span>"
  } 
}

