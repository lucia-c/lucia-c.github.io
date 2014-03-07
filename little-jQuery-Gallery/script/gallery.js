$(document).ready(
function() {
	var i = 0;
	$('#contenitore>div').fadeOut(0);
	$('#contenitore>div').eq(i).fadeIn(1000);
	var anim = false;
	var intervallo = 0;

	$('#seg').click(
		function() {
			i++;
			var num = i % $('#contenitore>div').length
			$('#contenitore>div').eq(num).siblings().fadeOut();
			$('#contenitore>div').eq(num).fadeIn(1000)
			//window.clearInterval(intervallo);
		}
	);

	$('#prec').click(
		function() {
			if(i == 0){
				i = $('#contenitore>div').length;
			}
			i--;

			var num = i % $('#contenitore>div').length
			$('#contenitore>div').eq(num).siblings().fadeOut();
			$('#contenitore>div').eq(num).fadeIn(1000)		
		}
	);
			
	$('#play').click(
		function () {
			if (anim == true) {
				window.clearInterval(intervallo);
				$('#play').attr('style', 'background-image: url("img/play.png");');
				anim = false;	
			} else {
				$('#play').css('background-image', 'url("img/stop.png")');
				intervallo = setInterval (
					function() {
						i++;
						var num = i % $('#contenitore>div').length
						$('#contenitore>div').eq(num).siblings().fadeOut();
						$('#contenitore>div').eq(num).fadeIn(1000)
						anim = true;													
					},
				2000);
			}			
		}
	);
		
});