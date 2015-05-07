    //After the page has loaded
    function onLoad() {
        //Add the device ready event
        document.addEventListener("deviceready", onDeviceReady, false);

        //Add a click event on the natParks div
        $("#natPark").click(function()
           {
            //Change the page
            window.location="NatParks.html"; 
           } );

        //Add a click event on the luxRes div
        $("#luxRes").click(function()
           {
            //Change the page
            window.location="LuxRes.html"; 
           } );
        }


    // device APIs are available
    //
    function onDeviceReady() {
        
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
    }

    // Handle the pause event
    //
    function onPause() {

    }
	
	function onResume() {
    }
