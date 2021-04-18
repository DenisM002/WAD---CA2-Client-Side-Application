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
                      <button id="${orderCard._id}" class="btn btn-m btn-outline-warning btn-update-order" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <span class="bi bi-pencil-square" 
                      data-toggle="tooltip" title="Edit order">
                      </span>Edit order</button>
                      <button id="${orderCard._id}" class="btn btn-m btn-outline-danger btn-delete-order">
                      <span class="bi bi-trash" data-toggle="tooltip" 
                      title="Delete order"></span>Delete order</button>
                    </div>                  
                    
                  </div>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle">Update Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <form id="orderFormOwner">
                      <div class="form-group">
                          <label for="order_name">Name:</label>
                          <input type="text" name="order_name" id="order_name" class="form-control" placeholder="Enter your name">
                      </div>
                      <div class="form-group">
                          <label for="order_mobile">Mobile number:</label>
                          <input type="text" name="order_mobile" id="order_mobile" class="form-control" placeholder="Enter your mobile number">
                      </div>
                      <div class="form-group">
                          <label for="order_email">Email:</label>
                          <input type="email" name="order_email" id="order_email" class="form-control" placeholder="Enter your email e.g name@examplemail.com">
                      </div>
                      <div class="form-group">
                          <label for="order_burger">Burger:</label>
                          <select class="form-control" id="order_burger">
                            <option value="0" selected>No burger please!</option>
                            <option value="1">Big Mac</option>
                            <option value="2">Meaty Boy 10"</option>
                            <option value="3">Whopper - Extra Fat</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="order_kebab">Kebab:</label>
                          <select class="form-control" id="order_kebab">
                            <option value="0" selected>No kebab please!</option>
                            <option value="1">Kebaby Boi</option>
                            <option value="2">Doner Kebab</option>
                            <option value="3">Suprise 'Bab</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="order_chip">Chip:</label>
                          <select class="form-control" id="order_chip">
                            <option value="0" selected>No chip please!</option>
                            <option value="1">Regular Chip</option>
                            <option value="2">Curry Chip</option>
                            <option value="3">Gravy Chip</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="order_drink">Drink:</label>
                          <select class="form-control" id="order_drink">
                            <option value="0" selected>No drink please!</option>
                            <option value="1">Coke</option>
                            <option value="2">Fanta</option>
                            <option value="3">Bainne</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="order_info">Anything you want to let us know about?</label>
                          <textarea class="form-control" id="order_info" rows="7"></textarea>
                      </div>
                      <div>
                          <!-- order_Id is a hidden field value is not required but set = 0-->
                          <input id="_id" type="hidden" name="_id" value="0">
                      </div>
                  </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="saveChangesBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                `;

    return orderCard;

  });
  // Set the innerHTML of the postCards root element = orderCards
  // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
  document.getElementById('orderCards').innerHTML = orderCards.join('');

  // Add Event listeners for Update and Delete orders
  //
  // 1. Find button all elements with matching class name
  const updateButtons = document.getElementsByClassName('btn-update-order');
  const deleteButtons = document.getElementsByClassName('btn-delete-order');

  // 2. Assign a 'click' event listener to each button
  // Both arrays have same length so only need 1 loop
  for (let i = 0; i < updateButtons.length; i++) {
    updateButtons[i].addEventListener("click", prepareOrderUpdate);
    deleteButtons[i].addEventListener("click", deleteOrder);
  }


});

// Setup order form
function orderFormSetup(title) {
  // reset the form and change the title
  document.getElementById('orderFormOwner').reset();
  document.getElementById('modalTitle').innerHTML = title;
  // form reset doesn't work for hidden inputs!!
  // do this to reset previous id if set
  document.getElementById("_id").value = 0;
} // End function


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

/*
let addOrUpdateOrder = async () => {
  // Get the form data
  const formProduct = getOrderFormData();

  if (formProduct) {
      const result = await productData.createOrUpdate(formProduct);
      loadProducts();
  }
}
*/


// Create OrderDetails object
let addOrUpdateOrder = async () => {
  const newOrder = getOrderFormData();
    // log to console
  console.log(newOrder);

  orderData.createOrUpdateOrder(newOrder);
  loadOrders()
  // End function
  console.log(newOrder);
};


// When a order is selected for update/ editing
// get by id and fill out the form
async function prepareOrderUpdate() {
  try {
    // 1. Get order by id
    const order = await orderData.getOrderById(this.id);

    // 2. Set form defaults
    orderFormSetup(`Update Order ID: ${order._id}`);

    // 3. Fill out the form
    document.getElementById("_id").value = order._id;
    document.getElementById("order_name").value = order.orderDetails_name;
    document.getElementById("order_mobile").value = order.orderDetails_mobile;
    document.getElementById("order_email").value = order.orderDetails_email;
    document.getElementById("order_burger").value = order.orderDetails_burger;
    document.getElementById("order_kebab").value = order.orderDetails_kebab;
    document.getElementById("order_chip").value = order.orderDetails_chip;
    document.getElementById("order_drink").value = order.orderDetails_drink;
    document.getElementById("order_info").value = order.orderDetails_info;

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
} // End function

// Delete order by id
async function deleteOrder() {
  const result = await orderData.deleteOrderById(this.id);
  if (result === true) {
      loadOrders();
  }
}

// Loaded on Home page - user create form
let loadForm = async () => {

  try {
    // Create eventHandler for contact form:
    // Add event listener to button - 'addOrder' and call functions 
    const saveOrderButton = document.getElementById('saveOrderButton');
    saveOrderButton.addEventListener("click", addOrUpdateOrder);
  }
  // catch and log any errors
  catch (err) {
    console.log(err);
  }
}

// Load and display orders on Owner Access only page
let loadOrders = async () => {

  try {
    const orders = await orderData.getOrders();
    //pass json data for display
    displayOrders(orders);

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }

  document.getElementById('saveChangesBtn').addEventListener('click', addOrUpdateOrder);

};





// When this script is loaded, get things started by calling loadOrders() if in Owner Access!
if (window.location.href == 'http://localhost:3000/ownerPage.html') {
  loadOrders();
}
else {
  loadForm();
};