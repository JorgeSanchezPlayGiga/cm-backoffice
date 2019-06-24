<?php

namespace App\Api;


class UriImplementation implements Uri
{
    private $uri;

    public function __construct(string $uri)
    {
        $this->uri = $uri;
    }

    public function toString()
    {
        return $this->uri;
    }

}