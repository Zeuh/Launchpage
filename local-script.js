$(document).ready(function() {

	var invalidMailError	= "Merci de renseigner une adresse email valide.";
	var duplicateMailError	= "Vous êtes déjà inscrit.";
	var systemError			= "Une erreur s'est produite. Merci de réessayer plus tard.";
	var successMessage		= "Merci de votre inscription ! Vous serez contacté par l'équipe projet de RESONANCES dans les jours à venir.";
	var allFieldsPlease     = "Merci de remplir tous les champs.";
	
	$(".successBalloon").hide();
	$(".errorBalloon").hide();
	$(".resultText").hide();
	$(".loader").hide();
	
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
		$(".successBalloon").hide();
		$(".errorBalloon").hide();
		$(".resultText").hide();
		$(".loader").show();
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
					$(".successBalloon").fadeIn("slow");
					$(".successBalloon").animate({opacity: 1.0}, 8000);
					$(".successBalloon").fadeOut(1500);
					$(".resultText").html(successMessage);
                	$(".resultText").animate({opacity: 1.0}, 8000);
    				$(".resultText").fadeOut(1500);

				}
				if (theResponse == 2) {
					$(".errorBalloon").fadeIn("slow");
					$(".errorBalloon").animate({opacity: 1.0}, 3000);
					$(".errorBalloon").fadeOut(1500);
					$(".resultText").html(invalidMailError);
                    $(".resultText").animate({opacity: 1.0}, 3000);
                    $(".resultText").fadeOut(1500);
				}
				if (theResponse == 3) {
					$(".errorBalloon").fadeIn("slow");
					$(".errorBalloon").animate({opacity: 1.0}, 3000);
					$(".errorBalloon").fadeOut(1500);
					$(".resultText").html(duplicateMailError);
                    $(".resultText").animate({opacity: 1.0}, 3000);
                    $(".resultText").fadeOut(1500);
				}
				if (theResponse == 4) {
					$(".errorBalloon").fadeIn("slow");
					$(".errorBalloon").animate({opacity: 1.0}, 3000);
					$(".errorBalloon").fadeOut(1500);
					$(".resultText").html(allFieldsPlease);
                    $(".resultText").animate({opacity: 1.0}, 3000);
                    $(".resultText").fadeOut(1500);
				}

				$(".loader").hide();
			},
			error: function(){
				$(".errorBalloon").fadeIn("slow");
				$(".errorBalloon").animate({opacity: 1.0}, 3000);
				$(".errorBalloon").fadeOut(1500);
				$(".resultText").html(systemError);
				$(".loader").hide();
			}		
		});
	});
			
});
