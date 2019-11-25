const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics):


// Run a standard minute/second/hundredths timer:


// Match the text entered with the provided text on the page:
function inputFunction() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   

        paused = 0;
        running = 1;
    }
    console.log("TestArea: " + testArea.value);
    console.log("OriginText: " + originText);
    if (testArea.value != "") {
        if (originText.match(testArea.value)) {
            console.log("GOOD!");
            testWrapper.style.borderColor = 'green';
        } else {
            testWrapper.style.borderColor = 'red';
        }
    } else {
        testWrapper.style.borderColor = '';
    }

    testArea.addEventListener("input", event => {
        const target = event.currentTarget;
        const currentLength = target.value.length;

        console.log("originText Length: " + originText.length);
        console.log("textArea Length: " + currentLength);
        if (originText.match(testArea.value) && currentLength == originText.length) {
            clearInterval(tInterval);
            savedTime = 0;
            difference = 0;
            paused = 0;
            running = 0;
            testArea.disabled = true;
        }

    });
}

// Start the timer:
resetButton.onclick = function() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
    theTimer.innerHTML = '00' + ':' + '00' + ':' + '00';
    testArea.value = "";
    testWrapper.style.borderColor = '';
    if (testArea.disabled == true) {
        testArea.disabled = false;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((difference % (10 * 100)) / 10);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "0" + milliseconds : "" + milliseconds : "0" + milliseconds;
    if (minutes > 60) {
        theTimer.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
    } else {
        theTimer.innerHTML = minutes + ':' + seconds + ':' + milliseconds;
    }
}

// Reset everything:


// Event listeners for keyboard input and the reset button:
