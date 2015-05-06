
function onLoad(){
$(".natParks").click(function(event)
{
	window.location = "Pictures.html";
	window.sessionStorage.setItem("place",event.target.innerText);

	var data=$('#'+event.target.id).data(event.target.id);

	var pos = {"lat":data.lat,"lng":data.lng};

    window.sessionStorage.setItem("position",JSON.stringify(pos));
});
$('#Sort').change(function(){
    alert($('#Sort').val());
  })
}