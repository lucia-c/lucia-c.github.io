$(document).ready(function() {

	//funzioni responsive in base al ridimensionamento ---------------------------------------------------------
	$(window).resize(function () {
		if ($(window).width() <= 800) {
			//$("nav").hide("slow");
			$("nav").animate({
				"left": "-270px"
			}, "slow");
			$('section').animate({
				"left": "10px"
			}, "slow");
			$('#intestazione').animate({
				"left": "0px"
			}, "slow");
			$('#tools').animate({
				"left": "0px"
			}, "slow");
		} else {
			//$("nav").show("slow");
			$("nav").animate({
				"left": "0px"
			}, "slow");
			$('section').animate({
				"left": "270px"
			}, "slow");
			$('#tools').animate({
				"left": "270px"
			}, "slow");
		}
	});

	$(window).resize(function () {
		if ($(window).width() <= 1000) {
			$("#intestazione").removeClass("hidden").css('left', '270px');
			$('section').css('top', '40px');
		} else {
			$("#intestazione").addClass("hidden");
			$('section').css('top', '0px');
		}
	});

	// ---------------------------------------------	FUNZIONI GLOBALI	----------------------------------------------	    
	
	var arrayLista = new Array();
	
	/*if (localStorage.user != undefined){
		arrayLista = JSON.parse(localStorage.user);
		for(var j=0; j<arrayLista.length; j++){
			for(var i=0; i<arrayListaCentrale.length; i++){
				$('#listaCentrale').html('<li>'+ arrayLista[j][i].nome) +'</li>');
			}
		}
	}*/

	function counter() {
		var arrayAttivita = new Array();
					for (i = 0; i < $('#listaCentrale li').length; i++) {
							arrayAttivita[i] = $('#listaCentrale li').eq(i);
					}
					$('#list li.selezione span.contatore').text(arrayAttivita.length);
	}
	
	function counterSvolte() {
		if($('#listaCompletate li').length==0){
			
						$('#svolte').addClass('hidden');
		}
		else{
			$('#svolte').removeClass('hidden');
		}
	}

	
	var nascosto = $('div#dettagli.nascosto');
	var marginRight = $('section');
	var toolsRight = $('#tools');

	function chiudiDettagli() {
		if (nascosto.hasClass('visible')) {
			nascosto.animate({
				"right": "-370px"
			}, "slow").removeClass('visible');
			marginRight.animate({
				"right": "10px"
			}, "slow");
			toolsRight.animate({
				"right": "0px"
			}, "slow");
		} else {
			nascosto.animate({
				"right": "0px"
			}, "slow").addClass('visible');
			marginRight.animate({
				"right": "355px"
			}, "slow");
			toolsRight.animate({
				"right": "355px"
			}, "slow");
		}
	}
	
	// inserire solo numeri all'interno di un input
	var editingKeys = {
	'8' : 'backspace',
	'46' : 'canc',
	'37' : 'leftarrow',
	'39' : 'rightarrow'
	};

	$('#ore, #minuti').bind('keydown', function(e) {
		var key = e.keyCode;
		var keynum = (key > 47) && (key < 58);
		var keypad = (key > 95) && (key < 106); // tastiera numerica
			if (!keynum && !keypad) {
				return (key in editingKeys);
			}
	});


    // ---------------------------------------------	FINE FUNZIONI GLOBALI	----------------------------------------------
	
//-------------------------------------------------- CONTROLLO LOGIN--------------------------------------------------
    
//all'invio del form
		$('form#login').submit(function(){

				//rimuovo la classe di errore ovunque essa sia
				$('*').removeClass('errore');

				//variabile responsabile dell'invio: se il suo valore è true c'è stato un errore e NON invio il form
				var errore = false;
				
				//regola 
				var regx = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
				//email
				var emailCamp = $(this).find("input[name='email']");
				if( regx.test(emailCamp.val()) == false ){
						errore = true;
						emailCamp.addClass('errore');
				}
				
				//se c'è un errore
				if(errore ==  true){
						alert('Compila i campi contrassegnati');
						//non invio il form
						return false;
				}
				else{
						//invia
						$(this).submit();
				}

		});
    
    //--------------------------------------------------------------FINE CONTROLLO LOGIN-----------------------------------

	//funzione che AGGIUNGE CATEGORIA -------------------------------------------------------------------------------------
	getItem();

	function getItem() {
		$('input#add').keydown(function (event) {
			if (event.keyCode == 13) {
				if ($(this).val().trim().length == 0) {
					alert("Per favore aggiungi un nome alla nuova categoria");
				} else {
					addItem();
					storage();
					return false;
				}
			}
		});
		$('img#iconAdd').click(function (event) {
			addItem();
			return false;
		});
	}

	function addItem() {
		arrayLista.push(new Array());
		$('ul#base li').clone(true).appendTo('#list').removeAttr("class");
		$('ul#list>li:last>span.item').text($('input#add').val());
		$('ul#list>li:last').attr('title', $('input#add').val());
		$('ul#list>li:last>span.item').removeClass('item');
		$('input#add').val("");
	}

	//funzione che AGGIUNGE ATTIVITÀ --------------------------------------------------------------------------------------
	getItemActivity();

	function getItemActivity() {
		$('input#addActivity').keydown(function (event) {
			if (event.keyCode == 13) {
				if ($(this).val().trim().length == 0) {
					alert("Non puoi inserire attività vuote!");
				} else {
					addItemActivity();
					storage();
					return false;
				}
			}
		});
	}

	//funzione che definisce l'oggetto e le sue proprietà ----------------------------------------------------------------
	var arraySecondarie = new Array();
	var arrayCommenti = new Array();
	function addItemActivity() {
		var nomeOgg = $('input#addActivity').val();
		var posizione = $('#listaCentrale li').length;		
		//comando che popola l'indice dell'array lista corrente con un oggetto attività con le sue varie proprietà
		arrayLista[indiceAttuale].push({"nome": nomeOgg, "posizione": posizione, "completato": false, "preferito": false, "scadenza": " ", "ripeti": "", "promemoriaData": " ", "promemoriaOra": " ", "promemoriaMinuti": " ", "attSecondaria": arraySecondarie, "note": " ", "file": " ", "commento": arrayCommenti });
		$('ul#attivitaBase li').clone(true).appendTo('#listaCentrale').removeClass('hidden');
		$('ul#listaCentrale>li:last > span.testoAttivita').text(nomeOgg);
		$('input#addActivity').val("");
		counter();
	}

	//effetto sfumato aggiungi attività------------------------------------------------------------------------------------
	$('#insertActivity').on('click',

	function () {
		$(this).css('box-shadow', '0px 1px 2px #ddd');
	});

	//funzione che VISUALIZZA CALENDARIO nell'input activity---------------------------------------------------------------   
	$('input#addActivity').on('click',

	function () {
		$('#calendario').removeClass('hidden');
		$(".ui-datepicker-trigger").removeClass("hidden");
	});

	$("input#calendario").datepicker({
		showOn: "button",
		buttonImage: "./img/calendar.png",
		buttonImageOnly: true
	}).next(".ui-datepicker-trigger").addClass("hidden");

	// funzione che CONTA ATTIVITÀ richiamata da una funzione globale -----------------------------------------------------
	counter();

	//funzione SELEZIONA CATEGORIA ----------------------------------------------------------------------------------------
	$(document.body).on('click', '#list li',

	function () {
		var titoloCategoria = $("span.title", this).text();
		$(this).toggleClass('selezione');
		$(this).siblings().removeClass('selezione');
		$('input#addActivity').attr('placeholder', "Aggiungi un'attività in " + titoloCategoria);
		$('#intestazione').html(titoloCategoria);
	});

	//funzione ELIMINA CATEGORIA ------------------------------------------------------------------------------------------
	$(document.body).on('click', '#remove, #iconRemove',

	function () {
		if ($('#list li').hasClass('selezione')) {
			var r = confirm("Sei sicuro di voler eliminare la categoria selezionata?");
			if (r == true) {
				$('li.selezione').remove();
				var cancellato = arrayLista.splice(indiceAttuale, 1)
			} else {
				x = "Categoria non eliminata";
				alert(x);
			}
		} else {
			alert("Non hai selezionato la categoria da eliminare!");
		}
		storage();
	});

	//funzione SPOSTA CATEGORIA--------------------------------------------------------------------------------------------
	$(function() {
		$( "#list" ).sortable({
			start: function(event, ui) { 
				console.log('start: ' + ui.item.index());
				var fromIndex = ui.item.index();
				var element = arrayLista[fromIndex];
				ui.item.data('element', element);
				ui.item.data('fromIndex', fromIndex);
			},
			update: function(event, ui) { 
				console.log('update: '+ ui.item.index());
				var toIndex = ui.item.index();
				arrayLista.splice(ui.item.data('fromIndex'), 1);
				arrayLista.splice(toIndex, 0, ui.item.data('element'));  
				console.log(arrayLista);                  
			}				
		});
		$( "#list" ).disableSelection();
	});

	//funzione SELEZIONE ATTIVITA -----------------------------------------------------------------------------------------
	$(document.body).on('click', 'section ul>li:not(#insertActivity)',

	function () {
		$(this).toggleClass('selezioneAtt');
		$(this).siblings().removeClass('selezioneAtt');
		var indiceOggetto = $('li.selezioneAtt').index();
		$('div#titleDettagli').html(arrayLista[indiceAttuale][indiceOggetto].nome);
	});


	$('section, nav').mouseup(

	function (e) {
		var container = $("#listaCentrale");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			if (nascosto.hasClass('visible')) {
				nascosto.animate({
					"right": "-370px"
				}, "slow").removeClass('visible');
				marginRight.animate({
					"right": "10px"
				}, "slow");
				toolsRight.animate({
					"right": "0px"
				}, "slow");
			}
			$('section ul#listaCentrale>li').removeClass('selezioneAtt');
		}

	});

	// interazione con i li CHECKED --------------------------------------------------------------------------------------
		$(document.body).on("click", "input[type='checkbox']", function () {
			
			if($(this).is(":checked")){
				
				var indice = $(this).parent().parent().index();
				arrayLista[indiceAttuale][indice].completato = true;
				$(this).parent().parent().appendTo('#listaCompletate');
				var salva = arrayLista[indiceAttuale][indice];
				arrayLista[indiceAttuale].splice(indice,1)
				arrayLista[indiceAttuale].push(salva)
				
				
				for ( var i = 0 ; i < 3; i++) {
					console.log(arrayLista[indiceAttuale][i]);
				}
			} else {
				
				var indice = parseInt($('#listaCentrale li').length);
				arrayLista[indiceAttuale][indice].completato = false
				$(this).parent().parent().appendTo('#listaCentrale');
				for(var i = 0; i<3; i++){
					console.log(arrayLista[indiceAttuale][i]);
				}
			}
		counter();
		counterSvolte();
		storage();
	});
	

	//funzione ELIMINA ATTIVITÀ -------------------------------------------------------------------------------------------
	$(document.body).on('click', '#removeActivity',

        function () {
            if ($('section ul>li').hasClass('selezioneAtt')) {
                var r = confirm("Sei sicuro di voler eliminare l'attività selezionata?");
                if (r == true) {
                    $('li.selezioneAtt').remove();
                } else {
                    x = "Categoria non eliminata";
                    alert(x);
                }
            } else {
                alert("Non hai selezionato alcuna attività!");
            }
            counter();
			counterSvolte();
            storage();
        });

	$('#removeActivityDettagli').on('click',

        function () {
            if ($('section ul>li').hasClass('selezioneAtt')) {
                var r = confirm("Sei sicuro di voler eliminare l'attività selezionata?");
                if (r == true) {
                    $('li.selezioneAtt').remove();
                } else {
                    x = "Categoria non eliminata";
                    alert(x);
                }
            } else {
                alert("Non hai selezionato alcuna attività!");
            }
            counter();
			counterSvolte();
            storage();
        });



	//funzione ASSOCIA ATTIVITÀ A CATEGORIA DI RIFERIMENTO ----------------------------------------------------------------
	  window.debugArrayLista = arrayLista;//mi permette di controllare l'array da console sul broswer
	var i = 0;
	var indiceAttuale = 0;
	for (i = 0; i < $('#list li').length; i++) {
		arrayLista[i] = new Array();
	}

	$(document.body).on('click', '#list li',

	function () {
		$('#listaCentrale').children().remove('#listaCentrale li');
		var indice = $('#list li').index(this);
		if (arrayLista[indice].length > 0) {
			for (var i = 0; i < arrayLista[indice].length; i++) {
				$('#listaCentrale').append('<li><div><input type="checkbox" name="attivita" value="1"/></div><span>' + arrayLista[indice][i].nome + '</span></li>');
			}
		}
		indiceAttuale = indice;
	});


	//funzione MOSTRA/NASCONDI DETTAGLI -----------------------------------------------------------------------------------
	var attCliccata = '';
		$(document.body).on('dblclick', 'section ul>li:not(#insertActivity)',

	function () {
				attCliccata = $(this).index();
				console.log(attCliccata);
		chiudiDettagli();
	});

	$(document.body).on('click', '#chiudi',

	function () {
		var nascosto = $('div#dettagli.nascosto');
		var marginRight = $('section');
		var toolsRight = $('#tools');
		if (nascosto.hasClass('visible')) {
			nascosto.animate({
				"right": "-370px"
			}, "slow").removeClass('visible');
			marginRight.animate({
				"right": "10px"
			}, "slow");
			toolsRight.animate({
				"right": "0px"
			}, "slow");
		} else {
			nascosto.animate({
				"right": "0px"
			}, "slow").addClass('visible');
			marginRight.animate({
				"right": "355px"
			}, "slow");
			toolsRight.animate({
				"right": "355px"
			}, "slow");
		}
	});

	//funzioni GESTIONE DETTAGLI ------------------------------------------------------------------------------------------
		$('#divScadenza button.conferma').on('click', function(){
			var scadenza = $('#calendarioDettagli').val();
			var ripeti = $('#ripeti').val();
			arrayLista[indiceAttuale][attCliccata].scadenza=scadenza;
			arrayLista[indiceAttuale][attCliccata].ripeti=ripeti;
			$('#divScadenza #calendarioDettagli, #divScadenza #ripeti, #divScadenza button ').addClass('hidden');
			$('#divScadenza').append('<p id="riassunto">Da fare entro il' + scadenza +'</p><p id="repeat">Ripeti: ' + ripeti +'</p>');
			storage();
		});
	
		$('#divScadenza button.cancella').on('click', function(){
			arrayLista[indiceAttuale][attCliccata].scadenza='';
			arrayLista[indiceAttuale][attCliccata].ripeti='';
			console.log(arrayLista[indiceAttuale][attCliccata]);
			storage();
		});
		
		$('div#promemoria button.conferma').on('click', function(){
			var promemoriaData = $('#calendarioRicorda').val();
			var promemoriaOra = $('#ore').val();
			var promemoriaMinuti = $('#minuti').val();
			arrayLista[indiceAttuale][attCliccata].promemoriaData=promemoriaData;
			arrayLista[indiceAttuale][attCliccata].promemoriaOra=promemoriaOra;
			arrayLista[indiceAttuale][attCliccata].promemoriaMinuti=promemoriaMinuti;
			$('#promemoria #calendarioRicorda, #promemoria #ora, #promemoria button ').addClass('hidden');
			$('#promemoria').append('<p id="oraProm">Ricordalo alle ' + promemoriaOra +':' + promemoriaMinuti + '</p><p id="giornoProm">del:  ' + promemoriaData +'</p>');
			storage();
		});
	
		$('div#promemoria button.cancella').on('click', function(){
			arrayLista[indiceAttuale][attCliccata].promemoriaData='';
			arrayLista[indiceAttuale][attCliccata].promemoriaOra='';
			arrayLista[indiceAttuale][attCliccata].promemoriaMinuti='';
			storage();
		});
		
		$('input#attSec').keydown(function (event) {
					if (event.keyCode == 13) {
							if ($(this).val().trim().length == 0) {
							alert("Non puoi inserire attività vuote!");
							} else {
							var nuovaAttSec = $('#attSec').val();
							$('#listaSecondarie').prepend('<p class="attivitaSec">' + nuovaAttSec +'</p>');							
							arraySecondarie.push(nuovaAttSec);
							arrayLista[indiceAttuale][attCliccata].attSecondaria = arraySecondarie;
							storage();
							return false;
							}
					}
			});
		
		$('div#bodyDettagli>textarea').focusout(function(){
			var note = $('#bodyDettagli>textarea').val();
			arrayLista[indiceAttuale][attCliccata].note=note;
			storage();
		});
	
		$('#addFile').click(function(){
			var file = $('div#file input').val();
			arrayLista[indiceAttuale][attCliccata].file=file;
			storage();
		})
	
		$('div#commenti input').keydown(function (event) {
			var commento = $('div#commenti input').val();
					if (event.keyCode == 13) {
							if ($(this).val().trim().length == 0) {
									alert("Inserisci un commento!");
							} else {
								$('#commenti').prepend('<p class="commentoUtente">' + commento +'</p>');	
								arrayCommenti.push(commento);
								arrayLista[indiceAttuale][attCliccata].commento = arrayCommenti;
								storage();
								return false;
							}
					}
			});

	//funzione per visualizzare inserimento date DETTAGLI con il click su calendario -------------------------------------------------------------------------------------		
		$('#iconaCalendario').on('click',
	function () {
		$('#divScadenza').children().remove('#divScadenza p#riassunto, #divScadenza p#repeat');
		$('#calendarioDettagli').datepicker().toggleClass('hidden').focus();
		$('#scadenza').addClass('hidden');
		$('#ripeti, #divScadenza>button.fontello').toggleClass('hidden');
	});

		$('#iconaSveglia').on('click',
	function () {
		$('#promemoria').children().remove('#promemoria p#oraProm, #promemoria p#giornoProm');
		$('.ricordamelo').addClass('hidden');
		$('#calendarioRicorda').datepicker().toggleClass('hidden').focus();
		$('div#promemoria>button.fontello').toggleClass('hidden');
		if ($('#ora').toggleClass('hidden') == true) {
			$('#ora').css('display', 'inline-block');
		}
	});

	// funzione mostra/nascondi NAV con il bottone ------------------------------------------------------------------------
	$('#mostraNav').on('click',

	function () {
		var nav = $('nav');
		var section = $('section');
		var tools = $('#tools');
		var intestazione = $('#intestazione');
		if (nav.hasClass('visible')) {
			nav.animate({
				"left": "-270px"
			}, "slow").removeClass('visible');
			section.animate({
				"left": "10px"
			}, "slow");
			intestazione.animate({
				"left": "0px"
			}, "slow");
			tools.animate({
				"left": "10px"
			}, "slow");
		} else {
			nav.animate({
				"left": "0px"
			}, "slow").addClass('visible');
			section.animate({
				"left": "270px"
			}, "slow");
			intestazione.animate({
				"left": "270px"
			}, "slow");
			tools.animate({
				"left": "270px"
			}, "slow");
		}
	});


    //animazione tools

    var stato = false;
    var ultimoClick = null;
    var animDiv = $(".slidingDiv");

    function populateMenu(title){
        if (title == "aggiungi amico") {
            animDiv.html
            ("<img src='img/list_small.png'><a href='#'>Aggiungi un amico</a>");
        } else if (title == "invia lista"){
            animDiv.html
            ("<img src='img/list_small.png'><a href='mailto: ?subject=your subject&body=your body'>Spedisci lista</a>");
        } else if (title == "stampa") {
            animDiv.html
            ("<img src='img/list_small.png'><a href='#' onClick='window.print();return false'>Stampa lista</a>");
        } else if (title == "ordine alfabetico"){
            animDiv.html
            ("<img src='img/list_small.png'><a href='#'>Ordine alfabetico</a>");
        }
    }

    function manageMenu(obj) {

        if (stato) {

            if ($(obj).attr("title") == ultimoClick) {
                animDiv.animate({height: "0"}, 200);
                stato = false;
                animDiv.html(" ");
            } else {
                ultimoClick = $(obj).attr("title");
                populateMenu($(obj).attr("title"));
            }

        } else {
            animDiv.animate({height: "35px"}, 300);
            stato = true;
            ultimoClick = $(obj).attr("title");
            populateMenu($(obj).attr("title"));
        }
    }

    $(".cliccabile").click(function(){
        manageMenu(this);
    });


	$('html').click(function() {
		animDiv.animate({height: "0"}, 200);
		stato = false;
		animDiv.html(" ");
	});

	$('.cliccabile').click(function(event){
		event.stopPropagation();
	});

    // creazione JSON ---------------------------------------------------------------------------------------

    //var user = $('#user').val();

    function storage(){
        localStorage.setItem('user', JSON.stringify(arrayLista));
    }
	
		$('#aggiorna').on('click', function(){
				var x = JSON.parse(localStorage.getItem('user'));
        		console.log(x);
		})
		

});
