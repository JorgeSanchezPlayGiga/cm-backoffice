<?php

namespace App\Api;


class UriFactory
{
    public function create($uri): Uri
    {
        return new UriImplementation($uri);
    }
}