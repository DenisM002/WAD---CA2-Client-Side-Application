// Functions which generate page content, event handlers, what to load etc.

// Import all exports from postData
import * as postData from '../dataAccess/postData.js';
import { Post } from '../models/post.js';

// Create post cards
// Display in web page
let displayPosts = ((posts) => {
  // Use the Array map method to iterate through the array of products (in json format)
  const postCards = posts.map(post => {
    let postCards = `<div class="card mt-3">
                  <div class="card-body">
                    <div class="card-title">
                      <h4 class="mt-2"> ${post.post_title} </h4>
                        <div class="card-text mt-4"> 
                           ${post.post_body}
                        </div>
                      </div>
                    </div>
                  </div>`;

    return postCards;

  })
  // Set the innerHTML of the postCards root element = rows
  // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
  document.getElementById('postCards').innerHTML = postCards.join('');

  // Add event listener to button - 'Create Post' and call functions 
  const savePostButton = document.getElementById('createPostSaveBtn');
  savePostButton.addEventListener("click", addPost);
});


// Creates Post object from Modal form inputs
let getPostFormData = () => {
  return new Post(
    document.getElementById("_id").value,
    document.getElementById("post_title").value,
    document.getElementById("post_body").value
  );
};


// Load and display posts on home page
let loadPosts = async () => {
  try {
    const posts = await postData.getPosts();
    //pass json data for display
    displayPosts(posts);

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
};


// Create Post object
let addPost = async () => {
  const newPost = getPostFormData();
  // log to console
  console.log(newPost);

  postData.createPost(newPost);
  loadPosts();
    

// End function
console.log(newPost);
};



export {
  loadPosts
};


// When this script is loaded, get things started by calling loadPosts()
loadPosts();