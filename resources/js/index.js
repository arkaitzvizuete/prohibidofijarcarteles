let color;
let preview;
let clientWidth;
let clientHeight;
let settingsSetted = false;
const modes = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];

function applyFilter(c) {

    color = c;

    // Show preview
    $("#preview").show();

    // Load Camera
    loadCamera();

}

function loadCamera() {

    const constraints = {
        audio: false,
        video: {
            facingMode: "environment",
            whiteBalanceMode: "false"
        }
    }

    navigator.getUserMedia(constraints, successCallback, errorCallback);
}

function successCallback(mediaStream) {
    const video = document.getElementById("preview");
    video.srcObject = mediaStream;

    video.onloadedmetadata = function(e) {
        // Apply Overlay Color
        if (color === 'R') {
            // TODO: Red filter
            $("#overlay").css("mix-blend-mode", modes[3]);
            $("#overlay").css("background-color", "#FF0000");

        } else if (color === 'B') {
            $("#overlay").css("mix-blend-mode", modes[3]);
            $("#overlay").css("background-color", "#0000FF");
        }

        // Get video settings
        preview =  document.getElementById("preview");
        clientWidth = preview.clientWidth;
        clientHeight = preview.clientHeight;

        // Apply overlay size
        $("#overlay").css("width", clientWidth);
        $("#overlay").css("height", clientHeight);

        // Hide preview
        $("#preview").hide();
        $("#filterPreview").show();

        // Remove Color
        removeColor(color);
    };
}

function errorCallback(e) {
    console.log("Error: " + e);
}


function removeColor(color) {

    // Replace Pixels
    replacePixels(color);
    
    // Draw on Canvas
    setTimeout(function() {
        removeColor(color);
    }, 0);

}

function replacePixels(color) {

    let filterPreview = document.getElementById("filterPreview");
    let filterPreviewContext = filterPreview.getContext("2d");

    filterPreview.width = clientWidth;
    filterPreview.height = clientHeight;

    filterPreviewContext.drawImage(preview, 0, 0, clientWidth, clientHeight);

    let frame = filterPreviewContext.getImageData(0, 0, clientWidth, clientHeight);
    let l = frame.data.length;

    for (let i = 0; i < l; i++) {

        if (color === "R") {
            // frame.data[i * 4 + 0] = 0;
            frame.data[i * 4 + 1] = 0;
            frame.data[i * 4 + 2] = 0;
        
        } else if (color === "B") {
            frame.data[i * 4 + 0] = 0;
            frame.data[i * 4 + 1] = 0;
            // frame.data[i * 4 + 2] = 0;
        }
    }

    filterPreviewContext.putImageData(frame, 0, 0);

    return;
}

function getColorPercentage(r, g, b, color) {

    const pureRed = {
        r: 210,
        g: 0,
        b: 0
    }

    const pureBlue = {
        r: 0,
        g: 0,
        b: 255
    }

    let auxR, auxG, auxB;
    let colorPercentage;

    if (color === "R") {
        auxR = Math.pow(r - pureRed.r, 2);
        auxG = Math.pow(g - pureRed.g, 2);
        auxB = Math.pow(b - pureRed.b, 2);

    } else {
        // TODO: Blue filter
    }
    
    colorPercentage = Math.sqrt(auxR + auxG + auxB);
    
    return colorPercentage;
}
