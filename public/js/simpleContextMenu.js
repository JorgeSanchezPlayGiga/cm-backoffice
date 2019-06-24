$(function() {
    $.contextMenu({
        selector: '.catalog-version',
        callback: function(key, options) {
            // var m = "clicked: " + key;
            // console.log(key);
            // window.console && console.log(m) || alert(m);
            if (key == 'show-schema') {
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log(catalogVersionId);
                $.get('http://localhost:20443/api/v1/catalogs-versions/' + catalogVersionId + '/schema', function(data) {
                    console.log(data);
                    $('.viewer .text').val(JSON.stringify(data, null, 4));
                });
            } else if (key == 'show-dump') {
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log(catalogVersionId);
                $.get('http://localhost:20443/api/v1/catalogs-versions/' + catalogVersionId + '/dump', function(data) {
                    console.log(data);
                    $('.viewer .text').val(JSON.stringify(data, null, 4));
                });
            } else if (key == 'delete') {
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log(catalogVersionId);
                if (confirm('Are you sure?')) {

                    let progressHtml = '<div class="progress">'
                             + '<div class="indeterminate"></div>'
                         +'</div>';
                    $('.modal .modal-content').html(progressHtml);
                    $('.modal').modal('open');

                    let uri = 'http://localhost:20443/api/v1/catalogs-versions/' + catalogVersionId;
                    console.log('Uri: ' + uri);
                    $.ajax({
                        url: uri ,
                        type: 'delete'
                    }).done(function (response) {
                        console.log(response);
                        $('.catalog-version[data-catalog-version-id="' + catalogVersionId + '"]').remove();
                        $('.modal .modal-content')
                            .html('<article class="card-panel green lighten-4">Catalog version has been deleted successfully.</article>');
                    }).fail(function (response) {
                        console.log(response);
                        $('.modal .modal-content')
                            .html('<article class="card-panel red lighten-4"> ' + response.responseJSON.error + '</article>');
                    });
                }
            }
        },
        items: {
            "show-schema": {name: "Show schema", icon: "context-menu-icon-loading"},
            "show-dump": {name: "Show dump", icon: "context-menu-icon-loading"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function() {
                    return 'context-menu-icon context-menu-icon-quit';
            }}
        }
    });

    $('.context-menu').on('click', function(e){
        console.log('clicked', this);
    })
});