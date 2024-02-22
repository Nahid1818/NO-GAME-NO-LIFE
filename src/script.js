let menuItems = "";
let myMenu = document.getElementById("manue");
let video = document.getElementById("video");
let videoInfo = document.getElementById("videoInfo");
let videoWidth = video.clientWidth;
videoInfo.innerHTML = `<div class="h-[84%] mobileS:h-full" style="width: ${videoWidth}px;">
<h1 class="my-[2%] text-xl font-bold">ENJOY OUR MUSIC VIDEO | MUSIC NO: 01</h1>
<p>THANKS FOR WATCHING! AFTER YOU CIMMPLITE THIS WHOLE PLAYLIST YOU CAN WATCH OUR NEXT PLAYLIST
    | AND DON'T FORGET TO LEAVE A CMMAND.</p>
</div>`;

// Create menu items
for (let i = 1; i <= 15; i++) {
    let num = (i < 10) ? "0" + i : i;
    menuItems += `
    <div class="bg-[rgb(40,40,40)] hover:bg-[rgb(50,50,50)] h-[17vh] tablet:h-[26vh] laptop:h-[17vh] w-full grid grid-cols-[45%_55%] *:cursor-pointer" id="${num}">
        <div class="bg-cover bg-no-repeat bg-center rounded-lg" style="background-image: url(img/poster/${num}.png);");"></div>
        <div class="m-[5%]">
            <h1 class="text-xl font-bold">MUSIC NO: ${num}</h1>
            <p>NEW RELESED MUSIC WATCH NOW!</p>
        </div>
    </div>`;
}

// Update menu
myMenu.innerHTML = menuItems;

// Keep track of the ID of the last clicked menu item
let lastClickedItemId = null;

// Set onclick event for each menu item to play the corresponding video
for (let i = 1; i <= 15; i++) {
    let num = (i < 10) ? "0" + i : i;

    document.getElementById(num).onclick = function () {
        // Play the corresponding video
        playVideo(num);

        // Update the video info
        videoInfo.innerHTML = `<div class="h-[84%] mobileS:h-full" style="width: ${videoWidth}px;">
            <h1 class="my-[2%] text-xl font-bold">ENJOY OUR MUSIC VIDEO | MUSIC NO: ${num}</h1>
            <p>THANKS FOR WATCHING! AFTER YOU COMPLETE THIS WHOLE PLAYLIST, YOU CAN WATCH OUR NEXT PLAYLIST AND DON'T FORGET TO LEAVE A COMMENT.</p>
        </div>`;

        // Remove active state from the previously clicked item, if any
        if (lastClickedItemId) {
            let lastClickedItem = document.getElementById(lastClickedItemId);
            if (lastClickedItem) {
                lastClickedItem.classList.remove("bg-[rgb(70,0,70)]");
                lastClickedItem.classList.add("bg-[rgb(40,40,40)]");
                lastClickedItem.classList.add("hover:bg-[rgb(50,50,50)]");
            }
        }

        // Add active state to the currently clicked item
        let currentClickedItem = document.getElementById(num);
        if (currentClickedItem) {
            currentClickedItem.classList.remove("bg-[rgb(40,40,40)]");
            currentClickedItem.classList.remove("hover:bg-[rgb(50,50,50)]");
            currentClickedItem.classList.add("bg-[rgb(70,0,70)]");
        }

        // Update the ID of the last clicked item
        lastClickedItemId = num;
    };
}

// Function to play a specific video
function playVideo(num) {
    video.src = "video/" + num + ".mp4";
    video.play();
}

// Add event listener to play the next video when the current one ends
video.addEventListener("ended", function () {
    let currentSrc = video.src;
    let currentVideoIndex = parseInt(currentSrc.substring(currentSrc.lastIndexOf('/') + 1, currentSrc.lastIndexOf('.')));
    let nextVideoIndex = (currentVideoIndex % 15) + 1;
    let nextVideo = (nextVideoIndex < 10) ? "0" + nextVideoIndex : nextVideoIndex;
    let currentVideoIndexIn = currentVideoIndex + 1;
    let currentVideoIndexInfo = (currentVideoIndexIn < 10) ? "0" + currentVideoIndexIn : currentVideoIndexIn;
    playVideo(nextVideo);
    videoInfo.innerHTML = `<div class="h-[84%] mobileS:h-full" style="width: ${videoWidth}px;">
    <h1 class="my-[2%] text-xl font-bold">ENJOY OUR MUSIC VIDEO | MUSIC NO: ${currentVideoIndexInfo}</h1>
    <p>THANKS FOR WATCHING! AFTER YOU COMPLETE THIS WHOLE PLAYLIST, YOU CAN WATCH OUR NEXT PLAYLIST AND DON'T FORGET TO LEAVE A COMMENT.</p>
    </div>`;

    // Remove active state from the previously clicked item
    if (lastClickedItemId) {
        document.getElementById(lastClickedItemId).classList.remove("bg-[rgb(70,0,70)]");
        document.getElementById(lastClickedItemId).classList.add("bg-[rgb(40,40,40)]");
        document.getElementById(lastClickedItemId).classList.add("hover:bg-[rgb(50,50,50)]");
    }

    // Add active state to the next menu item
    let nextMenuItemIndex = (nextVideoIndex < 10) ? "0" + nextVideoIndex : nextVideoIndex;
    document.getElementById(nextMenuItemIndex).classList.remove("bg-[rgb(40,40,40)]");
    document.getElementById(nextMenuItemIndex).classList.remove("hover:bg-[rgb(50,50,50)]");
    document.getElementById(nextMenuItemIndex).classList.add("bg-[rgb(70,0,70)]");

    // Update the ID of the last clicked item
    lastClickedItemId = nextMenuItemIndex;
});

// Function to refresh the page
function refreshPage() {
    window.location.reload();
}

// Add event listener for window resize
window.onresize = function (event) {
    // Call the refreshPage function when the window is resized
    refreshPage();
};