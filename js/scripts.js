function init(){
	console.log('We\'re alive baby!');

}
init();

$(function(){ 
	$('.arrow-down').on('click', function(){
		$('html, body').animate({
			scrollTop: $('#eli5').offset().top
		}, 900);
	}) 
});

