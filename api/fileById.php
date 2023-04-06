<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

putenv('GOOGLE_APPLICATION_CREDENTIALS=/client_secret_10431894352-fabqe9s4hirpe4hiou6464gt646mnf27.apps.googleusercontent.com.json');
error_reporting(E_ERROR | E_PARSE);
require __DIR__ . '/vendor/autoload.php';
include_once "templates/base.php";

use Google\Client;
use Google\Service\Drive;

/**
 * Returns an authorized API client.
 * @return Client the authorized client object
 */
$folderId = "1KYiJN84-uQ-U2s-zvsvcGRFaKEPlKzlk";
$fileId = "1qdLBs2B87uOT2wUKvMIiY9rCIW1kfn5O";
 function Redirect($url, $permanent = false)
{
    header('Location: ' . $url, true, $permanent ? 301 : 302);
    exit();
}

function getClient()
{
    $client = new Client();
    $application_creds = __DIR__ . '/draw-roulette-34eca53fb3ef.json';
    $client->setApplicationName('Google Drive API PHP');
    $client->setScopes('https://www.googleapis.com/auth/drive');
    $client->setAuthConfig($application_creds);
    
    return $client;
}

$client = getClient();
$service = new Drive($client);

$file = $service->files->get($fileId);
$fileData  = array(
        "name" => $file->getName(),
        "id" => $file->getId(),
        "thumbnailLink" => $file->getThumbnailLink(),
        "webViewLink" => $file->getWebViewLink(),
        // "url" => $file
);
print(json_encode($fileData));
