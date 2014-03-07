<?php
class calendario {				

				public $mese = 3;
				public $giorno = 0;
				public $anno = 0;
				public $meseTxt = '';

				public $time = 0;

				private $mesi = array("01"=>"Gennaio","02"=>"Febbraio","03"=>"Marzo","04"=>"Aprile","05"=>"Maggio","06"=>"Giugno","07"=>"Luglio","08"=>"Agosto","09"=>"Settembre","10"=>"Ottobre","11"=>"Novembre","12"=>"Dicembre");
				private $week = array("Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica");
				private $margini = array("420px", "0px", "70px", "140px", "210px", "280px", "350px");

				public function getPrevMonthYear() {
					$mese = $this->mese;
					$anno = $this->anno;
					if ($mese > 1) {
						$mese --;
					} else {
						$mese = 12;
						$anno --;
					}
					return array($mese, $anno);
				}
				public function getNextMonthYear() {
					$mese = $this->mese;
					$anno = $this->anno;
					if ($mese < 12) {
						$mese ++;
					} else {
						$mese = 1;
						$anno ++;
					}
					return array($mese, $anno);
				}

				public function __construct($g='', $m='', $a='') { // definisco le variabili con i miei dati
					if ($g == '') {
						$this->giorno = date("d"); 
					} else {
						$this->giorno = $g;
					}					
					if ($m == '') {
						$this->mese = date("m"); 
					} else {
						$this->mese = $m;
					}
					if ($a == '') {
						$this->anno = date("Y"); 
					} else {
						$this->anno = $a;
					}
					$i = str_pad($this->mese, 2, '0', STR_PAD_LEFT);
					$this->meseTxt = $this->mesi[$i];
					$this->time = mktime(0,0,0,$this->mese,$this->giorno,$this->anno);
				}


				public static function timeZone() { //funzione statica, la richiamo con calendario::timeZone()
					date_default_timezone_set("Europe/Rome");
				}

				public function totGiorni(){
					return date("t",$this-> time);
				}

				public function startWeek(){
					$timeGiorno1 = mktime(0,0,0,$this->mese,1,$this->anno);
					return date("w",$this->time);
				}

				public function makeUp(){
					$write="";
					$prev = $this->getPrevMonthYear();
					$next = $this->getNextMonthYear();
					$write .= '<div class="nav"><a id="indietro" href="index.php?mese='.$prev[0].'&anno='.$prev[1].'">&#xE800;</a>'. $this->meseTxt .' '.$this->anno. '<a id="avanti" href="index.php?mese='.$next[0].'&anno='.$next[1].'">&#xE801;</a></div>';					
					foreach ($this->week as $value) {
						$write.='<div class="week">'.$value."</div>";
					}

					$giorni = $this->totGiorni();
					$margine = $this->margini[$this->startWeek()];
					$write.='<div class="giorno" style="margin-left:'.$margine.'">1</div>';
					for ($n = 2; $n <= $giorni; $n++ ) {
						$write.='<div class="giorno">'.$n."</div>";
					}	
					return $write;	
				}

			}

    // $mese = $_GET['mese'];
    // $anno = $_GET['anno'];
	// $cal = new calendario('1', $mese, $anno);
	// $write = $cal->makeUp();
	

?>