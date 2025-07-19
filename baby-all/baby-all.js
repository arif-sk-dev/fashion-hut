document.getElementById("menu-toggle").addEventListener('click', () => {
  const navList = document.getElementById("navList");
  const menuIcon = document.getElementById("menu-icon");

  navList.classList.toggle('active');
  const isOpen = navList.classList.contains('active');
  menuIcon.textContent = isOpen ? '✖' : '☰';
});

// Close menu on link click (for smooth scroll behavior)
document.querySelectorAll('.navList a').forEach(link => {
  link.addEventListener('click', () => {
    const navList = document.getElementById("navList");
    const menuIcon = document.getElementById("menu-icon");

    navList.classList.remove('active');
    menuIcon.textContent = '☰';
  });
});

    //Dropdown 1=======================::
document.querySelectorAll('.dropdown__button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default if button is within a form
    const dropdown = button.closest('.dropdown__item');
    dropdown.classList.toggle('open');

    // Optional: Close other dropdowns
    document.querySelectorAll('.dropdown__item').forEach(el => {
      if (el !== dropdown) el.classList.remove('open');
    });
  });
});

// Optional: Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown__item')) {
    document.querySelectorAll('.dropdown__item').forEach(drop => drop.classList.remove('open'));
  }
});

    // Disable scrolling when the dropdown is active.
    // Re-enable scrolling when the dropdown is closed.
    document.querySelector(".dropdown-menu").addEventListener("mouseenter", () => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
});

document.querySelector(".dropdown-menu").addEventListener("mouseleave", () => {
    document.body.style.overflow = "auto"; // Restore scrolling
});
// Dropdown end here 

// Search page start here 
function toggleSearch(open = true) {
  const searchPage = document.getElementById("searchPage");
  searchPage.style.height = open ? "100%" : "0%";
}

// Usage
function openSearch() {
  toggleSearch(true);
}

function closeSearch() {
  toggleSearch(false);
}
// Search page end here 

// Login page start here 
function userLoginReg() {
  const loginUser = document.getElementById("loginUser");
  loginUser.style.height = "100%"; // Open page
}

function closeUserLoginReg() {
  const loginUser = document.getElementById("loginUser");
  loginUser.style.height = "0"; // Close page
}
// Login page end here 

// Cart section start here =========
document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.getElementById("close-cart");
    const overlay = document.querySelector("#overlay");

    const addCart = document.querySelectorAll(".add-cart");
    const cartCount = document.getElementById("cart-count");

    let productCount = 0;
    const addedProducts = new Set(); //Track unique Product IDs

    cartIcon.addEventListener("click", (event) => {
      event.stopPropagation(); //Prevent Propagation in cartIcon
      cart.classList.add("active");
      overlay.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cart.classList.remove("active");
        overlay.classList.remove("active");
    });

    overlay.addEventListener('click', () => {
      cart.classList.remove("active");
      overlay.classList.remove("active");
    });

    // Close cart when clicking outside of it
    document.addEventListener('click', (event) => {
      if(!cart.contains(event.target)&& event.target !== cartIcon) {  // !== means ! = = 
        cart.classList.remove("active");
      }
    });

    // Prevent clicks inside the cart from closing it
    cart.addEventListener('click', (event) => {
      event.stopPropagation();
    });

      // add unique product to cart 
    addCart.forEach((button, index) => {
      button.addEventListener("click", () => {
        const productCard = button.closest(".pro");
            // Add fallback if product-id attribute isn't present
        let productId = productCard.getAttribute("product-id");
          if (!productId) {
            productId = `fallback-id-${index}`; // Unique fallback ID
          }

          if (!addedProducts.has(productId)) {
            addedProducts.add(productId);
            productCount++;
            cartCount.textContent = productCount;
          }
      });
    });
});  //end -----


// cart working
  if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  // Making function 
  function ready() {

    // Remove items from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    // console.log("removeCartButtons");
    // console.log("remove Cart");
    
    for (var i=0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    //quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for (var i=0; i<quantityInputs.length; i++) {
      var input = quantityInputs[i];
      input.addEventListener("change", quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i=0; i  < addCart.length; i++) {
      var button = addCart[i];
      button.addEventListener("click", addCartClicked);
    }
    //Buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener('click', buyButtonClicked);
  }
  //Buy button function
function buyButtonClicked() {
  alert("Your order is placed.");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

  // Remove items from cart 
  function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();   //to update total amount 
  }

// Quantity changes
function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value<=0) {
    input.value = 1;
  }
  updatetotal(); //to update total amount 
}
// Add to cart by click
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.closest('.pro'); // Adjusted to target the main card con
  // var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("productImg")[0].src;
  // console.log(title, price, productImg); //to check by console
  addProductToCart(title, price, productImg);

  updatetotal();
}

function addProductToCart(title, price, productImg) {
  var cartItems = document.querySelector(".cart-content");
  var cartItemsNames = cartItems.querySelectorAll(".cart-product-title");

  // Normalize and compare product titles to prevent duplicate adds
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].textContent.trim().toLowerCase() === title.trim().toLowerCase()) {
      alert("You have already added this item to cart.");
      return;
    }
  }

  // Create new cart box
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" min="1" class="cart-quantity">
    </div>
    <i class="ri-delete-bin-6-fill cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.appendChild(cartShopBox);

  // Add event listeners for remove and quantity change
  cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
  cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
}

// Update/Calculate total 
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0]
  var cartBoxes = cartContent.getElementsByClassName("cart-box")
  var total =0;
  for (var i=0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i]
    var priceElement =cartBox.getElementsByClassName("cart-price")[0]
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
    var price = parseFloat(priceElement.innerText.replace("$",""));
    var quantity = quantityElement.value
    total = total + (price * quantity);
  }
    //if price contains some cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
// Cart section end here ============


