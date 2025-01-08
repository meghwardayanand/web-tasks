const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const selectedFeatures = []
const availableFeatures = []
const selectedTarget = []

function removeElement(from, element){
    var index = from.indexOf(element);

    if (index > -1){
        from.splice(index, 1)
    }// IF ENDS HERE

}// removeElement FUNCTION ENDS HERE


function selectFeature(feature){
    selectedFeaturesDiv = document.querySelector('#selectedFeatures');

    if (!selectedFeatures.includes(feature)){
        var btn = document.createElement('button');
        selectedFeatures.push(feature)
        btn.setAttribute('value', feature)
        btn.setAttribute('id', feature)
        btn.innerHTML = feature
        btn.setAttribute('class', 'btn btn-primary selectedFeatures')
        btn.onclick = function(event){
            var availableFeaturesDiv = document.querySelector('#availableFeatures')
            newBtn = document.createElement('button');
            newBtn.innerHTML = event.target.value
            newBtn.setAttribute('value', event.target.value)
            newBtn.setAttribute('id', event.target.value)
            newBtn.setAttribute('class', 'btn btn-outline-primary availableFeatures');
            newBtn.onclick = function(e){
                selectFeature(e.target.value)
                removeElement(availableFeatures, e.target.value)
                availableFeaturesDiv.removeChild(this)
            } // button click ENDS HERE

            availableFeaturesDiv.appendChild(newBtn)
            availableFeatures.push(event.target.value)
            selectedFeaturesDiv.removeChild(this)
            removeElement(selectedFeatures, event.target.value)
            // alert('added')
        }

        selectedFeaturesDiv.appendChild(btn);
    }
}// selectFeature ENDS HERE


function makeFeatureAvailable(feature){
    var availableFeaturesDiv = document.querySelector('#availableFeatures')
    availableFeatures.push(feature)
    var btn = document.createElement('button')
    btn.innerHTML = feature
    btn.setAttribute('value', feature)
    btn.setAttribute('id', feature)
    btn.setAttribute('class', 'btn btn-outline-primary availableFeatures');
    btn.onclick = function(event){
        var availableFeaturesDiv = document.querySelector('#availableFeatures')
        selectFeature(event.target.value)
        removeElement(availableFeatures, event.target.value)
        availableFeaturesDiv.removeChild(this)
    } // button click ENDS HERE

    availableFeaturesDiv.appendChild(btn)
}// makeFeatureAvailable ENDS HERE


document.addEventListener('DOMContentLoaded', function(e){
    var selectTargetOptions = document.querySelector('#selectTargetOptions');
    // console.log(columns.length)
    for(i=0; i< columns.length; i++){
        // console.log(columns[i])
        var colName = document.createElement('option');
        colName.setAttribute('value', columns[i]);
        colName.innerHTML = columns[i];
        selectTargetOptions.appendChild(colName);
    }// FOR ENDS HERE

    selectedTarget.push(selectTargetOptions.value)
    for(i=0; i<columns.length; i++){
        if(columns[i] != selectedTarget[0]){
            makeFeatureAvailable(columns[i])
        }
    }

    selectTargetOptions.onchange = function(e){
        var target = e.target.value
        var availableFeaturesDiv = document.querySelector('#availableFeatures');
        var selectedFeaturesDiv = document.querySelector('#selectedFeatures')
        target_ = selectedTarget[0]
        removeElement(selectedTarget, target_)
        selectedTarget.push(target)
        if (availableFeatures.includes(target)){
            makeFeatureAvailable(target_)
            removeElement(availableFeatures, target)
            availableFeaturesDiv.removeChild(document.querySelector('#'+target))
        }else{
            selectFeature(target_)
            removeElement(selectedFeatures, target)
            selectedFeaturesDiv.removeChild(document.querySelector('#'+target))
        }// END ELSE
    }// Target Selection CHANGE ENDS HERE


    var selectAll = document.querySelector('#selectAllFeatures');
    var removeAll = document.querySelector('#removeAllSelectedFeatures');
    selectAll.onclick = function(event){
        var availableFeaturesDiv = document.querySelector('#availableFeatures');
        while (availableFeatures.length > 0){
            selectFeature(availableFeatures[0]);
            removeElement(availableFeatures, availableFeatures[0])
        }
        availableFeaturesDiv.innerHTML = "";
    }// onclick selectAll ENDS HERE

    removeAll.onclick = function(event){
        var availableFeaturesDiv = document.querySelector('#availableFeatures')
        while (selectedFeatures.length > 0){
            newBtn = document.createElement('button');
            newBtn.innerHTML = selectedFeatures[0]
            newBtn.setAttribute('value', selectedFeatures[0])
            newBtn.setAttribute('id', selectedFeatures[0])
            newBtn.setAttribute('class', 'btn btn-outline-primary availableFeatures');
            newBtn.onclick = function(e){
                selectFeature(e.target.value)
                removeElement(availableFeatures, e.target.value)
                availableFeaturesDiv.removeChild(this)
            } // button click ENDS HERE
            availableFeaturesDiv.appendChild(newBtn)
            availableFeatures.push(selectedFeatures[0])
            // selectedFeaturesDiv.removeChild(this)
            removeElement(selectedFeatures, selectedFeatures[0])
        }// FOR ENDS HERE
        document.querySelector('#selectedFeatures').innerHTML = "";
    }// onclick removeAll ENDS HERE
}); // DOMContentLoaded event ENDS HERE
