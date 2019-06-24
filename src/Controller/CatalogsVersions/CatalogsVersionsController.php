<?php

namespace App\Controller\CatalogsVersions;


use App\Api\ApiClientFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class CatalogsVersionsController extends AbstractController
{
    public function index()
    {
        $apiClientFactory = new ApiClientFactory();
        $apiClient = $apiClientFactory->create();
        $uri = 'http://localhost:20443/api/v1/catalogs-versions?filter[catalogId]=28&sort=-createdAt';
        $apiClient->get($uri);

        return $this->render('CatalogsVersions/index.html.twig', [
            'catalogsVersions' => $apiClient->responseToArray()
        ]);
    }
}
