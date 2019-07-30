$( document ).ready(function() {

    $('.modal').modal();

    $('.tooltipped').tooltip();

    $( ".catalog-versions .list .list-body" ).selectable();

    $('.catalog-versions .add .btn').click(function(event) {
        $('.modal.generate-catalog-modal').modal('open');
        event.preventDefault();
    });

    $('.generate-catalog-form .btn').click(function(event) {
        event.preventDefault();
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
            console.log('FAIL: ');
            console.log(response);
            // Show alert
            $('.modal .modal-content')
                .html('<article class="card-panel red lighten-4">' + response.responseJSON.error + '</article>');
        });
    });

    $('.modal.update-control-schemas-modal .btn').click(function(event) {
        console.log('Sending request to update control schema.');

        // Prevent event
        event.preventDefault();

        // Hidden modal to update control schema
        $('.modal.update-control-schemas-modal').modal('close');

        // Show modal with progress bar
        let progressHtml = '<div class="progress">'
            + '<div class="indeterminate"></div>'
            +'</div>';
        $('.modal.default .modal-content').html(progressHtml);
        $('.modal.default').modal('open');

        // Resquest to create catalog only with the control schemas updated
        let catalogVersionId = $('.modal.update-control-schemas-modal .input-catalog-version-id').val();
        let uri = 'http://localhost:20443/api/v1/catalogs-versions/' + catalogVersionId + '/control-schemas';
        console.log('Uri: ' + uri);

        //
        let requestData = {
            description: $('.modal.update-control-schemas-modal .input-description').val()
        };

        // Request to service
        $.ajax({
            url: uri ,
            type: 'put',
            data: requestData
        }).done(function (response) {
            console.log(response);
            //  Show message
            $('.modal .modal-content')
                .html('<article class="card-panel green lighten-4">Catalog version has been created successfully.</article>');

            // Add row to table with the new catalog version
            $('.catalog-versions .list .list-body').prepend(
                '<tr class="catalog-version" data-catalog-version-id="' + response.catalog_version_id + '">' +
                '  <td>' + response.catalog_version_id + '</td>' +
                '  <td>' + response.created_at + '</td>' +
                '  <td>' + response.catalog_version + '</td>' +
                '  <td>' + response.control_schema_version + '</td>' +
                '  <td>' + response.description + '</td>' +
                '</tr>'
            );

        }).fail(function (response) {
            // Close modal
            $('.modal.update-control-schemas-modal').modal('close');
            console.log('Ups! fail: ');
            console.log(response);

            // Show message
            $('.modal.default .modal-content')
                .html('<article class="card-panel red lighten-4"> ' + response.responseJSON.error + '</article>');
            $('.modal.default').modal('open');
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