<?php
include ('function.php');

if(isset($_GET['mese']) && isset($_GET['anno'])){
	$mese = $_GET['mese'];
	$anno = $_GET['anno'];
} else {
	$mese = date("m");
	$anno = date("Y");
}

$cal = new calendario('1', $mese, $anno);
$write = $cal->makeUp();

$html = file_get_contents('calend.html');
$html = str_replace('$write;', $write, $html);
echo $html;
?>