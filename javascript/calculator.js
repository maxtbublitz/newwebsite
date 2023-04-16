helicopter = []; //Initially stores all helicopter makes
helicopterDataBase = []; //Reads from helicopter to seperate models into makes
var currentModel = 'Airbus Helicopters';

function checkNew(elm, arr1) { //check to see if there is a new make of helicopter
	if(arr1.length == 0){
		return true;
	}
	for(var i = 0; i < arr1.length; i++){
		if(elm == arr1[i]){
			return false;
		}
	}
	return true;
}

getData();

async function getData() {
	const response = await fetch('javascript/randomValues.txt'); //get csv file
	const data = await response.text();

	const rows = data.split('\r\n').slice(1); //read csv, delete header, check to see what newline charecters are in the file

	rows.forEach(elt => { //read each array to split further 
		const row = elt.split(',');
		const make = row[0];
		if(checkNew(make,helicopter)){
			helicopter.push(make);
		}
		var temp = new Object(); //Helicopter make, model, etc
		temp.name = row[1];
		temp.make = row[0];
		temp.burn = row[2];
		temp.phc = row[3]; // Per hour cost
		temp.auh = row[4]; // Annual utilization hours
		//console.log(temp.make);
		helicopterDataBase.push(temp);
	});
	displayMakeMenu ();
}

function displayMakeMenu(){ // Show list of helicopters
	var option = '<option value="'+'heliMake'+'">' + 'Make' + "</option>";
	for(var i =0; i < helicopter.length; i++){
		option += '<option value="'+helicopter[i]+'">' + helicopter[i] + "</option>";
	}
	document.getElementById('makeDropDown').innerHTML = option;
}

var listener = document.getElementById('makeDropDown');
listener.onchange = modelDisplay;

function modelDisplay(){ // Show models based on make 
	var option = '<option value="'+'heliModel'+'">' + 'Model' + "</option>";
	var make = document.getElementById('makeDropDown');
	var value = make.options[make.selectedIndex].value;
	for(let i = 0; i < helicopterDataBase.length; i++){
		var temp = helicopterDataBase[i].make;
		if(temp === value){
			//console.log(helicopterDataBase[i].name);
			option += '<option value="'+helicopterDataBase[i].name+'">' + helicopterDataBase[i].name + "</option>";
		}
		document.getElementById('modelDropDown').innerHTML = option;
	}
}

var listener2 = document.getElementById('roiSubmit');
listener2.onclick = ROI;

function ROI() {
	var flightHours = 0; //total cost per flight hour
	var hoistingHours = 0; //total hours hoisting per year
	var ROIx2 = 0;
	var ROIx3 = 0;
	var ROIx4 = 0;
	var name = document.getElementById('modelDropDown');
	var value = name.options[name.selectedIndex].value;

	for(let i = 0; i < helicopterDataBase.length; i++){
		var temp = helicopterDataBase[i].name;
		if(temp === value){//get values, including user input
			var heliName = helicopterDataBase[i].name;
			var heliBurn = (helicopterDataBase[i].burn);
			var heliPhc = (helicopterDataBase[i].phc);
			var heliAuh = (helicopterDataBase[i].auh);
			var heliFuel = document.getElementById('fuel').value;
			var hoists = document.getElementById('hoists').value;
			var hoistT = document.getElementById('hoistTime').value;

			//Get the values of cost per hour and total hours hoisting
			flightHours = heliPhc*(heliBurn*(heliFuel/6.7));
			hoistingHours = hoists*12*hoistT/60;

			var storeROIvalues = [];
			for(var j = 2; j < 5; j++){
				var temp = new Object();
				temp.fhs = (hoistingHours-(hoistingHours/j)).toFixed(2);
				temp.ocspy = (heliPhc*temp.fhs).toFixed(0); //operating cost savings per year
				temp.fcspy = ((heliFuel/6.7)*heliBurn*temp.fhs).toFixed(0); //fuel cost savings per year
				temp.tcspy = (parseInt(temp.ocspy) + parseInt(temp.fcspy)).toFixed(0); //total cost savings per year
				temp.ROI = (256800/temp.tcspy).toFixed(2);
				storeROIvalues.push(temp);
			}

			var fhs2x = document.getElementById('2xFh');
			fhs2x.textContent = storeROIvalues[0].fhs;
			var ocs2x = document.getElementById('2xOcs');
			ocs2x.textContent = storeROIvalues[0].ocspy;
			var fcs2x = document.getElementById('2xFcs');
			fcs2x.textContent = storeROIvalues[0].fcspy;
			var tcs2x = document.getElementById('2xTcs');
			tcs2x.textContent = storeROIvalues[0].tcspy;
			var pbp2x = document.getElementById('2xPbp');
			pbp2x.textContent = storeROIvalues[0].ROI;

			var fhs3x = document.getElementById('3xFh');
			fhs3x.textContent = storeROIvalues[1].fhs;
			var ocs3x = document.getElementById('3xOcs');
			ocs3x.textContent = storeROIvalues[1].ocspy;
			var fcs3x = document.getElementById('3xFcs');
			fcs3x.textContent = storeROIvalues[1].fcspy;
			var tcs3x = document.getElementById('3xTcs');
			tcs3x.textContent = storeROIvalues[1].tcspy;
			var pbp3x = document.getElementById('3xPbp');
			pbp3x.textContent = storeROIvalues[1].ROI;

			var fhs4x = document.getElementById('4xFh');
			fhs4x.textContent = storeROIvalues[2].fhs;
			var ocs4x = document.getElementById('4xOcs');
			ocs4x.textContent = storeROIvalues[2].ocspy;
			var fcs4x = document.getElementById('4xFcs');
			fcs4x.textContent = storeROIvalues[2].fcspy;
			var tcs4x = document.getElementById('4xTcs');
			tcs4x.textContent = storeROIvalues[2].tcspy;
			var pbp4x = document.getElementById('4xPbp');
			pbp4x.textContent = storeROIvalues[2].ROI;
		}
	}
}