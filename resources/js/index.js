
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

    filterPreviewContext.drawImage(preview, 0, 0, 300, 150);

    let frame = filterPreviewContext.getImageData(0, 0, 640, 480);
    let l = frame.data.length;

    for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        
        if (r > 150 && g < 100 && b < 100) {
            frame.data[i * 4 + 0] = 0;
            frame.data[i * 4 + 1] = 0;
            frame.data[i * 4 + 2] = 255;
        }

    }

    filterPreviewContext.putImageData(frame, 0, 0);

    return;
}

