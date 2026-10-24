// Main JavaScript file for the bookshop website.
// I used this file for the basket, payment checks and sending the card details to the server.

window.addEventListener("DOMContentLoaded", runCode);

function runCode() {

     // Mobile menu for smaller screens
    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");

    if (menuToggle != null && siteNav != null) {
        menuToggle.addEventListener("click", function () {
            siteNav.classList.toggle("show-nav");
        });
    }

    // Getting the homepage elements
    const checkboxes = document.querySelectorAll(".book-checkbox");
    const selectedCount = document.getElementById("selectedCount");
    const totalPrice = document.getElementById("totalPrice");
    const payButton = document.getElementById("goToPayBtn");

    let basket = [];
    let total = 0;

    // This part only runs on the homepage because these elements are not on the other pages
    if (checkboxes.length > 0 && selectedCount != null && totalPrice != null && payButton != null) {

        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener("change", updateBasket);
        }

        payButton.addEventListener("click", goToPayment);
    }

    // Adds or removes a book from the basket when the checkbox changes
    function updateBasket(event) {
        const checkbox = event.target;
        const title = checkbox.dataset.title;
        const price = parseFloat(checkbox.dataset.price);

        if (checkbox.checked == true) {
            basket.push({
                title: title,
                price: price
            });

            total = total + price;
        } else {
            basket = basket.filter(function (book) {
                return book.title != title;
            });

            total = total - price;
        }

        selectedCount.innerHTML = basket.length + " books selected";
        totalPrice.innerHTML = "Total: £" + total.toFixed(2);
    }

    // Saves the basket so it can be used on the payment page
    function goToPayment() {
        if (basket.length == 0) {
            alert("Please select at least one book before proceeding to payment.");
            return;
        }

        sessionStorage.setItem("basket", JSON.stringify(basket));
        sessionStorage.setItem("total", total.toFixed(2));

        window.location.href = "pay.html";
    }


    // Getting the order summary elements from pay.html
    const orderList = document.getElementById("orderList");
    const orderTotal = document.getElementById("orderTotal");

    // If these elements exist, show the selected books on the payment page
    if (orderList != null && orderTotal != null) {
        showOrderSummary();
    }

    function showOrderSummary() {
        const savedBasket = JSON.parse(sessionStorage.getItem("basket")) || [];
        const savedTotal = sessionStorage.getItem("total") || "0.00";

        if (savedBasket.length == 0) {
            orderList.innerHTML = "<li>No books selected yet.</li>";
        } else {
            for (let i = 0; i < savedBasket.length; i++) {
                const listItem = document.createElement("li");
                listItem.innerHTML = savedBasket[i].title + " - £" + savedBasket[i].price.toFixed(2);
                orderList.appendChild(listItem);
            }
        }

        orderTotal.innerHTML = "Total: £" + savedTotal;
    }


    // Getting the payment form elements
    const paymentForm = document.getElementById("paymentForm");
    const message = document.getElementById("paymentMessage");

    // This checks the form when the user clicks Continue
    if (paymentForm != null) {
        paymentForm.addEventListener("submit", checkPaymentForm);
    }

    function checkPaymentForm(event) {
        event.preventDefault();

        const cardNumber = document.getElementById("cardNumber").value.trim();
        const expMonth = parseInt(document.getElementById("expMonth").value);
        const expYear = parseInt(document.getElementById("expYear").value);
        const cvv = document.getElementById("cvv").value.trim();

        let isValid = true;

        // This regex checks the Mastercard rule from the brief
        const mastercardRegex = /^5[1-5][0-9]{14}$/;

        // This regex checks that the security code is 3 or 4 digits
        const cvvRegex = /^[0-9]{3,4}$/;

        if (mastercardRegex.test(cardNumber) == false) {
            message.innerHTML = "Invalid Mastercard number. Must start with 51-55 and contain 16 digits.";
            message.style.color = "red";
            isValid = false;
        }

        if (isValid == true && cvvRegex.test(cvv) == false) {
            message.innerHTML = "Invalid CVV. Must be 3 or 4 digits.";
            message.style.color = "red";
            isValid = false;
        }

        if (isValid == true && checkExpiryDate(expMonth, expYear) == false) {
            message.innerHTML = "Card has expired.";
            message.style.color = "red";
            isValid = false;
        }

        if (isValid == true) {
            sendPayment(cardNumber, expMonth, expYear, cvv);
        }
    }

    // Checks if the expiry date has already passed
    function checkExpiryDate(expMonth, expYear) {
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();

        if (expYear < currentYear) {
            return false;
        }

        if (expYear == currentYear && expMonth < currentMonth) {
            return false;
        }

        return true;
    }

    // Sends the card details to the Mudfoot server using fetch
    function sendPayment(cardNumber, expMonth, expYear, cvv) {

        fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                master_card: Number(cardNumber),
                exp_year: expYear,
                exp_month: expMonth,
                cvv_code: cvv
            })
        })
        .then(function (response) {
            if (response.ok == true) {
                return response.json();
            } else {
                throw new Error("Payment was not accepted by the server.");
            }
        })
        .then(function (data) {
            console.log(data.message);

            sessionStorage.setItem("cardLastFour", cardNumber.slice(-4));
            window.location.href = "success.html";
        })
        .catch(function (error) {
            message.innerHTML = "Error connecting to payment server.";
            message.style.color = "red";
            console.log(error);
        });
    }
}