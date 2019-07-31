# CM Backoffice

## Description
This project could be back office platform to manage catalogs in a future.
Currently, only catalog versions can be managed.

## Install

You need clone repository into your favourite folder and then install it with composer.

````
composer install
````   

## Execute server
This project is developed with Symfony 4 then you can use the server of Symfony and no vhost for apache/nginx is necessary:

```
php bin\console server:run 0.0.0.0:8000
```

## Catalog versions

### Overview

This section manage catalogs versions for catalogs. You can select a catalog and then you can:

* Generate new version.
* See catalog version list.
* Show json schema for a catalog version.
* Show a dump (sql) for a catalog version.
* Update control schemas for the last catalog version.
* Delete a catalog version.
* Compare two catalog versions.

### Access
You can access to:
````
http://localhost:8000/catalogs-versions
````