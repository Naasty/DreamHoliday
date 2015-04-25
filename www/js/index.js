var paused_count =0;
var resumed_count = 0;
var launched_count = 0;
var pet = "Timic";
var ani = 5;
var soic = "Viteza";
var nr = 1;
var bubu = "Bubu"

    function onLoad() {
		
        document.addEventListener("deviceready", onDeviceReady, false);
		console.log("device ready");
		window.localStorage.setItem( bubu, pet );
		pet = window.localStorage.getItem(bubu);
		var text = '{ "chocbar" : [' +
'{ "name":"Energy (Kcal)" , "value":"560 g" },' +
'{ "name":"Carbohydrate" , "value":"53,5 g" },' +
'{ "name":"Total Fat" , "value":"35,5 g" } ]}';
var obj = JSON.parse(text);
alert(obj.chocbar[1].name + " " + obj.chocbar[1].value);}

	
	function updateDisplay() {
		$("#launched").text("Application launched: " + launched_count);
		$("#resumed").text("Application paused: " + paused_count);
		$("#paused").text("Application resumed: " + resumed_count);
	}


    // device APIs are available
    //
    function onDeviceReady() {
		alert("device ready");
        
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
		alert(pet);
		
		
		launched_count++;
		updateDisplay();
    }

    // Handle the pause event
    //
    function onPause() {
		alert("pause");
		paused_count++;
		updateDisplay();
    }
	
	function onResume() {
		alert("resume");
		resumed_count++;
		updateDisplay();
    }
