
let blendModeIndex = 1;

function loadCamera() {

    const constraints = {
        audio: false,
        video: {
            facingMode: "environment"
        }
    }

    navigator.getUserMedia(constraints, successCallback, errorCallback);
}

function successCallback(mediaStream) {
    const video = document.getElementById("preview");
    video.srcObject = mediaStream;
}

function errorCallback(e) {
    console.log("Error: " + e);
}


function applyFilter(color) {
    // Remove previous filter

    // Replace Pixels
    replacePixels(color);
    
    // Draw on Canvas
    setTimeout(function() {
        applyFilter(color);
    }, 0);

}


function replacePixels(color) {

    let preview =  document.getElementById("preview");
    let filterPreview = document.getElementById("filterPreview");
    let filterPreviewContext = filterPreview.getContext("2d");

    let clientWidth = preview.clientWidth;
    let clientHeight = preview.clientHeight;
    filterPreview.width = clientWidth;
    filterPreview.height = clientHeight;

    $("#overlay").css("width", clientWidth);
    $("#overlay").css("height", clientHeight);
    $("#overlay2").css("width", clientWidth);
    $("#overlay2").css("height", clientHeight);

    if (color === "R") {
        $("#overlay").css("background-color", "#FF0000");
        $("#overlay2").css("background-color", "#0000FF");
    } else if (color === "B") {
        // $("#overlay").css("background-color", "#0000FF");
    }

    filterPreviewContext.drawImage(preview, 0, 0, clientWidth, clientHeight);

    let frame = filterPreviewContext.getImageData(0, 0, clientWidth, clientHeight);
    let l = frame.data.length;

    for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];

        // if (getColorPercentage(r, g, b, color) < 120) {
        //     frame.data[i * 4 + 0] = 255;
        //     frame.data[i * 4 + 1] = 255;
        //     frame.data[i * 4 + 2] = 255;
        // }
        if (color === "R") {
            frame.data[i * 4 + 0] = 0;
        } else if (color === "B") {
            frame.data[i * 4 + 2] = 0;
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


function changeBlendMode() {
    let modes = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];

    $("#overlay").css("mix-blend-mode", modes[blendModeIndex]);
    $("#currentBlendMode").text(modes[blendModeIndex]);
    
    if (blendModeIndex == modes.length) {
        blendModeIndex = 0;
    } else {
        blendModeIndex++;
    }
}

