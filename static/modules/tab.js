
$('.tab-list').on( 'click', '.tab', function(){
    $('.tab-list .tab').removeClass('active');
    $('.code-editor').css('display', 'none');
    $('.editor-' + $(this).addClass('active').attr('data-id')).show();
});

var documentCounter = 0;

module.exports = function( id ){
    if ( id ) {
        wz.fs( id, function (err, doc) {
            var tab = $('<li class="tab" data-id="' + documentCounter + '">' + doc.name + '</li>').appendTo( $('.tab-list') ).click();
            documentCounter += 1;
        });
    }
};
