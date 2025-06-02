<?php
$client = new Client();
$headers = [
  'Authorization' => 'Bearer t-g2065s91KXCNQRTJEK2CPZEG7FPDLQILEHOPFOUL'
];
$request = new Request('GET', 'https://open.larksuite.com/open-apis/event/v1/outbound_ip?page_size=10', $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();