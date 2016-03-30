var async = require('../bower_components/async/dist/async.js');

var tabMang = require('./tabBar.js');
var editor  = require('./document.js');

var ITEM_HTML  = '<article class="sidebar-item"><span class="sidebar-name"></span><section class="sidebar-children"></section></article>';
var ITEM_LIST  = '<tr class="path-list-item"><td></td></tr>';

var generateTree = function( selector, elements ){

    var item;

    async.map(elements, function( current, callback ) {

        item = $( ITEM_HTML );
        item.find('span').text( current.name );

        if ( !current.type ) {

            item.find('section').attr('id', current.name.replace(' ', ''));

            item.children('span')
                .on('click', function (e) {
                    if ($(this).next().is(':visible')) {
                        $(this).next().css('display', 'none');
                    } else {
                        $(this).next().css('display', 'block');
                    }
                });

                item.children('span').on('contextmenu', function () {

                    var menu = wz.menu();

                    menu.addOption('Create File', function () {

                        wz.fs.saveFile( current.id, { name : 'newFile' }, function ( err, destiny, userName, replace ) {

                            if (err) {

                                console.log('Handle cancell needed');

                            } else {

                                wz.fs.create({
                                    name : userName,
                                    destiny : destiny,
                                    extension : userName.split('.')[1],
                                    data : ''
                                }, function ( err, data ) {

                                    wz.fs( current.id, function (err, nodeList) {
                                        nodeList.list( function (err, list) {
                                            $('#' + current.name.replace(' ', '')).children().remove();
                                            generateTree( current.name.replace(' ', ''), list );
                                        });
                                    });

                                });

                            }

                        });

                    });

                    menu.addOption('Create Folder', function () {

                        wz.fs( current.id, function (err, fsnode) {

                            var nameWin = wz.app.createView( null, {
                                animation : true,
                                type      : 'writeName',
                                width     : 500
                            });

                            nameWin.find('.cancel-file-name').on('click', function () {
                                nameWin.remove();
                            });

                            nameWin.find('.accept-file-name').on('click', function () {

                                fsnode.createDirectory(nameWin.find('#file-name').val(), function (err, newFSnode) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        generateTree(current.name.replace(' ', ''), [ newFSnode ]);
                                        nameWin.remove();
                                    }
                                });

                            });

                        });

                    });

                    menu.addOption('Delete Folder', function () {

                        wz.fs(current.id, function (err, fsnode) {
                            console.log( err, fsnode );
                            if (!err) {
                                fsnode.remove(function (err) {
                                    if (!err) {
                                        $('#' + current.name.replace(' ', '')).parent().remove();
                                    }
                                });
                            }

                        });

                    });

                    menu.render();

                });

            $('#' + selector).append( item );

            wz.fs( current.id, function (err, nodeList) {
                nodeList.list( function (err, list) {
                    generateTree( current.name.replace(' ', ''), list );
                });
            });

        } else {
            item.attr('id', current.id);

            item
                .on('click', function (e) {
                    tabMang.appendDocument( $(this).attr('id') );
                    editor( $(this).attr('id'), function () {});
                })
                .on('contextmenu', function (e) {
                    var menu = wz.menu();
                    var file = $(this);

                    menu.addOption('Delete file', function () {
                        file.remove();
                        wz.fs(file.attr('id'), function (error, fsnode) {
                            fsnode.remove( function( error, quota ) {});
                        });
                    });

                    menu.render();
                });

            $('#' + selector).append( item );
        }

        callback(null);

      }, function( err, result ) {});

};

module.exports = function( selector ){

    var sidebar   = $( '#' + selector );
    var item = $(ITEM_HTML);
    item.find('span')
      .text('Add Project...')
      .addClass('add-project');

    item.on('click', function (e) {

        $(this).remove();
        wz.fs('root', function (err, nodeList) {

            var listWin = wz.app.createView( null, {
              animation : true,
              type      : 'list',
              width     : 500
            });

            nodeList.list( function( err, list ){

              var listElem = listWin.find('.path-table');
              var path;

              for( var i = 0; i < list.length; i++ ) {

                  if ( !list[i].type ) {

                      path = $(ITEM_LIST);

                      path.find('td').text(list[i].name);
                      path.data('folder', list[i] );

                      path.on('click', function (e) {
                          generateTree(selector, [ $(this).data('folder') ] );
                      });

                      listElem.append(path);

                  }

              }

            });

        });

  });

  sidebar.append(item);

};
