<?php
$content = file_get_contents('php://input');
if($json = @json_decode($content))
{
    if(isset($json->url) && $json->url)
    {
        // Fetch URL and store data
        $data = file_get_contents($json->url);
        if($data)
        {
            echo $data;
        }
    }
}

return NULL;