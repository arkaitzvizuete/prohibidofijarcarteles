
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

    filterPreviewContext.drawImage(preview, 0, 0, clientWidth, clientHeight);

    let frame = filterPreviewContext.getImageData(0, 0, 640, 480);
    let l = frame.data.length;

    for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        
        if (r > 100 && g < 50 && b < 50) {
            frame.data[i * 4 + 0] = 0;
            frame.data[i * 4 + 1] = 0;
            frame.data[i * 4 + 2] = 255;
        }

    }

    filterPreviewContext.putImageData(frame, 0, 0);

    return;
}

