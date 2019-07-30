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
                }).fail(function(response) {
                    console.log(response);
                    console.log(response.responseJSON.error);

                    $('.modal.default .modal-content')
                        .html('<article class="card-panel red lighten-4"> ' + response.responseJSON.error + '</article>');
                    $('.modal.default').modal('open');
                });
            } else if (key == 'show-dump') {
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log(catalogVersionId);
                $.get('http://localhost:20443/api/v1/catalogs-versions/' + catalogVersionId + '/dump', function(data) {
                    console.log(data);
                    $('.viewer .text').val(JSON.stringify(data, null, 4));
                }).fail(function(response) {
                    console.log(response);
                    console.log(response.responseJSON.error);

                    $('.modal.default .modal-content')
                        .html('<article class="card-panel red lighten-4"> ' + response.responseJSON.error + '</article>');
                    $('.modal.default').modal('open');
                });
            } else if (key == 'delete') {
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log(catalogVersionId);
                if (confirm('Are you sure?')) {

                    let progressHtml = '<div class="progress">'
                             + '<div class="indeterminate"></div>'
                         +'</div>';
                    $('.modal.default .modal-content').html(progressHtml);
                    $('.modal.default').modal('open');

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
                        $('.modal.default .modal-content')
                            .html('<article class="card-panel red lighten-4"> ' + response.responseJSON.error + '</article>');
                        $('.modal.default').modal('open');
                    });
                }
            } else if (key == 'compare') {
                let catalogsVersionsIds = [];
                $('.catalog-version.ui-selected').each(function() {
                    let catalogVersionId = $(this).attr('data-catalog-version-id');
                    catalogsVersionsIds.push(catalogVersionId);
                });

                if (catalogsVersionsIds.length !== 2) {
                    $('.modal.default .modal-content')
                        .html('<article class="card-panel red lighten-4">You need select two catalogs version.</article>');
                    $('.modal.default').modal('open');
                    return ;
                }
                let uri = 'http://localhost:20443/api/v1/catalogs-versions/compare';
                console.log('Uri: ' + uri);
                console.log(catalogsVersionsIds);
                let postData = {
                    firstCatalogVersionId: catalogsVersionsIds[1],
                    secondCatalogVersionId: catalogsVersionsIds[0]
                }

                $.post(uri, postData, function(response) {
                    console.log(response);
                    $('.viewer .text').val(JSON.stringify(response, null, 4));
                });

            } else if (key == 'update-control-schema') {
                console.log('Execute: update-control-schema');

                // Get identifier for selected catalog version
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log('catalogVersionId:');
                console.log(catalogVersionId);


                // Get identifier for last catalog version
                let lastCatalogVersionId = $('.catalog-versions .list .list-body .catalog-version:first').attr('data-catalog-version-id');

                // Check if they are the same
                if (catalogVersionId != lastCatalogVersionId) {
                    // they are not the same. Show message.
                    $('.modal.default .modal-content')
                        .html('<article class="card-panel red lighten-4">' +
                            'Catalog version must be the last catalog version created for this catalog.' +
                        '</article>');
                    $('.modal.default').modal('open');

                    return ;
                }

                // Save identifier of catalog version into input of the form
                $('.modal.update-control-schemas-modal .input-catalog-version-id').val(catalogVersionId);

                // Show form
                $('.modal.update-control-schemas-modal').modal('open');
            }
        },
        items: {
            "show-schema": {name: "Show schema", icon: "fa-certificate"},
            "show-dump": {name: "Show dump", icon: "fa-database"},
            "update-control-schema": {name: "Update control schemas", icon: "fa-beer"},
            "delete": {name: "Delete", icon: "delete"},
            "compare": {name: "Compare", icon: "fa-balance-scale"},
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