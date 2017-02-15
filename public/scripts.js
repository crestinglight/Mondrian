window.addEventListener('load', function(){

	//This function only gets the ID of the box that the user clicked on. It will then pass that ID into another function.
	function getBoxID(e){
		var boxID = e.target.id;
		changeBGColor(boxID);
	}

	//Reads the ID it receives (boxID), and changes the background color of the box with that ID to the selected color.
	function changeBGColor(boxId){

		document.getElementById(boxId).style.backgroundColor = selectedColor;
	}

	//This function allows us to select an active color that we would like to paint with. When the user clicks on the palatte items, it changes the selected color, or active color, to what the user clicked on. When a user clicks a paintable box, it will fill with the active color.
	function selectColor(e){
		var palatteColor = e.target.id;
		selectedColor = pickExactColor(palatteColor);
		return selectedColor;
	}

	//Telling the computer to pick "red" does not return exactly the color we want, so this function specifies what red, blue, and yellow really mean in rgb format.
	function pickExactColor(generalColor){
		var exactColor = "";
		//If the color says "red", we actually mean color #cc0000.
		if (generalColor === "red"){
			exactColor = "#cc0000";
		}
		//If the color says "blue", we actually mean color #0000cc.
		else if (generalColor === "blue"){
			exactColor = "#0000cc";
		}
		//If the color says "yellow", we actually mean color #ffec00.
		else if (generalColor === "yellow"){
			exactColor = "#ffec00";
		}
		//If the color says "white", we leave it white as the computer interprets this accurately.
		else{
			return generalColor;
		}
		return exactColor;
	}

	//Dealing with server side code, this function sends our "Save" information to the server
	function sendBoxHashToServer(e){
		//This variable becomes a string of all of the colors in order of correlating boxes. Example: "blue, yellow, red, red"
		var thePaintingData = makeBoxHash();

		//Making a new request.
		var paintingRequest = new XMLHttpRequest();
		//This line passes our painting data into a query string that Sinatra can use and determine what to do with.
		paintingRequest.open('POST', 'http://localhost:4567/savedata?values=' + thePaintingData);
		//This function executes when the server responds that it received the request.
		//Example: If a user clicks "like" on a facebook post, when the server responds that it received the request, only then will it update the like counter.
		paintingRequest.onload = function(){
			console.log("Painting Saved.");
		};
		//This line actually sends our request.
		paintingRequest.send();
	}

	//Called when the user clicks Save.
	function makeBoxHash(){
		var saveStateHash = {};	
		//These for loops create an object out of the box color information.
		for (var y = 1; y < 5 ; y++){
			for (var x = 1; x < 5; x++){
				saveStateHash['row' + y + 'box' + x] = document.getElementById("row_" + y + "_box_" + x).style.backgroundColor;
			}
		}

		var stringy = "";
		//Calling the noMoreRGB function to get our exact colors, which then calls our makeCSV function. "stringy" is a string of comma separated values of colors.
		stringy = noMoreRGB(saveStateHash);
		return stringy;
	}

	//At this point, the colors are expressed as "rgb(204, 0, 0)", which creates an issue with the comma separated values. This converts those strings back into "red", "blue", etc.
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
		//Calling the makeCSV function, and returns a string that we can pass into our parameters.
		newString = makeCSV(hash);
		return newString;
	}

	//Takes the object that is passed into it and converts to string comma separated values format. Returns a string of all colors in order of corresponding boxes.
	function makeCSV(allColors){
		var saveCSV = ""
		for (i in allColors){
			saveCSV = saveCSV + allColors[i] + ",";
		}
		return saveCSV;		
	}

	//Defining our addEventListeners.
	var mainBoxesClick = document.getElementById("painting");
	var palatteBoxesClick = document.getElementById("color_palette");
	var saveClick = document.getElementById("save_button");
	var selectedColor = "white";
	mainBoxesClick.addEventListener('click', getBoxID);
	palatteBoxesClick.addEventListener('click', selectColor);
	saveClick.addEventListener('click', sendBoxHashToServer);

});