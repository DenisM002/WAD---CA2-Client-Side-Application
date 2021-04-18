// Functions which generate page content, event handlers, what to load etc.

// Import all exports from postData
import * as orderData from '../dataAccess/orderData.js';
import { OrderDetails } from '../models/orderDetails.js';
// import * as validator from 'validator';

// Create post cards
// Display in web page
let displayOrders = ((orders) => {
  // Use the Array map method to iterate through the array of products (in json format)
  const orderCards = orders.map(orderCard => {
    orderCard = `<div class="col-4">
                  <div class="card mt-3">
                    <div class="card-body">
                      <div class="card-title">
                        <h4 class="mt-2"> Order Number: ${orderCard._id}</h4>
                        <p class="card-text mt-4"> 
                          Name: ${orderCard.orderDetails_name}<br>
                          Mobile: ${orderCard.orderDetails_mobile}<br>
                          Email: ${orderCard.orderDetails_email}<br>
                          Burger: ${orderCard.orderDetails_burger}<br>


                          Extra info: ${orderCard.orderDetails_info}
                        </p>
                      </div>
                    </div>
                    <div class="card-footer text-center"> 
                      <button id="${orderCard._id}" class="btn btn-m btn-outline-warning btn-update-product"
                      data-bs-toggle="modal" data-bs-target="#ProductFormDialog">
                      <span class="bi bi-pencil-square" 
                      data-toggle="tooltip" title="Edit order">
                      </span>Edit order</button>
                      <button id="${orderCard._id}" class="btn btn-m btn-outline-danger btn-delete-product">
                      <span class="bi bi-trash" data-toggle="tooltip" 
                      title="Delete Product"></span>Delete order</button>
                    </div>
                    
                  </div>
                </div>  `;

    return orderCard;
  });
  // Set the innerHTML of the postCards root element = orderCards
  // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
  document.getElementById('orderCards').innerHTML = orderCards.join('');

 
});


// Creates OrderDetails object from Modal form inputs
let getOrderFormData = () => {
  // VALIDATE THESE!!!!!
  return new OrderDetails(
    document.getElementById("_id").value,
    document.getElementById("order_name").value,
    document.getElementById("order_mobile").value,
    document.getElementById("order_email").value,
    document.getElementById("order_burger").value,
    document.getElementById("order_kebab").value,
    document.getElementById("order_chip").value,
    document.getElementById("order_drink").value,
    document.getElementById("order_info").value,

  );
};

let loadForm = async () => {

  try {
    // Create eventHandler for contact form:
   // Add event listener to button - 'addOrder' and call functions 
   const saveOrderButton = document.getElementById('saveOrderButton');
   saveOrderButton.addEventListener("click", addOrder);
  }
  // catch and log any errors
  catch (err) {
    console.log(err);
  }
}

// Load and display orders on home page
let loadOrders = async () => {
  
  try {
    const orders = await orderData.getOrders();
    //pass json data for display
    displayOrders(orders);

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }

  
};


// Create OrderDetails object
let addOrder = async () => {
  const newOrder = getOrderFormData();
  document.getElementById('contactForm').reset()
  document.getElementById("_id").value = 0;
  // log to console
  console.log(newOrder);

  orderData.createOrUpdateOrder(newOrder);

// End function
console.log(newOrder);
};





// When this script is loaded, get things started by calling loadOrders() if in Owner Access!
if (window.location.href == 'http://localhost:3000/ownerPage.html') {
  loadOrders();
}
else {
  loadForm();
};