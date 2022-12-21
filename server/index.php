<?php
putenv('GOOGLE_APPLICATION_CREDENTIALS=/client_secret_10431894352-fabqe9s4hirpe4hiou6464gt646mnf27.apps.googleusercontent.com.json');

require __DIR__ . '/vendor/autoload.php';
include_once "templates/base.php";

use Google\Client;
// use Google\Service\Drive;

/**
 * Returns an authorized API client.
 * @return Client the authorized client object
 */

 function Redirect($url, $permanent = false)
{
    header('Location: ' . $url, true, $permanent ? 301 : 302);
    exit();
}

function getClient($hasCode)
{
    print('gettingClient()');
    $client = new Client();

    if ($credentials_file = checkServiceAccountCredentialsFile()) {
        // set the location manually
        $client->setAuthConfig($credentials_file);
    } elseif (getenv('GOOGLE_APPLICATION_CREDENTIALS')) {
        $client->useApplicationDefaultCredentials();
    } else {
        echo missingServiceAccountDetailsWarning();
        return;
    }
    
    $redirectUri = "http://localhost:8000";
    $client->setApplicationName('Google Drive API PHP Quickstart');
    $client->setScopes('https://www.googleapis.com/auth/drive.metadata.readonly');
    $client->setPrompt('consent');
    $client->setApiFormatV2(false);
    $client->setAuthConfig('client_secret_10431894352-fabqe9s4hirpe4hiou6464gt646mnf27.apps.googleusercontent.com.json');
    $client->setRedirectUri($redirectUri);
    $client->setAccessType('offline');
    $api_url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:8000&prompt=consent&response_type=code&client_id=10431894352-fabqe9s4hirpe4hiou6464gt646mnf27.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive&access_type=offline";
    
    $tokenPath = 'token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    try{
      
        if ($client->isAccessTokenExpired()) {
            // Refresh the token if possible, else fetch a new one.
            if ($client->getRefreshToken()) {
                $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            } else {
                // Request authorization from the user.
                // $authUrl = $client->createAuthUrl();
                // printf("Open the following link in your browser:\n%s\n", $authUrl);
                // print 'Enter verification code: ';
                // $authCode = trim(fgets(STDIN));
                // Exchange authorization code for an access token.
                if(!$hasCode){
                    Redirect($api_url, true);
                }
                $authCode = $_GET['code'];
                print('Recieved code from callback');
                print($authCode);
                $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
                $client->setAccessToken($accessToken);
                // Check to see if there was an error.
                print('Saving new token');
                if (array_key_exists('error', $accessToken)) {
                    throw new Exception(join(', ', $accessToken));
                }
            }
            // Save the token to a file.
            if (!file_exists(dirname($tokenPath))) {
                print('saving token to specific location');
                mkdir(dirname($tokenPath), 0700, true);
            }
            file_put_contents($tokenPath, json_encode($client->getAccessToken()));
            print("Access token saved succssfully");
        }
    }
    catch(Exception $e) {
        // TODO(developer) - handle error appropriately
        echo '\r\n Some error occured: '.$e->getMessage();
    }
    return $client;
}


// Get the API client and construct the service object.
if($_GET['code']){
    print('<p>Managing Callback response</p>');
    $client = getClient(true);
}else {
    $client = getClient(false);
    print('<p>Returning Old Token</p>');
}
print('<p>Process completed</p>');
// print('<p>Ready for google drive api</p>');

// $service = new Drive($client);
// print('Got Error');
// // Print the names and IDs for up to 10 files.
// $optParams = array(
//     'pageSize' => 10,
//     'fields' => 'nextPageToken, files(id, name)'
// );
// $results = $service->files->listFiles($optParams);

// if (count($results->getFiles()) == 0) {
//     print "No files found.\n";
// } else {
//     print "Files:\n";
//     foreach ($results->getFiles() as $file) {
//         printf("%s (%s)\n", $file->getName(), $file->getId());
//     }
// }
// [END drive_quickstart]