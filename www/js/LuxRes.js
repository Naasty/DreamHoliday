
function onLoad(){
$(".luxRes").click(function(event)
{
	//window.location = event.target.id;
	window.location = "Pictures.html";
	window.sessionStorage.setItem("place",event.target.innerText);
	window.sessionStorage.setItem("site",event.target.id);
	var pos =$('#'+event.target.id).data('location');
	window.sessionStorage.setItem("position",pos);
    var testOne = $('#locations').data('locations');
console.log(testOne);
$('#locations').append('<p>This works: ' + testOne[4].url + '</p>');
});
}