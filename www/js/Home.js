
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
		console.log("device ready");
		}

    // device APIs are available
    //
    function onDeviceReady() {
		alert("device ready");
        
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
    }

    // Handle the pause event
    //
    function onPause() {

    }
	
	function onResume() {
		alert("resume");
    }
