let fileSaver = require('file-saver/src/FileSaver');

var sliderWidth = document.getElementById("widthRange");
var outputWidth = document.getElementById("widthValue");
var changeSizeBtn = document.getElementById("changeSizeBtn");
// Setup the dnd listeners.
var dropZone = document.getElementById('dragPanel');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

var slider = document.getElementById("myRange");
var output = document.getElementById("heightValue");

let img = new Image();
var fileName = "";
var selectedWidth = document.getElementById("widthValue")
var selectedHeight = document.getElementById("heightValue");

let generatedBlob = new Blob;
(function () {
    var holder = document.getElementById('dragPanel');
    holder.ondragover = () => {
        return false;
    };

    holder.ondragleave = () => {
        return false;
    };

    holder.ondragend = () => {
        return false;
    };

    holder.ondrop = (e) => {
        e.preventDefault();

        for (let f of e.dataTransfer.files) {
            console.log('File(s) you dragged here: ', f)
            fileName = f.name;
        }

        return false;
    };
})();

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {

        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render image  
                var dropZone = document.getElementById('dragPanel');
                dropZone.style.backgroundImage = "url(" + e.target.result + ")";//e.target.result;
                var dragText = document.getElementById("dragText");
                dragText.innerHTML = "";
                img.src = e.target.result;
                img.onload = () => {
                    const elem = document.createElement('canvas');
                    elem.width = selectedWidth.value;
                    elem.height = selectedHeight.value;
                    const ctx = elem.getContext('2d');
                    // img.width and img.height will contain the original dimensions
                    ctx.drawImage(img, 0, 0, selectedWidth.value, selectedHeight.value);
                    ctx.canvas.toBlob((blob) => {
                        fileSaver.saveAs(blob, "fotoCambiada");
                        const file = new File([blob], fileName, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                    }, 'image/jpeg', 1);
                }
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

document.getElementById('dragPanel').addEventListener('change', handleFileSelect, false);

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

output.value = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.value = this.value;
}

output.oninput = function () {
    slider.value = this.value;
}


outputWidth.value = sliderWidth.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderWidth.oninput = function () {
    outputWidth.value = this.value;
}

outputWidth.oninput = function () {
    sliderWidth.value = this.value;
}

/*
changeSizeBtn.onclick = function () {
    const elem = document.createElement('canvas');
    const mime = "image/png";
    const quality = 1;
    elem.width = selectedWidth.value;
    elem.height = selectedHeight.value;
    const ctx = elem.getContext('2d');
    ctx.drawImage(img, 0, 0, selectedWidth, selectedHeight);
    //const data = ctx.canvas.toDataURL(img, mime, quality);
    ctx.canvas.toBlob((blob) => {
        generatedBlob = blob;
        console.log(blob); //output image as a blob
        const file = new File([blob], fileName, {
            type: mime,
            lastModified: Date.now()
        });
        console.log(file);
        /*var a = document.getElementById('hiddenDownloadButton');
        url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);*/
    }, mime, quality);
    fileSaver.saveAs(generatedBlob, "fotoCambiada");
}

function saveBlob(blob) {
  let reader = new FileReader()
  reader.onload = function() {
      if (reader.readyState == 2) {
          var buffer = new Buffer(reader.result)
          ipcRenderer.send(SAVE_FILE, fileName, buffer)
          console.log(`Saving ${JSON.stringify({ fileName, size: blob.size })}`)
      }
  }
  reader.readAsArrayBuffer(blob)
}*/
