document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    // Reset cart on page load
    localStorage.removeItem("cart");

    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Update cart display
    function updateCartDisplay() {
        if (cartItems) {
            cartItems.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {
                const itemRow = document.createElement("div");
                itemRow.className = "row mb-4";

                itemRow.innerHTML = `
                    <div class="col-md-8">
                        <h5>${item.name}</h5>
                        <p>$${item.price}</p>
                    </div>
                    <div class="col-md-4 text-right">
                        <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
                    </div>
                `;

                cartItems.appendChild(itemRow);
                total += item.price;
            });

            totalPrice.textContent = `Total: $${total}`;

            // Add event listeners to remove buttons
            const removeButtons = document.querySelectorAll(".remove-item");
            removeButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    cart.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartDisplay();
                    updateCartCount();
                });
            });
        }
    }

    // Add to cart button event listeners
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));

            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });

    // Initial update
    updateCartCount();
    updateCartDisplay();
});
