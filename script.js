// Name: Harel Peri
// OOP project #1;

//-------------------\\
// Games constructur

function GameOb(home, away, win, lose, venue)
{
    this.home = home;
    this.away = away;
    this.win = win;
    this.lose = lose;
    this.venue = venue;
}

// global variables
var gamesArray = [];
var num = 0;

// sync function for html request
function JsonSync(url)
{
    var resp = "";
    var xmlHttp = new XMLHttpRequest();

    if(xmlHttp !== null)
    {
        xmlHttp.open('GET', url, false)
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }

    return resp;
}

function getGameData() 
{
    // gamedata variables
    var year = document.getElementById("yearDropDown").value;
    var month = document.getElementById("monthDropDown").value;
    var day = document.getElementById("dayDropDown").value;
    var tempUrl = "";

    if (year === "Select Year" || month === "Select Month" || day === "Select Day")
    {
        message("Invalid Input");
    }
    else
    {
        tempUrl = "http://gd2.mlb.com/components/game/mlb/year_";

        if (month < 10)
        {
            tempUrl += year + "/month_0" + month;
        }
        else
        {
            tempUrl += year +"/month_" + month;
        }

        if (day < 10)
        {
            tempUrl += "/day_0" + day;
        }
        else 
        {
            tempUrl += "/day_" + day;
        }

        tempUrl += "/master_scoreboard.json";

        // get json data from url
        var baseballJSON = JsonSync(tempUrl);
        var jsonObject = JSON.parse(baseballJSON);

        // empying the array on each retrieve button click
        gamesArray = [];
        num = 0;
        for (var prop in jsonObject.data.games)
        {
            // if the url has the "game" property it wil continue to add the the data to array
            if (prop == "game")
            {
                for (let x = 0; x < jsonObject.data.games.game.length; x++) 
                {
                    gamesArray.push( new GameOb(
                    jsonObject.data.games.game[x].home_team_name,
                    jsonObject.data.games.game[x].away_team_name,
                    jsonObject.data.games.game[x].winning_pitcher.first + " " + jsonObject.data.games.game[x].winning_pitcher.last,
                    jsonObject.data.games.game[x].losing_pitcher.first + " " + jsonObject.data.games.game[x].losing_pitcher.last,
                    jsonObject.data.games.game[x].venue
                    ));
                }
            }
        }

        // will only print if gamearray length is greate than 0
        if (gamesArray.length > 0)
        {
            document.getElementById("home").value = gamesArray[0].home;
            document.getElementById("away").value = gamesArray[0].away;
            document.getElementById("win").value = gamesArray[0].win;
            document.getElementById("lose").value = gamesArray[0].lose;
            document.getElementById("venue").value = gamesArray[0].venue;
        }
        else
        {
            // if no data was added to array, will dispaly this error to avoid errors in chrome debugger
            message("No Games Found For This Day");
        }
   
    }
}

// function to move between the games from the same day.
function nextGame()
{
    // check if num matches array length so it won;t go further or give error for the user
    if(num !== (gamesArray.length - 1))
    {
        num += 1;
        document.getElementById("home").value = gamesArray[num].home;
        document.getElementById("away").value = gamesArray[num].away;
        document.getElementById("win").value = gamesArray[num].win;
        document.getElementById("lose").value = gamesArray[num].lose;
        document.getElementById("venue").value = gamesArray[num].venue;
        
    }
    else
    {
        message("That's the last game of the day");
    }
}

function previousGame()
{

    if (num <= 0)
    {
        message("Can't go back");
    }
    else 
    {
        num -= 1;
        document.getElementById("home").value = gamesArray[num].home;
        document.getElementById("away").value = gamesArray[num].away;
        document.getElementById("win").value = gamesArray[num].win;
        document.getElementById("lose").value = gamesArray[num].lose;
        document.getElementById("venue").value = gamesArray[num].venue;
    }
    
}

window.addEventListener('load', initialize);
// function to initialize the dropdowns on the start
function initialize() 
{
    // populate the day dropDown
    populateDropdownMenu("dayDropDown", 1, 31);

    // populate the month dropDown
    populateDropdownMenu("monthDropDown", 1, 12);

    // populate the year dropDown
    populateDropdownMenu("yearDropDown", 2015, 2017);

}

function populateDropdownMenu(elementId, min, max) 
{
    // Populate Dropdown with numbers between 1 and 31
    var dropDown = document.getElementById(elementId);

    // Loop that counts from 1 - 31				
    for (var counter = min; counter <= max; counter++) 
    {
        // Creates the html element <option value=''>innerHTML</option>
        var tempElement = document.createElement("option");

    if (elementId === "monthDropDown")
    {
        // print the months in names and not numbers
        switch (counter) 
        {
            case 1:
                tempElement.innerHTML = "January";
                tempElement.value = "1";
                break;
            case 2:
                tempElement.innerHTML = "February";
                tempElement.value = "2";
                break;
            case 3:
                tempElement.innerHTML = "March";
                tempElement.value = "3";
                break;
            case 4:
                tempElement.innerHTML = "April";
                tempElement.value = "4";
                break;
            case 5:
                tempElement.innerHTML = "May";
                tempElement.value = "5";
                break;
            case 6:
                tempElement.innerHTML = "June";
                tempElement.value = "6";
                break;
            case 7:
                tempElement.innerHTML = "July";
                tempElement.value = "7";
                break;
            case 8:
                tempElement.innerHTML = "August";
                tempElement.value = "8";
                break;
            case 9:
                tempElement.innerHTML = "September";
                tempElement.value = "9";
                break;
            case 10:
                tempElement.innerHTML = "October";
                tempElement.value = "10";
                break;
            case 11:
                tempElement.innerHTML = "November";
                tempElement.value = "11";
                break;
            case 12:
                tempElement.innerHTML = "December";
                tempElement.value = "12";
                break;
            
            default:
                break;
        }

    }
    else
    {
        tempElement.innerHTML = counter;
        tempElement.value = counter;
    }
       

        // Append (Add) the newly created element to the dropDown element
        dropDown.appendChild(tempElement);

    }
}

function monthChange() {

    // Get the new month 
    var newMonth = document.getElementById("monthDropDown").value;

    // Clear the Contents
    clearDropdown("dayDropDown");

    // How many days in each month
    if (newMonth == 1 ||
        newMonth == 3 ||
        newMonth == 5 ||
        newMonth == 7 ||
        newMonth == 8 ||
        newMonth == 10 ||
        newMonth == 12) {
        // Populate the day dropDown with 31 days
        populateDropdownMenu("dayDropDown", 1, 31);
    }
    else if (newMonth == 4 ||
        newMonth == 6 ||
        newMonth == 9 ||
        newMonth == 11) {
        // Populate the day dropDown with 30 days
        populateDropdownMenu("dayDropDown", 1, 30);
    }
    else {
        var year = document.getElementById("yearDropDown").value;
        if (year % 4 == 0) {
            // Populate the day dropDown with 29 days
            populateDropdownMenu("dayDropDown", 1, 29);
        }
        else {
            // Populate the day dropDown with 28 days
            populateDropdownMenu("dayDropDown", 1, 28);
        }

    }

}

/*
    Clear contents of specified dropDown
*/
function clearDropdown(elementId) {
    // Clear the contents of the dropDown menu
    var dropDown = document.getElementById(elementId);

    // Empty everything in the dropDown html element
    dropDown.innerHTML = "";

    // Creates the html element <option disabled selected>--</option>
    var tempElement = document.createElement("option");

    // Assigning to the element properties
    tempElement.disabled = true;
    tempElement.selected = true;
    tempElement.innerHTML = "Select Day";

    // Append to the dropDown
    dropDown.appendChild(tempElement);
}

// function to display the errors for user
function message(elm) {
    var element = document.getElementById("alertbox");
    element.innerHTML = elm;
    element.classList.remove("display");
    errorMessage();
}

function errorMessage() {
    setTimeout(function () {
        var element = document.getElementById("alertbox");
        element.classList.add("display");

    }, 2000);
}
