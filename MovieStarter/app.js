// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");
const searchInput = document.querySelector("#filter");
const movieHistoryTable = createMovieHistoryTable(); // Create the movie history table


let movieHistory = {};

function createMovieHistoryTable() {
    var table = document.createElement("table");
    table.id = "movieHistoryTable";
    table.style.width = "100%";
    table.innerHTML = "<tr><th>Title</th><th>Watched</th></tr>";
    document.getElementById("movieHistoryCard").appendChild(table);
    return table;
}

// Example of a simple function that clears the input after a user types something in
function clearInput() {
    inp.value = "";
}

function clearMovies() {
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
    // Step 1: Get value of input
    var userTypedText = inp.value;
    if (userTypedText === "") {
        alert("Enter a Movie!");
        return;
    }
    updateMovieHistory(userTypedText); // Increment times watched
    
    // Check if the movie already exists in the movie list
    const movieItems = myMovieList.getElementsByTagName("li");
    
    for (const item of movieItems) {
        if (item.innerText.toLowerCase() === userTypedText) {
            clearInput();
            return;
        }
    }
    
    // Step 2: Create an empty <li></li>
    var li = document.createElement("li"); // <li></li>
    li.style.listStyle = "none";
    
    // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
    var textToInsert = document.createTextNode(userTypedText);
    
    // Step 4: Insert text into li
    // <li>Harry Potter </li>
    li.appendChild(textToInsert);
    
    // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
    myMovieList.appendChild(li);
    
    // Initialize movie history if not present
    if (!movieHistory[userTypedText]) {
        movieHistory[userTypedText] = 1;
        addMovieToHistoryTable(userTypedText, 1); // Add a new entry to the table
    }
    
    // Step 6: Call the clearInput function to clear the input field
    clearInput();
    
    localStorage.setItem("movieHistory", JSON.stringify(movieHistory));
}


function addMovieToHistoryTable(movie, timesWatched) {
    var table = movieHistoryTable;
    
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    
    cell1.innerHTML = movie;
    cell2.innerHTML = timesWatched;
}

function updateMovieHistory(movie) {
    movieHistory[movie]++;
    var table = movieHistoryTable;
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        if (row.cells[0].innerHTML.trim().toLowerCase() === movie) {
            row.cells[1].innerHTML = movieHistory[movie];
            localStorage.setItem("movieHistory", JSON.stringify(movieHistory));
            return;
        }
    }
}

function loadMovieHistoryFromLocalStorage() {
    if (localStorage.getItem("movieHistory")) {
        movieHistory = JSON.parse(localStorage.getItem("movieHistory"));

        for (const movie in movieHistory) {
            addMovieToHistoryTable(movie, movieHistory[movie]);
        }
    }
}

loadMovieHistoryFromLocalStorage();

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
