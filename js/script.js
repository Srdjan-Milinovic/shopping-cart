const addButton=document.querySelectorAll('.add');

addButton.forEach(button => {
    button.addEventListener('click', function() {
        addCart(this);
    });
});

let allTotal=0;

function addCart (element) {
    let mainEl= element.closest(".single-item");
    let name= mainEl.querySelector('h3').innerText;
    let price= mainEl.querySelector(".price").innerText;
    let quantity= mainEl.querySelector('input').value;
    let errorText = document.querySelector(".error");

    addPrice= Number(price.substr(1));
    let total=addPrice*quantity;

    if (quantity>0) {
 
        cartItem=document.querySelector('.cart-items');
        cartItem.innerHTML+=`<div class="cart-single-item"><h3>${name}</h3>
        <p>$${addPrice}x${quantity}=$<span>${total}</span></p>
        <button onclick="removeValue (this);">delete</button>
        </div>`
        
        if (errorText) {
            errorText.innerHTML = '';
        }
        element.innerText="Dodato";
        element.setAttribute("disabled","true");
    } else {
            errorText.innerHTML=`Unesite kolicinu!`
    }

    allTotal+=total;

    let displayTotal=document.querySelector(".total");
    displayTotal.innerHTML=`Total: $${allTotal}  <button class="buy" onclick="window.open('/kupljeno.html', '_blank')">Kupi</button>`;

    let kupiButton= document.querySelector(".buy");

    if (allTotal===0) {
        kupiButton.setAttribute("disabled","true");
    } else {
        kupiButton.removeAttribute("disabled");
    }

}


function removeValue (element) {
    let mainEl = element.closest(".cart-single-item");
    let name= mainEl.querySelector('h3').innerText;
    let price= mainEl.querySelector('p span').innerText;
    let items= document.querySelectorAll(".single-item");

    priceNum= Number(price);

    allTotal-=priceNum;

    let displayTotal=document.querySelector(".total");
    displayTotal.innerHTML=`Total: $${allTotal} <button class="buy" onclick="window.open('/kupljeno.html', '_blank')">Kupi</button>`;
    
    let kupiButton= document.querySelector(".buy");
    if (allTotal===0) {
        kupiButton.setAttribute("disabled","true");
    } else {
        kupiButton.removeAttribute("disabled");
    }
    
    mainEl.remove();

    items.forEach(function (item) {
        let itemName= item.querySelector('.si-content h3').innerText;

        if (itemName === name) {
            item.querySelector('.actions input').value=0;
            item.querySelector(".actions button").removeAttribute("disabled");
            item.querySelector(".actions button").innerText="Dodaj";
        }
    })

}