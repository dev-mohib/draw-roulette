<?php
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
 function Redirect($url, $permanent = false)
{
    header('Location: ' . $url, true, $permanent ? 301 : 302);
    exit();
}

function getClient()
{
    $client = new Client();
    $application_creds = __DIR__ . '/draw-roulette-34eca53fb3ef.json';
    $client->setApplicationName('Google Drive API PHP Quickstart');
    $client->setScopes('https://www.googleapis.com/auth/drive');
    $client->setAuthConfig($application_creds);
    
    return $client;
}

$client = getClient();
$service = new Drive($client);

// print('<p>Ready for google drive api</p>');
$optParams = array(
    'pageSize' => 100,
    'fields' => "files(id,name,thumbnailLink,webViewLink)",
    'q' => "'".$folderId."' in parents"
    );
$result = $service->files->listFiles($optParams);
// $object = (object) array_filter((array) $result);
$files = array();
if(count($result->getFiles()) == 0){
    print([]);
}else {
    foreach($result->getFiles() as $file){
        // print($file->getName().'<br>');
        $obj = array(
            "name" => $file->getName(),
            "id" => $file->getId(),
            "thumbnailLink" => $file->getThumbnailLink(),
            "webViewLink" => $file->getWebViewLink()
        );
        array_push($files, $obj);
    }
    print(json_encode($files));
}