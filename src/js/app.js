// catch add to cart
const addToCartOpen = document.getElementById("addToCartOpen");
const addToCartClose = document.getElementById("addToCartClose");
const addToCartSideBar = document.getElementById("addToCartSideBar");

// add to cart elements
const ATCSideBarContent = document.getElementById("ATCSideBarContent");
const ATCItemsShowNumber =
  document.getElementsByClassName("ATCItemsShowNumber");
const showTotalPrice = document.getElementById("showTotalPrice");

// show products
const productCounter = document.getElementById("productCounter");
const productCart = document.getElementById("product-cart");

// add to cart sidebar
addToCartOpen.addEventListener("click", () => addToCartDower("open"));
addToCartClose.addEventListener("click", () => addToCartDower("close"));

// InitialState
let addToCart = [];

// ================= Functionality Start  ==================

// add to cart function
function addToCartDower(state) {
  if (state === "open") {
    addToCartSideBar.classList.add("addToCartOpen");
    addToCartSideBar.classList.remove("addToCartClose");
  } else {
    addToCartSideBar.classList.remove("addToCartOpen");
    addToCartSideBar.classList.add("addToCartClose");
  }
}

// show main products
function productShow(products) {
  if (products?.length) {
    productCounter.innerHTML = "";
    for (const product of products) {
      const productMarkUp = `
        <div class="product-cart">
          <figure>
            <img
              src="${product?.image}"
              alt=""
            />
          </figure>
          <div>
            <div>
              <h1 class="text-lg font-medium leading-none">${
                product?.title
              }</h1>
              <p>${product?.price}$/each</p>
            </div>

            <p>
              Chicken Fajitas served with rice and beans tortillas, guacamole,
              salsa & sour cream chicken Fajitas served
            </p>

            <div class="flex flex-col gap-3">
              <button  onclick="addToCartHandle(${product?.id})" class="${
        addToCart?.some((item) => item?.id === product?.id)
          ? "btn-disable"
          : "btn-primary"
      }">Add to Cart</button>
              <button class="btn-secondary">Add to Order</button>
            </div>
          </div>
          
          ${
            product?.itemComing
              ? `<span class="inline-block px-3 py-0 text-white bg-primary rounded-2xl absolute -top-1 -left-3 transform -rotate-45 uppercase text-sm">
                ${product?.itemComing}
              </span>`
              : "<span class='hidden'></span"
          }
      </div>`;

      productCounter.innerHTML += productMarkUp;
    }
  } else {
    productCounter.innerHTML = `<p class="text-secondary mt-10 px-3">
      No Product Here...
    </p>`;
  }
}

// add to Cart
function addToCartHandle(id) {
  const product = productsObject.find((item) => item?.id === id);
  if (product && id) {
    addToCart.push({
      id,
      image: product?.image,
      title: product?.title,
      price: product?.price,
      Piece: 1,
    });
  }
  reCallFc();
}

// show add to cart products
function showSidebarContent(products) {
  if (products?.length) {
    ATCSideBarContent.innerHTML = "";
    for (const product of products) {
      const productMarkUp = `
      <div class="p-2 relative border border-secondary rounded-md">
        <div class="flex gap-3 h-full">
              <figure class="w-[35%] h-full">
                <img
                  class="w-full h-full object-cover"
                  src="${product?.image}"
                  alt=""
                />
              </figure>

              <div class="w-[65%] space-y-1 text-white">
                <div class="">
                  <h2>${product?.title}</h2>
                  <p><span>${product?.price}</span>$/each</p>
                </div>

                <div class="flex items-center">
                  <button
                  onclick="ATCChange(${product?.id}, -1)"
                    class="py-1 rounded-md px-2.5 flex items-center justify-center bg-secondary text-black text-lg"
                  >
                    <span> - </span>
                  </button>

                  <span class="px-3 !py-0 bg-white inline-block text-black"
                    > ${product?.Piece} </span
                  >

                  <button
                  
                  onclick="ATCChange(${product?.id},1)"
                    class="py-1 rounded-md px-2.5 flex items-center justify-center bg-secondary text-black text-lg"
                  >
                    <span>+</span>
                  </button>
                </div>
              </div>

              <!-- Delete Button -->
              <button
              onclick="addToCartDelete(${product?.id})"
                class="w-5 h-5 rounded-md flex items-center justify-center bg-white text-primary absolute -top-1 -right-1"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    ></path>
                  </svg>
                </span>
              </button>
              <strong class="absolute bottom-1 right-1 text-white">
                <span>${product?.Piece * product?.price}</span>$
              </strong>
            </div>
            </div>
            `;

      ATCSideBarContent.innerHTML += productMarkUp;
    }
  } else {
    ATCSideBarContent.innerHTML = `<p class="text-secondary mt-10 px-3">
      You have not selected any products yet
    </p>`;
  }
}

// delete add to cart
const addToCartDelete = (id) => {
  const addToCartRemove = addToCart.filter((item) => item?.id !== id);
  addToCart = addToCartRemove;
  reCallFc();
};

//  cart item increment or decrement
function ATCChange(id, value) {
  const updateData = addToCart.map((item) =>
    item?.id === id
      ? item?.Piece === 1 && value < 0
        ? item
        : { ...item, Piece: item?.Piece + value }
      : item
  );
  addToCart = updateData;
  reCallFc();
}

// re-call function
function reCallFc() {
  // show product function call
  productShow(productsObject);
  showSidebarContent(addToCart);

  // show add item
  for (const idx in ATCItemsShowNumber) {
    ATCItemsShowNumber[idx].textContent = addToCart.length;
  }

  // calculate total price
  const totalPrice = addToCart.reduce(
    (prev, item) => item?.Piece * item?.price + prev,
    0
  );
  showTotalPrice.innerText = totalPrice;
}

reCallFc();
