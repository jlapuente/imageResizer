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