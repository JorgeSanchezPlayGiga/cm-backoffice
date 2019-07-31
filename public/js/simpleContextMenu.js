$(function() {
    $.contextMenu({
        selector: '.catalog-version',
        callback: function(key, options) {
            if (key == 'show-schema') {
                // Show preloader
                $('.modal.preloader').modal('open');

                // Request to fetch schema
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log(catalogVersionId);
                $.get('http://localhost:20443/api/v1/catalogs-versions/' + catalogVersionId + '/schema', function(data) {
                    console.log(data);
                    // Hidden modal preloader
                    $('.modal.preloader').modal('close');

                    // Show json schema
                    $('.modal.viewer .text').val(JSON.stringify(data, null, 4));
                    $('.modal.viewer').modal('open');
                }).fail(function(response) {
                    console.log(response);
                    console.log(response.responseJSON.error);

                    // Hidden modal preloader
                    $('.modal.preloader').modal('close');

                    // Show modal error
                    $('.modal.message.error .message').html(response.responseJSON.error);
                    $('.modal.message.error').modal('open');
                });
            } else if (key == 'show-dump') {
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log(catalogVersionId);

                // Show preloader
                $('.modal.preloader').modal('open');
                $.get('http://localhost:20443/api/v1/catalogs-versions/' + catalogVersionId + '/dump', function(data) {
                    console.log(data);
                    // Hidden modal preloader
                    $('.modal.preloader').modal('close');

                    // Show json schema
                    $('.modal.viewer .text').val(JSON.stringify(data, null, 4));
                    $('.modal.viewer').modal('open');
                }).fail(function(response) {
                    console.log(response);
                    console.log(response.responseJSON.error);

                    // Hidden modal preloader
                    $('.modal.preloader').modal('close');

                    // Show modal error
                    $('.modal.message.error .message').html(response.responseJSON.error);
                    $('.modal.message.error').modal('open');
                });
            } else if (key == 'delete') {
                let catalogVersionId = $(this).attr('data-catalog-version-id');
                console.log(catalogVersionId);
                if (confirm('Are you sure?')) {
                    let uri = 'http://localhost:20443/api/v1/catalogs-versions/' + catalogVersionId;
                    console.log('Uri: ' + uri);

                    // Show preloader
                    $('.modal.preloader').modal('open');
                    $.ajax({
                        url: uri ,
                        type: 'delete'
                    }).done(function (response) {
                        console.log(response);
                        // Remove catalog version from table
                        $('.catalog-version[data-catalog-version-id="' + catalogVersionId + '"]').remove();

                        // Hidden modal preloader
                        $('.modal.preloader').modal('close');

                        // Show json schema
                        let message = 'Catalog version has been deleted successfully.';
                        $('.modal.message.success .message').html(message);
                        $('.modal.message.success').modal('open');
                    }).fail(function (response) {
                        console.log(response);
                        // Hidden modal preloader
                        $('.modal.preloader').modal('close');

                        // Show modal error
                        $('.modal.message.error .message').html(response.responseJSON.error);
                        $('.modal.message.error').modal('open');
                    });
                }
            } else if (key == 'compare') {
                let catalogsVersionsIds = [];
                $('.catalog-version.ui-selected').each(function() {
                    let catalogVersionId = $(this).attr('data-catalog-version-id');
                    catalogsVersionsIds.push(catalogVersionId);
                });

                if (catalogsVersionsIds.length !== 2) {
                    let message = 'You need select two catalogs version.';
                    // Show modal error
                    $('.modal.message.error .message').html(message);
                    $('.modal.message.error').modal('open');
                    return ;
                }
                let uri = 'http://localhost:20443/api/v1/catalogs-versions/compare';
                console.log('Uri: ' + uri);
                console.log(catalogsVersionsIds);
                let postData = {
                    firstCatalogVersionId: catalogsVersionsIds[1],
                    secondCatalogVersionId: catalogsVersionsIds[0]
                }

                // Show preloader
                $('.modal.preloader').modal('open');
                $.post(uri, postData, function(response) {
                    console.log(response);
                    // Hidden modal preloader
                    $('.modal.preloader').modal('close');

                    $('.modal.viewer .text').val(JSON.stringify(response, null, 4));
                    $('.modal.viewer').modal('open');
                }).fail(function(response) {
                    console.log(response);
                    // Hidden modal preloader
                    $('.modal.preloader').modal('close');

                    // Show modal error
                    $('.modal.message.error .message').html(response.responseJSON.error);
                    $('.modal.message.error').modal('open');
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
                    let message = 'Catalog version must be the last catalog version created for this catalog.';
                    // Hidden modal preloader
                    $('.modal.preloader').modal('close');

                    // Show modal error
                    $('.modal.message.error .message').html(message);
                    $('.modal.message.error').modal('open');

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