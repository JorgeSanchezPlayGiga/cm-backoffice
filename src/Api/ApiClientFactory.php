<?php

namespace App\Api;


use GuzzleHttp\Client;

class ApiClientFactory
{
    public function create(): ApiClient
    {
        $uriFactory = new UriFactory();
        $httpClient = new Client(['http_errors' => false]);

        return new ApiClientImplementation($uriFactory, $httpClient);
    }
}