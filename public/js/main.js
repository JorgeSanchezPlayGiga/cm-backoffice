$( document ).ready(function() {

    $('.modal').modal();

    $('.tooltipped').tooltip();

    $( ".catalog-versions .list .list-body" ).selectable();

    $('.catalog-versions .add .btn').click(function() {
        let data = {
            'catalogId': 28,
            'description': 'I love you 3000.'
        };

        let progressHtml = '<div class="progress">'
            + '<div class="indeterminate"></div>'
            +'</div>';
        $('.modal .modal-content').html(progressHtml);
        $('.modal').modal('open');

        $.post( "http://localhost:20443/api/v1/catalogs-versions", data,  function(response) {
            console.log(response);
            $('.catalog-versions .list .list-body').prepend(
                '<tr class="catalog-version" data-catalog-version-id="' + response.catalogVersionId + '">' +
                '  <td>' + response.catalogVersionId + '</td>' +
                '  <td>' + response.createdAt + '</td>' +
                '  <td>' + response.catalogVersion + '</td>' +
                '  <td>' + response.controlSchemaVersion + '</td>' +
                '  <td>' + response.description + '</td>' +
                '</tr>'
            );

            $( ".catalog-versions .list .list-body" ).selectable();

            $('.modal .modal-content')
                .html('<article class="card-panel green lighten-4">Catalog version has been created successfully.</article>');
        }, "json")
        .fail(function(response) {
            console.log(response);
            // Show alert
            $('.modal .modal-content')
                .html('<article class="card-panel red lighten-4">' + response.responseJSON.error + '</article>');
        });
    });

    // Select catalog
    $('.filters .catalog-filter select').change(function() {
        console.log('Select');
        let path = window.location.pathname + '?filters[catalogId]=' + $(this).val();
        console.log('Path: ' + path);
        window.location = path;
    });
});