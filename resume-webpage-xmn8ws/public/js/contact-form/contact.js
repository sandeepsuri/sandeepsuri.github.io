$('#send_message').click(function(event) {
    if (event) {
        event.preventDefault()
    }
    var visitor = {
        name: $('#contact-name').val(),
        email: $('#contact-email').val(),
        message: $('#contact-message').val()
    }
    

    $.ajax({
        url: '/api/subscriber',
        type: 'POST',
        data: visitor,
        success: function(response){
            $('.alert').show()
        },
        error: function(response){
            console.err("Error in sending form") 
        },
    })
})