// Contains functions for Post data

// Imports all exports from fetchAPI
// Allows usage of GET_INIT, getDataAsync, etc
import * as api from './fetchAPI.js';



// Gets post data and returns to index.js
let getPosts = async () => {
    try {
  
      // get products data - note only one parameter in function call
      const posts = await api.getDataAsync(`${api.BASE_URL}/post`);
      return posts;
      
   } // catch and log any errors
   catch (err) {
     console.log(err);
   }
};

let createPost = async (post) => {
    // url for api call
    const url = `${api.BASE_URL}/post`
    // New product = POST, Update = PUT or PATCH
    let httpMethod = 'POST';

    // log to console
    console.log('Create post:', post);
    
    // Check if new or update
    // Only existing products have formProduct._id > 0
    if (post._id > 0) {
        httpMethod = 'PUT';
    }

    // build the request object - note: POST
    // reqBodyJson added to the req body
    const request = api.fetchInit(httpMethod, JSON.stringify(post));

  try {
    // Call fetch and await the respose
    // fetch url using request object
    const response = await api.getDataAsync(url, request);
    const json = await response.json();

    // Output result to console (for testing purposes)
    console.log(json);

    // catch and log any errors
  } catch (err) {

    console.log(err);
    return err;
  }

}



  

export {
    getPosts,
    createPost
};