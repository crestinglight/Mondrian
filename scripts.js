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
		return selectedColor
	}

	function pickExactColor(generalColor){
		var exactColor = ""
		if (generalColor === "red"){
			exactColor = "#cc0000"
		}
		else if (generalColor === "blue"){
			exactColor = "#0000cc"
		}
		else if (generalColor === "yellow"){
			exactColor = "#ffec00"
		}
		else{
			return generalColor
		}
		return exactColor
	}

	var mainBoxesClick = document.getElementById("painting");
	var palatteBoxesClick = document.getElementById("color_palette");
	var selectedColor = "white";
	mainBoxesClick.addEventListener('click', getBoxID);
	palatteBoxesClick.addEventListener('click', selectColor);

});