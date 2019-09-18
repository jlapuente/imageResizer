(function () {
    var holder = document.getElementById('dragPanel');
    console.log(document.getElementById('dragPanel'));
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
        }
        
        return false;
    };
})();

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            // Render thumbnail.  
            var dropZone = document.getElementById('dragPanel');
            dropZone.style.backgroundImage = "url(" + e.target.result + ")";//e.target.result;
            var dragText = document.getElementById("dragText");
            dragText.innerHTML = "";
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

  // Setup the dnd listeners.
  var dropZone = document.getElementById('dragPanel');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

var slider = document.getElementById("myRange");
var output = document.getElementById("heightValue");
output.value = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.value = this.value;
} 

output.oninput = function(){
    slider.value = this.value;
}

var sliderWidth = document.getElementById("widthRange");
var outputWidth = document.getElementById("widthValue");
outputWidth.value = sliderWidth.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderWidth.oninput = function() {
    outputWidth.value = this.value;
} 

outputWidth.oninput = function(){
    sliderWidth.value = this.value;
}