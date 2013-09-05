$(document).ready(function() {

	var invalidMailError	= "Merci de renseigner une adresse email valide.";
	var duplicateMailError	= "Vous êtes déjà inscrit.";
	var systemError			= "Une erreur s'est produite. Merci de réessayer plus tard.";
	var successMessage		= "Merci de votre inscription ! Vous serez contacté par l'équipe projet de RESONANCES dans les jours à venir.";
	var allFieldsPlease     = "Merci de remplir tous les champs.";
	var pleaseWait          = "Veuillez patienter...<br><br><img src='loader.gif'>";
	
	$(".resultText").hide();
	$(".resultText").html("");
	$(".message").hide();
	
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
		$(".message").removeClass("successBalloon errorBalloon").addClass("loader");
		$(".message").clearQueue().stop().fadeIn("fast");
		$(".resultText").html(pleaseWait).clearQueue().stop().fadeIn("fast");
		
		var email  = $('#signup-email').val();
		var name   = $('#signup-name').val();
		var type   = $('#signup-type option:selected').val();
        e.preventDefault();
		
		$.ajax({
			type: 'POST',
			url: 'subscribe-lf.php?email='+email+'&nom='+name+'&type='+type,
			data: '',
			success: function(theResponse){
				$(".resultText").fadeIn("slow");
				
				if (theResponse == 1) {
				    $(".message").clearQueue().stop().hide();
					$(".message").removeClass("loader").addClass("successBalloon");
					$(".message").fadeIn("fast").animate({opacity: 1.0}, 8000).fadeOut(1500);
					$(".resultText").html(successMessage).fadeIn("fast").animate({opacity: 1.0}, 8000).fadeOut(1500);

				}
				if (theResponse == 2) {
				    $(".message").clearQueue().stop().hide();
					$(".message").removeClass("loader").addClass("errorBalloon");
					$(".message").fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
					$(".resultText").html(invalidMailError).fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
				}
				if (theResponse == 3) {
				    $(".message").clearQueue().stop().hide();
					$(".message").removeClass("loader").addClass("errorBalloon");
					$(".message").fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
					$(".resultText").html(duplicateMailError).fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
				}
				if (theResponse == 4) {
					$(".message").clearQueue().stop().hide();
					$(".message").removeClass("loader").addClass("errorBalloon");
					$(".message").fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
					$(".resultText").html(allFieldsPlease).fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
				}
				if (theResponse == -1) {
									$(".message").clearQueue().stop().hide();
					$(".message").removeClass("loader").addClass("errorBalloon");
					$(".message").fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
					$(".resultText").html(systemError).fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
                }
			},
			error: function(){
					$(".message").clearQueue().stop().hide();
					$(".message").removeClass("loader").addClass("errorBalloon");
					$(".message").fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
					$(".resultText").html(systemError).fadeIn("fast").animate({opacity: 1.0}, 3000).fadeOut("slow");
			}		
		});
	});
			
});
