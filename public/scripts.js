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

	function makeBoxHash(e){
		var saveStateHash = {};	
		for (var y = 1; y < 5 ; y++){
			for (var x = 1; x < 5; x++){
				saveStateHash['row' + y + 'box' + x] = document.getElementById("row_" + y + "_box_" + x).style.backgroundColor;
			}
		}
		// e.preventDefault();
		// debugger;
		//return saveStateHash;
		var stringy = "";
		stringy = noMoreRGB(saveStateHash);
		return stringy;
		//makeCSV(saveStateHash);
	}

	function noMoreRGB(hash){
		var newString = "";
		for (i in hash){
			if (hash[i] === "rgb(204, 0, 0)"){
				hash[i] = "red";
			}
			else if (hash[i] === "rgb(255, 236, 0)"){
				hash[i] = "yellow";
			}
			else if (hash[i] === "rgb(0, 0, 204)"){
				hash[i] = "blue";
			}
			else {
				hash[i] = "white";
			}
		}
		newString = makeCSV(hash);
		return newString;
	}

	function makeCSV(hash){
		var saveCSV = ""
		for (i in hash){
			saveCSV = saveCSV + i + "," + hash[i] + "\n";
		}
		return saveCSV;		
	}

	var mainBoxesClick = document.getElementById("painting");
	var palatteBoxesClick = document.getElementById("color_palette");
	var saveClick = document.getElementById("save_button");
	var selectedColor = "white";
	mainBoxesClick.addEventListener('click', getBoxID);
	palatteBoxesClick.addEventListener('click', selectColor);
	saveStateCSV = saveClick.addEventListener('click', makeBoxHash);

});