
      document.addEventListener("DOMContentLoaded", function () {
        // Initialize cart and sub-total
        let cart = [];
        let subTotal = 0; // Initialize as a number

        // Function to update the cart and sub-total
        function updateCart() {
          const cartContainer = document.getElementById("cart-container");
          const itemCountElement = document.getElementById("item-count");
          const subtotalElement = document.getElementById("subtotal");

          // Clear previous content
          cartContainer.innerHTML = "";

          // Display each item in the cart
          cart.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                      <div class="flex flex-row justify-between items-top my-3">
                          <div class="flex items-center">
                              <img class="w-10 h-10 rounded-lg" src="${item.image}" alt="${item.name}" />
                              <div class="ms-3">
                                  <p class="text-sm text-gray-600">${item.name}</p>
                                  <p class="text-xs text-gray-600">${item.price} TK</p>
                              </div>
                          </div>
                          <button class="text-red-500 text-2xl" onclick="removeFromCart(${item.id})"><i class='bx bx-x'></i></button>
                      </div>
                  `;
            cartContainer.appendChild(cartItem);
          });

          // Update sub-total and item count
          itemCountElement.textContent = cart.length;
          subtotalElement.textContent = `${subTotal} Tk`;
        }

        // Function to handle adding a course to the cart
        function addToCart(
          courseId,
          courseName,
          coursePrice,
          courseImage,
          buttonId,
          seatsId
        ) {
          // Check if the course is already in the cart
          const isAlreadyInCart = cart.some((item) => item.id === courseId);

          if (isAlreadyInCart) {
            // Disable the button
            const buyButton = document.getElementById(buttonId);
            buyButton.disabled = true;

          } else {
            // Reduce available seats
            const availableSeats = document.getElementById(seatsId);
            const currentSeats = parseInt(availableSeats.textContent);
            availableSeats.textContent = `${currentSeats - 1} seat`;

            cart.push({
              id: courseId,
              name: courseName,
              price: coursePrice,
              image: courseImage,
            });
            subTotal += coursePrice;
            updateCart();

            // Disable the button after adding the course
            const buyButton = document.getElementById(buttonId);
            buyButton.disabled = true;

          }
        }

        // Function to handle removing a course from the cart
        window.removeFromCart = function (courseId) {
          const index = cart.findIndex((item) => item.id === courseId);
          if (index !== -1) {
            subTotal -= cart[index].price;
            cart.splice(index, 1);
            updateCart();
          }
        };

        const buyButtons = document.querySelectorAll(".buy-button");
        buyButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            const courseName =
              document.querySelectorAll(".text-lg")[index].textContent;
            const coursePrice = parseInt(
              document.querySelectorAll(".taka")[index].textContent
            );
            const courseImage = document.querySelectorAll(".images")[index].src;
            const buttonId = `buyButton${index + 1}`;
            const seatsId = `seats${index + 1}`;
            addToCart(
              index,
              courseName,
              coursePrice,
              courseImage,
              buttonId,
              seatsId
            );
          });
        });
      });


      // Function to handle the checkout process
      function checkout() {
        alert("Checkout successful!");

        /// Reload the page after checkout
        location.reload();
      }
    