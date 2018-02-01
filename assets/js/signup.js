
var sending = false;
$('#submitButton').click(function(){
    if(!sending){

        var formInfo = {
            equipment: [],
            goals: []
        };

        var submit = true;
        var top = -1;

        if($('#nameInput').val() === ""){
            $('#nameInput').css("border-color", "red");
            submit = false;
            if(top === -1){ top = ($('#contactInfo').offset().top); }
        } else { formInfo.name = $('#nameInput').val(); }

        if($('#emailInput').val() === ""){
            $('#emailInput').css("border-color", "red");
            submit = false;
            if(top === -1){ top = ($('#contactInfo').offset().top); }
        } else { formInfo.email = $('#emailInput').val(); }

        // if($('#phoneInput').val() === ""){
        //     $('#phoneInput').css("border-color", "red");
        //     submit = false;
        //     if(top === -1){ top = ($('#contactInfo').offset().top); }
        // } else { formInfo.phone = $('#phoneInput').val(); }

        if($('#phoneInput').val() !== ""){ formInfo.phone = $('#phoneInput').val(); }
        if($('#streetInput').val() !== ""){ formInfo.street = $('#streetInput').val(); }
        if($('#cityInput').val() !== ""){ formInfo.city = $('#cityInput').val(); }
        if($('#stateInput').val() !== ""){ formInfo.state = $('#stateInput').val(); }
        if($('#zipcodeInput').val() !== ""){ formInfo.zipcode = $('#zipcodeInput').val(); }

        if($("input[name='goals']:checked").length === 0){
            $('#goalsTitle').css("color", "red");
            submit = false;
            if(top === -1){ top = ($('#goalsInfo').offset().top); }
        } else {
            $("input[name='goals']:checked").each(function(){
                formInfo.goals.push($(this).val());
            });
        }

        if($("input[name='equipment']:checked").length === 0){
            $('#equipTitle').css("color", "red");
            submit = false;
            if(top === -1){ top = ($('#currentInfo').offset().top); }
        } else {
            $("input[name='equipment']:checked").each(function(){
                formInfo.equipment.push($(this).val());
            });
        }

        if($('#dietText').val() === ""){
            $('#dietText').css("border-color", "red");
            submit = false;
            if(top === -1){ top = ($('#currentInfo').offset().top); }
        } else { formInfo.diet = $('#dietText').val(); }

        if($('#injuryText').val() === ""){
            $('#injuryText').css("border-color", "red");
            submit = false;
            if(top === -1){ top = ($('#currentInfo').offset().top); }
        } else { formInfo.injury = $('#injuryText').val(); }

        if($('#frequencyText').val() === ""){
            $('#frequencyText').css("border-color", "red");
            submit = false;
            if(top === -1){ top = ($('#currentInfo').offset().top); }
        } else { formInfo.frequency = $('#frequencyText').val(); }


        if($('#additionalText').val() !== ""){ formInfo.additionalText = $('#additionalText').val(); }

        if($("input[type='radio']:checked").length === 0){
            $('#commitTitle').css("color", "red");
            submit = false;
        } else {
            $("input[type='radio']:checked").each(function(){
                formInfo.commitment = ($(this).val());
            });
        }



        if(!submit){
            $('html,body').animate({
                scrollTop: top - 85},
                800);
        } else {
            sending = true;
            $('#submitButton').css("background-color", "#7c7c7c");
            $('#submitButton h4').fadeOut(300, function(){
                $('#submitButton').css("padding", "7.5px 55.5px");
                $('.loader').fadeIn(300, function(){
                    $('#submitButton').delay(2000).queue(function (next) {
                        $(this).css("background-color", "#02d150").dequeue();
                        $('.loader').fadeOut(300, function(){
                            $('body').css("overflow", "hidden");
                            $('.wrapper').fadeIn(300, function(){
                                $('#formConfirmation').delay(1000).fadeOut(1, function(){
                                    $('#formConfirmation').fadeIn(200)
                                    $('section').css("filter", "blur(2px)");
                                })

                            });
                        });
                        next();
                      });

                });
            });


            var jsonInput = JSON.stringify(formInfo);

              $.ajax({
                    url: "https://coltfitness.herokuapp.com/submitform",
                    dataType: 'text',
                    contentType: 'application/json',
                    type: 'POST',
                    data: jsonInput,
                    success: function( data, textStatus, jQxhr ){
                        console.log( "DONE", jsonInput );
                    },
                    error: function( jqXhr, textStatus, errorThrown ){
                        console.log( "ERROR", errorThrown );
                    }
                });
        }
    }

});

$("input").mousedown(function(){
    $(this).css("border-color", "lightgrey")
});

$("textarea").mousedown(function(){
    $(this).css("border-color", "lightgrey")
});

$("input[name='goals']").change(function(){
    $('#goalsTitle').css("color", "#555");
});

$("input[name='equipment']").change(function(){
    $('#equipTitle').css("color", "#555");
});

$("input[type='radio']").change(function(){
    $('#commitTitle').css("color", "#555");
})
