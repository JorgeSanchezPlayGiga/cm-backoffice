$( document ).ready(function() {

    $('.modal').modal();

    $('.tooltipped').tooltip();

    $( ".catalog-versions .list .list-body" ).selectable();

    $('.catalog-versions .add .btn').click(function(event) {
        $('.modal.generate-catalog-modal').modal('open');
        event.preventDefault();
    });

    $('.generate-catalog-form .btn').click(function(event) {

        let data = {
            'catalogId': $('.catalog-filter select option:selected').val(),
            'description': $('.input-description').val()
        };
        console.log(data);
        let progressHtml = '<div class="progress">'
            + '<div class="indeterminate"></div>'
            +'</div>';

        $('.modal.default .modal-content').html(progressHtml);
        $('.modal.generate-catalog-modal').modal('close');
        $('.modal.default').modal('open');

        $.post( "http://localhost:20443/api/v1/catalogs-versions", data, function(response) {
            event.preventDefault();
            console.log(response);

            // Check if is the first catalog
            if ($('.catalog-versions .list').length == 0) {
                location.reload();

                return false;
            }

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

        }, "json").fail(function(response) {
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