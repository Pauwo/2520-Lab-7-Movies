// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");
const searchInput = document.querySelector("#filter");

let movieHistory = {};

// Example of a simple function that clears the input after a user types something in
function clearInput() {
    inp.value = "";
}

function clearMovies() {
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';
}
function updateMovieHistoryTable() {
    const movieHistoryTable = document.querySelector("#movieHistoryTable");
    movieHistoryTable.innerHTML = ""; // Clear the table
  
    for (const movie in movieHistory) {
      const row = movieHistoryTable.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
  
      cell1.innerHTML = movie;
      cell2.innerHTML = movieHistory[movie];
    }
}
  
// Load movie history from local storage when the page loads
window.addEventListener("load", () => {
    const storedMovieHistory = localStorage.getItem("movieHistory");
    if (storedMovieHistory) {
    movieHistory = JSON.parse(storedMovieHistory);
    updateMovieHistoryTable();
    }
});

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
    // Step 1: Get value of input
    var userTypedText = inp.value;
    if (userTypedText === "") {
        alert("Enter a Movie!");
        return;
    }
    // Check if the movie already exists in the movie list
    const movieItems = myMovieList.getElementsByTagName("li");

    for (const item of movieItems) {
        if (item.innerText.toLowerCase() === userTypedText) {
        // Increment the watch count in the movie history
        movieHistory[userTypedText] = (movieHistory[userTypedText] || 1) + 1;
        // Update the movie history table
        updateMovieHistoryTable();
        clearInput();
        return;
        }
    }
    
    // Step 2: Create an empty <li></li>
    var li = document.createElement("li"); // <li></li>

    // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
    var textToInsert = document.createTextNode(userTypedText);

    // Step 4: Insert text into li
    // <li>Harry Potter </li>
    li.appendChild(textToInsert);

    // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
    myMovieList.appendChild(li);

    // Add the movie to the movie history
    movieHistory[userTypedText] = 1;

    // Update the movie history table
    updateMovieHistoryTable();

    // Step 6: Call the clearInput function to clear the input field
    clearInput();
}

searchInput.addEventListener("input", () => {
    const searchKeyword = searchInput.value.trim().toLowerCase();
    const movieItems = myMovieList.getElementsByTagName("li");

    for (const item of movieItems) {
        const movieTitle = item.innerText.toLowerCase();
        if (movieTitle.includes(searchKeyword)) {
            item.style.display = "list-item";
        } else {
            item.style.display = "none";
        }
    }
});


