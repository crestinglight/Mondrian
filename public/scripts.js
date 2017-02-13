window.addEventListener('load', function(){

	function getBoxID(e){
		var boxID = e.target.id;
		changeBGColor(boxID);
	}

	function changeBGColor(boxId){

		document.getElementById(boxId).style.backgroundColor = selectedColor;
	}

	function selectColor(e){
		var palatteColor = e.target.id;
		selectedColor = pickExactColor(palatteColor);
		return selectedColor;
	}

	function pickExactColor(generalColor){
		var exactColor = "";
		if (generalColor === "red"){
			exactColor = "#cc0000";
		}
		else if (generalColor === "blue"){
			exactColor = "#0000cc";
		}
		else if (generalColor === "yellow"){
			exactColor = "#ffec00";
		}
		else{
			return generalColor;
		}
		return exactColor;
	}

	function makeBoxHash(){
		var saveStateHash = {};		

		for (var y = 1; y < 5 ; y++){
			for (var x = 1; x < 5; x++){
				saveStateHash['row' + y + 'box' + x] = document.getElementById("row_" + y + "_box_" + x).style.backgroundColor;
			}
		}
		return saveStateHash;
	}

	var mainBoxesClick = document.getElementById("painting");
	var palatteBoxesClick = document.getElementById("color_palette");
	var saveClick = document.getElementById("save_button");
	var selectedColor = "white";
	mainBoxesClick.addEventListener('click', getBoxID);
	palatteBoxesClick.addEventListener('click', selectColor);
	saveClick.addEventListener('click', makeBoxHash);

});