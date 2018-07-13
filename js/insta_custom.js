$(document).ready(function() {
    var userFeed = new Instafeed({
        get: 'user',
        userId: '7368480115',
        limit: 12,
        resolution: 'standard_resolution',
        accessToken: '7368480115.1677ed0.2da014ecac69405887217e9e7d048abd',
        sortBy: 'most-recent',
        template: '<div class="col-lg-4 instaimg"><a href="{{link}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></a></div>'
    });
    userFeed.run();
    
    //creating a single gallery form
    $('.gallery').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
});
