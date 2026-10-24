My Bookshop

My Bookshop is an interactive e-commerce website developed using HTML, CSS and JavaScript. It features a book catalogue, a dynamic shopping basket with automatic price calculations, and a checkout process integrated with an external payment API. The website also incorporates form validation, error handling and session storage to provide a seamless user experience across multiple pages.

Features

* Book Catalogue — Displays books with images, titles and prices.
* Shopping Basket — Allows users to select multiple books and automatically calculates the total price.
* Order Summary — Displays selected books and their prices on the payment page.
* Payment Validation — Validates Mastercard numbers, CVV codes and expiry dates before submission.
* API Integration — Uses JavaScript Fetch API to send HTTP POST requests containing JSON data to a university-provided test payment endpoint.
* Session Storage — Uses sessionStorage to preserve basket information between pages.
* Responsive Design — Includes styling and mobile navigation for different screen sizes.
* Error Handling — Displays feedback when payment validation fails or an API request is unsuccessful.

Technologies Used

* HTML5
* CSS3
* JavaScript
* Fetch API
* JSON
* Session Storage
* HTTP POST

Project Structure

The project is organised into the following files and folders.

* css/ — Contains style.css, which manages the website’s layout, styling and responsive design.
* image/ — Stores book covers, payment logos and other visual assets.
* js/ — Contains script.js, which handles the shopping basket, form validation, session storage and payment API integration.
* index.html — Main homepage displaying the book catalogue and shopping basket.
* pay.html — Checkout page containing the order summary and payment form.
* success.html — Confirmation page displayed after a successful payment response.
* README.md — Project documentation, including features, technologies and setup instructions.

How to Run

1. Download or clone the repository.
2. Open the project folder.
3. Open index.html in a web browser.
4. Select books to add to the shopping basket.
5. Click the payment button to view the order summary.

Note: The payment functionality was developed for educational purposes using a university-provided API. It is not intended for real financial transactions. Do not enter real payment card information.

Testing

Manual testing was carried out during development to check the functionality of the website, including:

* Selecting and removing books from the shopping basket.
* Calculating the total price.
* Transferring basket information between pages.
* Validating payment form inputs.
* Handling payment API responses.
* Checking page navigation and responsive layouts.

What I Learned

Developing this project helped me strengthen my understanding of JavaScript programming, DOM manipulation, event handling and client-side validation.

I also gained practical experience working with JSON, browser storage and asynchronous API requests using the Fetch API.

This project helped me understand how different components of a web application work together to provide an interactive user experience.
