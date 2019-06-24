$( document ).ready(function() {

    $('.modal').modal();

    $('.tooltipped').tooltip();

    $('.catalog-versions .add .btn').click(function() {
        let data = {
            'catalogId': 28,
            'description': 'I love you 3000.'
        };

        $.post( "http://localhost:20443/api/v1/catalogs-versions", data,  function(response) {
            // $( ".catalog-versions .modal .modal-content" ).html( data );
            console.log(response);
                $('.catalog-versions .list tbody').append(
                    '<tr>' +
                    '  <td>' + response.catalogVersionId + '</td>' +
                    '  <td>' + catalogVersion.createdAt + '</td>' +
                    '  <td>' + catalogVersion.catalogVersion + '</td>' +
                    '  <td>' + catalogVersion.controlSchemaVersion + '</td>' +
                    '  <td>' + catalogVersion.description + '</td>' +
                    '</tr>'
                );
            }, "json")
        .fail(function(data) {
            // Show alert
            M.toast({html: data.responseJSON.error})
        });
    })
});