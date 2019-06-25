<?php

namespace App\Controller\CatalogsVersions;


use App\Api\ApiClientFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;


class CatalogsVersionsController extends AbstractController
{
    public function index(Request $request)
    {
        $apiClientFactory = new ApiClientFactory();
        $apiClient = $apiClientFactory->create();

        // Get catalogs
        $uri = 'http://localhost:20443/api/v1/cms/catalogs';
        $apiClient->get($uri);
        $catalogs = $apiClient->responseToArray();

        // Load catalogs versions for catalog
        $catalogsVersions = [];
        $catalogId = null;
        $filters = $request->query->get('filters');
        if ( ! empty($filters)) {
            $catalogId = $filters['catalogId'];
            $uri = 'http://localhost:20443/api/v1/catalogs-versions?filter[catalogId]=' . $catalogId . '&sort=-createdAt';
            $apiClient->get($uri);
            if ($apiClient->getStatusCode() === 200) {
                $catalogsVersions = $apiClient->responseToArray();
            }
        }

        return $this->render('CatalogsVersions/index.html.twig', [
            'catalogs' => $catalogs,
            'catalogId' => $catalogId,
            'catalogsVersions' => $catalogsVersions
        ]);
    }
}
