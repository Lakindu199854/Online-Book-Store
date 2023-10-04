Online Bookstore Application
The Online Bookstore Application is a web-based platform that allows users to purchase books online. It consists of both frontend and backend components, providing a seamless user experience for book enthusiasts and readers. This README provides an overview of the project and its key features.

Table of Contents
Introduction
Features
Installation
Usage
Database
API Endpoints
Error Handling
Contributing
License
Introduction
This project is a fully functional online bookstore application that simplifies the process of buying books online. It offers an extensive range of features for both readers and administrators, making it an ideal choice for book enthusiasts and sellers.

Features
Frontend Features
Homepage and Book Listing

Display a captivating homepage showcasing a curated list of featured books from diverse categories.
Each book listing includes essential details like title, author, cover image, price, category, and subcategory.
Book Categories

Implement a user-friendly navigation menu featuring various book categories.
Enable users to filter books by category, making it easy to find their preferred genres.
Book Details

Provide a detailed book information page where users can explore comprehensive details about a chosen book.
Display essential book information such as title, author, cover image, price, description, category, and subcategory.
Include a convenient "Add to Cart" button for users to add books to their shopping cart effortlessly.
Shopping Cart

Create a dedicated shopping cart page that allows users to review and manage their selected books.
Present cart contents, including book titles, quantities, total prices per item, category, and subcategory.
Calculate and display the total cost of items in the cart, simplifying the checkout process.
Checkout

Implement a streamlined checkout page where users can review their orders and proceed with the purchase.
Include a user-friendly form for entering shipping details.
Enable users to submit their orders, triggering a backend request for order processing.
Backend Features
Book Management

Develop robust API endpoints to facilitate Create, Read, Update, and Delete (CRUD) operations for books.
Define comprehensive book attributes, including title, author, price, description, category, and subcategory.
Book Categories and Subcategories

Create efficient API endpoints for managing book categories and subcategories.
Allow the addition of category and subcategory names with optional descriptions for better organization.
Shopping Cart and Orders

Implement APIs to manage user shopping carts, ensuring proper handling of category and subcategory details.
Enable users to add books to their carts, view cart contents, and seamlessly place orders.
Order Processing

Create a dedicated API endpoint for processing orders.
Upon receiving an order, perform calculations to determine the total price and update book quantities accordingly.
Database

Utilize a reliable relational database system, such as MySQL or PostgreSQL, to store essential data including books, users, categories, and subcategories.
Establish logical relationships between books and their associated categories and subcategories.
Error Handling

Implement robust error handling mechanisms within the application, providing appropriate HTTP status codes for various error scenarios.
Installation
Frontend
Install dependencies using npm install (or use yarn if preferred).
Start the frontend server with npm start.
Backend
Set up and configure your chosen database.
Launch the backend server using mvn spring-boot:run.
Usage
Follow these steps to get started with the Online Bookstore Application:

Step 1: Registration

Begin by registering as a new user. Provide a username, password, and email. If you're already registered, skip this step and proceed to sign in.
Step 2: Sign In

Sign in using your registered username and password, then click the "Sign In" button. This will take you to the homepage.
Step 3: Add Books to Cart

Browse the homepage and select a book to add to your cart. Clicking the "Add to Cart" button will take you to the cart page. Initially, it may show a message saying, "Looks like your cart is empty." To return to shopping, click the "Back to Shopping" button.
Step 4: Explore Book Details

On the homepage, you'll find a collection of books with cover images, titles, authors, prices, categories, and subcategories. Click on any book to view its detailed information, including title, author, price, and description. You'll also find an "Add to Cart" button.
Step 5: Add to Cart

Click the "Add to Cart" button, and a confirmation popup will appear, indicating that the book has been successfully added to your cart. Check your cart, where you will see the added book. You can adjust the quantity using the provided buttons and continue adding more books to your cart.
Step 6: Checkout

After adding all desired books to your cart, proceed to the checkout page.
The checkout page allows you to review your selected books, displaying their names, quantities, and prices. On the right side, an order summary presents the total cost. Below that, you can complete the order form with your shipping details.
Step 7: Place Your Order

After filling out the order form, finalize your order. A success message will confirm your order's successful placement, expressing gratitude for shopping with the Online Bookstore Application.https://drive.google.com/drive/folders/1W4-dYYzk7m3sZr6duz4DqRen5h6_dnQp?usp=sharing