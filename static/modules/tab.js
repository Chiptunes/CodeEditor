
$('.tab-list').on( 'click', '.tab', function(){
    $('.tab-list .tab').removeClass('active');
    $('.code-editor').css('display', 'none');
    $('.editor-' + $(this).addClass('active').attr('data-id')).show();
});

var documentCounter = 0;
var TAB_ELEMENT ='<li class="tab"></li>'

module.exports = function( id ){

    if ( id ) {
        wz.fs( id, function (err, doc) {
            var tab = $( TAB_ELEMENT )
            tab.attr('data-id', documentCounter)
                .text(doc.name + '    ')
                .append('<span class="close-button">x</span>');

            tab.find('span').on('click', function (e) {

                var tab = $(this).parent();

                if (tab.hasClass('active')) {

                    tab.removeClass('active');
                    $('.code-editor').css('display', 'none');

                    if (tab.prev().length) {
                        $('.editor-' + tab.prev().addClass('active').attr('data-id')).show();
                    } else if (tab.next().length) {
                        $('.editor-' + tab.next().addClass('active').attr('data-id')).show();
                    }

                }

                tab.remove();
                $('.editor-' + tab.attr('data-id')).remove();
            });

            tab.appendTo( $('.tab-list') ).click();
            documentCounter += 1;
        });
    }

};
