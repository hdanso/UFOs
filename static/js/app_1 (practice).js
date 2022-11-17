// Import the data from data.js
const tableData = data;

// Reference the HTML table using d3 (1. declare a variable - tbody, 2. use d3.select to tell JS to look for the <tbody> tags in HTML)
var tbody = d3.select("tbody");

// Build the table to display all of the UFO sightings

    // Create a new function to start building the table & pass in 'data' as the argument
    function buildTable(data) {
        // Clear exisiting data (important to avoid data users search from being filtered when they search again). Tells JavaScript to use an empty string when creating the table
        tbody.html("");
        // Incorporate a forEach function that loops through our data array, and then adds rows of data to the table.
        data.forEach((dataRow) => {
            // Create a variable that will append a row to the table body
            let row = tbody.append("tr");
            // Loop through each field in the dataRow argument.
            Object.values(dataRow).forEach((val) => { // Object.values = reference one object from the array of UFO sightings, (dataRow) = we want the values to go into the dataRow, forEach((val) = specify that we want one object per row.
                // Create a variable to append data to a table
                let cell = row.append("td");
                cell.text(val); // Extracting only the values from the key-value pair in data
            });
        });
    }

// Create a function that will filter the new table by date when a button on the webpage is clicked
// Create a new function that will respond to the user clicking the webpage button
function handleClick() {
    // Get the datetime value from the filter
    let date = d3.select("#datetime").property("value"); // .select() = select the very first element that matches our selector string: "#datetime" (aka the datetime ID), .property("value") = telling D3 not only to look for where our date values are stored on the webpage, but to actually grab that information and hold it in the "date" variable
    // Set a default filter and save it to a new variable (default will be original table data)
    let filteredData = tableData;

    // Create an if statement to check for a date
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date); // Applying a filter method that will match the datetime value to the filtered date value. Triple equal sign tests for equality
    }
    // Rebuild the filtered data table using the buildTable variable we created earlier
    buildTable(filteredData); // pass the filteredData variable as our argument so that only the data that matches the filter is displayed.
}
    
// Use d3 to listen for when the button is clicked on the webpage
d3.selectAll("#filter-btn").on("click", handleClick); // .on("click", handleClick); = telling D3 to execute our handleClick() function when the button with an id of filter-btn is clicked

// Create a basic table filled with row upon row of unfiltered data pulled straight from our array. (for when webpage is first launched)
buildTable(tableData);