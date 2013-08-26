$(document).ready(function() {

	var invalidMailError	= "Merci de renseigner une adresse email valide.";
	var duplicateMailError	= "Vous êtes déjà inscrit.";
	var systemError			= "Une erreur s'est produite. Merci de réessayer plus tard.";
	var successMessage		= "Merci de votre inscription ! Vous serez contacté par l'équipe projet de RESONANCES dans les jours à venir.";
	var allFieldsPlease     = "Merci de remplir tous les champs.";
	var pleaseWait          = "Veuillez patienter...<br><br><img src='loader.gif'>";
	
	$(".successBalloon").hide();
	$(".errorBalloon").hide();
	$(".resultText").hide();
	$(".loader").hide();
	$(".resultText").html("");
	
	$("#signup-email").change(function() {
        if ($("#signup-email").val() != "") {
            $ ("#label-email").fadeOut("slow");
        } else {
            $ ("#label-email").fadeIn("slow");
        }
    });
	
    $("#signup-name").change(function() {
        if ($("#signup-name").val() != "") {
            $ ("#label-name").fadeOut("slow");
        } else {
            $ ("#label-name").fadeIn("slow");
        }
    });
    
    $('form#ContactForm').bind('submit', function(e){
		$(".successBalloon").clearQueue().stop().fadeOut("fast");
		$(".errorBalloon").clearQueue().stop().fadeOut("fast");
		$(".loader").clearQueue().stop().fadeIn("fast");
		$(".resultText").html(pleaseWait).clearQueue().stop().fadeIn("fast");
		
		var email  = $('#signup-email').val();
		var name   = $('#signup-name').val();
		var type   = $('#signup-type option:selected').val();
        e.preventDefault();
		
		$.ajax({
			type: 'POST',
			url: 'subscribe.php?email='+email+'&nom='+name+'&type='+type,
			data: '',
			success: function(theResponse){
				$(".resultText").fadeIn("slow");
				
				if (theResponse == 1) {
				    $(".errorBalloon").hide();
				    $(".loader").hide();
					$(".successBalloon").fadeIn("slow");
					$(".successBalloon").animate({opacity: 1.0}, 8000);
					$(".successBalloon").fadeOut(1500);
					$(".resultText").hide().html(successMessage).fadeIn("slow");
                	$(".resultText").animate({opacity: 1.0}, 8000);
    				$(".resultText").fadeOut(1500);

				}
				if (theResponse == 2) {
				    $(".successBalloon").hide();
                    $(".loader").hide();
					$(".errorBalloon").fadeIn("slow");
					$(".resultText").hide().html(invalidMailError).fadeIn("slow");
					$(".errorBalloon").animate({opacity: 1.0}, 3000);
                    $(".resultText").animate({opacity: 1.0}, 3000);
					$(".errorBalloon").fadeOut(1500);
                    $(".resultText").fadeOut(1500);
				}
				if (theResponse == 3) {
				    $(".successBalloon").hide();
                    $(".loader").hide();
					$(".errorBalloon").fadeIn("slow");
					$(".resultText").hide().html(duplicateMailError).fadeIn("slow");
					$(".errorBalloon").animate({opacity: 1.0}, 3000);
                    $(".resultText").animate({opacity: 1.0}, 3000);
					$(".errorBalloon").fadeOut(1500);
                    $(".resultText").fadeOut(1500);
				}
				if (theResponse == 4) {
				    $(".successBalloon").hide();
                    $(".loader").hide();
					$(".errorBalloon").fadeIn("slow");
					$(".resultText").hide().html(allFieldsPlease).fadeIn("fast");
					$(".errorBalloon").animate({opacity: 1.0}, 3000);
                    $(".resultText").animate({opacity: 1.0}, 3000);
					$(".errorBalloon").fadeOut(1500);
                    $(".resultText").fadeOut(1500);
				}
			},
			error: function(){
			    $(".successBalloon").hide();
                $(".loader").hide();
				$(".errorBalloon").fadeIn("slow");
				$(".resultText").hide().html(systemError).fadeIn("fast");
				$(".errorBalloon").animate({opacity: 1.0}, 3000);
				$(".resultText").animate({opacity: 1.0}, 3000);
				$(".errorBalloon").fadeOut(1500);
                $(".resultText").fadeOut(1500);
			}		
		});
	});
			
});
