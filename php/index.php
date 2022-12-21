<?php
header('Access-Control-Allow-Origin: *');
if($_GET['access_token']){
    $myfile = fopen("access_token.txt", "w") or die("Unable to open file!");
    fwrite($myfile, $_GET['access_token']);
    fclose($myfile);
    print('Token has been stored');
}else {
    print("Access Token is invalid");
}


function getToken($code){

}
function Redirect($url, $permanent = false)
{
    header('Location: ' . $url, true, $permanent ? 301 : 302);

    exit();
}

?>
