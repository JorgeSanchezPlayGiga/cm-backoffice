<?php

namespace App\Api;


use GuzzleHttp\Client;

class ApiClientImplementation implements ApiClient
{
    private $httpClient;
    private $uriFactory;
    private $uri;
    private $response;

    public function __construct(UriFactory $uriFactory, Client $httpClient)
    {
        $this->uriFactory = $uriFactory;
        $this->httpClient = $httpClient;
    }

    public function get(string $uriPath)
    {
        $this->createUri($uriPath);
        $this->request('GET');
    }

    public function post(string $uriPath, array $data)
    {
        $this->createUri($uriPath);
        $this->request('POST', $data);
    }

    public function put(string $uriPath, array $data)
    {
        $this->createUri($uriPath);
        $this->request('PUT', $data);
    }

    public function delete(string $uriPath, array $data = null)
    {
        $this->createUri($uriPath);
        $this->request('DELETE', $data);
    }

    private function createUri(string $uriPath)
    {
        $this->uri = $this->uriFactory->create($uriPath);
    }

    protected function request(string $method = 'GET', array $data = null)
    {
        $options = [];
        if ( ! empty($data)) {
            $options = [
                'json' => $data
            ];
        }

        $this->response = $this->httpClient->request(
            $method,
            $this->uri->toString(),
            $options
        );
    }

    public function getStatusCode(): int
    {
        return $this->response->getStatusCode();
    }

    public function responseToArray(): array
    {
        $body = $this->response->getBody();
        $data = json_decode($body, true);

        return $data;
    }
}