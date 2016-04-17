var affichage = document.getElementById("affichage");
var score = 0;

var multiplicateurFeu = document.getElementById("multiplicateurFeu");
var nbMultiplicateurFeu = 1;
var multiplicateurEau = document.getElementById("multiplicateurEau");
var nbMultiplicateurEau = 1;
var multiplicateurPlante = document.getElementById("multiplicateurPlante");
var nbMultiplicateurPlante = 1;

var autoclick = document.getElementById("autoclick");
var nbAutoclick = 0;


//-------------------------------------------------------------------------------------------------------------------------------
//Défilement des nuages
	$('.bxslider').bxSlider({
	    minSlides: 1,
	    maxSlides: 1,
	    slideWidth: 1920,
	    slideMargin: 0, // sans bordure
	    ticker: true,
	    speed: 150000
	});

//-------------------------------------------------------------------------------------------------------------------------------
//Chargement aléatoire du pokemon sauvage

	//Global
		var randomNumber;
		var myPix = new Array("img/001b.png","img/002b.png","img/003b.png","img/004b.png","img/005b.png","img/006b.png","img/007b.png","img/008b.png","img/009b.png","img/150b.png","img/152b.png","img/155b.png","img/158b.png","img/252b.png","img/255b.png","img/258b.png");
		window.onload = randomNumber = choosePic();

		function choosePic() {
			var randomNum = Math.floor((Math.random() * myPix.length));
			document.getElementById("pkmnSauvage").src = myPix[randomNum];
			return randomNum;
		}

	//Nom du pokemon sauvage
		var myName = new Array("Bulbizarre","Herbizarre","Florizarre","Salameche","Reptincel","Dracaufeu","Carapuce","Carabaffe","Tortank","Mewtwo","Germignon","Héricendre","Kaiminus","Arko","Poussifeu","Gobou");

		function afficherPokemon() {
			document.getElementById("afficherPokemon").innerHTML = myName[randomNumber];
		}


//-------------------------------------------------------------------------------------------------------------------------------
//Fonction pokeballClic et expérience exp
	
	//Ecouteur clic sur pokeball
		element = document.getElementById("pokeballClic");
		element.addEventListener("click", pokeballClicFunction);
    
	//Afficher expérience + cf pokeballClicFunction
    	function afficherScore() {
			affichage.innerHTML = "Exp " + score;
		}


//-------------------------------------------------------------------------------------------------------------------------------
//Barre de progression

	//Diminution de la barre inclue évolution du score
		function pokeballClicFunction() {
			score += nbMultiplicateurFeu + nbMultiplicateurEau + nbMultiplicateurPlante;
			afficherScore();

			var myBar = document.getElementById("myBar");   
			var width = 100;
			
		    if (randomNumber == 0 || randomNumber == 3 || randomNumber == 6 || randomNumber == 10 || randomNumber == 11 || randomNumber == 12 || randomNumber == 13 || randomNumber == 14 || randomNumber == 15) { //1ère évolution
		    	width = width - 0.01 * score;
		    } else if (randomNumber == 1 || randomNumber == 4 || randomNumber == 7) { //2nd évolution
		    	width = width - 0.001 * score;
		    } else if (randomNumber == 2 || randomNumber == 5 || randomNumber == 8) { //3ème évolution
		    	width = width - 0.0001 * score;
		    } else {
		    	width = width - 0.00001 * score;
		    }
		    myBar.style.width = width + '%';

		    if (width <= 50 && width > 20) { //Changement couleur vert -> orange
		    	myBar.classList.remove("back-vert");
		    	myBar.classList.add("back-orange");
		    } else if (width <= 20) { //Changement couleur orange -> rouge
		    	myBar.classList.remove("back-orange");
		    	myBar.classList.add("back-rouge");	
		    }
		}


//-------------------------------------------------------------------------------------------------------------------------------
//Achat de tous les multiplicateurs et autoclicks

	//Définir type du pokemon sauvage
		//001b 002b 003b = type plante
			function plante() {
				nbMultiplicateurFeu = nbMultiplicateurFeu + 1;
				nbMultiplicateurEau = nbMultiplicateurEau - 0.5;
				afficherNbMultiplicateurFeu();
				afficherNbMultiplicateurEau();
			}
		//004b 005b 006b = type feu
			function feu() {
				nbMultiplicateurEau = nbMultiplicateurEau + 1;
				nbMultiplicateurPlante = nbMultiplicateurPlante - 0.5;
				afficherNbMultiplicateurEau();
				afficherNbMultiplicateurPlante();
			}
		//007b 008b 009b = type eau
			function eau() {
				nbMultiplicateurPlante = nbMultiplicateurPlante + 1;
				nbMultiplicateurFeu = nbMultiplicateurFeu - 0.5;
				afficherNbMultiplicateurPlante();
				afficherNbMultiplicateurFeu();
			}
		//150b = mewtwo
			function mewtwo() {
				nbMultiplicateurPlante = nbMultiplicateurPlante - 0.5;
				nbMultiplicateurFeu = nbMultiplicateurFeu - 0.5;
				nbMultiplicateurEau = nbMultiplicateurEau - 0.5;
				afficherNbMultiplicateurPlante();
				afficherNbMultiplicateurFeu();
				afficherNbMultiplicateurEau();
			}

			if (randomNumber < 3 || randomNumber == 10 || randomNumber == 13) {
				plante();
			} else if (3 <= randomNumber && randomNumber < 6 || randomNumber == 11 || randomNumber == 14) {
				feu();
			} else if (6 <= randomNumber && randomNumber < 9 || randomNumber == 12 || randomNumber == 15) {
				eau();
			} else {
				mewtwo();
			}

			
	//Achat Multiplicateurs

		//Multiplicateur feu (x2 plante, x0.5 eau)
			function afficherNbMultiplicateurFeu() {
				multiplicateurFeu.innerHTML = "Attaque de type feu x" + nbMultiplicateurFeu + " (score à atteindre : " + prixFeu() + ")";
			}

			function prixFeu() {
				return 100 * nbMultiplicateurFeu * nbMultiplicateurEau / nbMultiplicateurPlante;
			}

			function acheterMultiplicateurFeu() {
				if (score >= prixFeu()) {
					score = score - prixFeu();
					nbMultiplicateurFeu = nbMultiplicateurFeu * 2;
					afficherNbMultiplicateurFeu();
					afficherNbMultiplicateurEau();
					afficherNbMultiplicateurPlante();
					afficherScore();
				} else {
					alert("Vous ne pouvez pas lancer cette attaque !");
				}
			}

		//Multiplicateur eau (x2 feu, x0.5 plante)
			function afficherNbMultiplicateurEau() {
				multiplicateurEau.innerHTML = "Attaque de type eau x" + nbMultiplicateurEau + " (score à atteindre : " + prixEau() + ")";
			}

			function prixEau() {
				return 100 * nbMultiplicateurEau * nbMultiplicateurPlante / nbMultiplicateurFeu;
			}

			function acheterMultiplicateurEau() {
				if (score >= prixEau()) {
					score = score - prixEau();
					nbMultiplicateurEau = nbMultiplicateurEau * 2;
					afficherNbMultiplicateurFeu();
					afficherNbMultiplicateurEau();
					afficherNbMultiplicateurPlante();
					afficherScore();
				} else {
					alert("Vous ne pouvez pas lancer cette attaque !");
				}
			}

		//Multiplicateur plante (x2 eau, x0.5 feu)
			function afficherNbMultiplicateurPlante() {
				multiplicateurPlante.innerHTML = "Attaque de type plante x" + nbMultiplicateurPlante + " (score à atteindre : " + prixPlante() + ")";
			}

			function prixPlante() {
				return 100 * nbMultiplicateurPlante * nbMultiplicateurFeu / nbMultiplicateurEau;
			}

			function acheterMultiplicateurPlante() {
				if (score >= prixPlante()) {
					score = score - prixPlante();
					nbMultiplicateurPlante = nbMultiplicateurPlante * 2;
					afficherNbMultiplicateurFeu();
					afficherNbMultiplicateurEau();
					afficherNbMultiplicateurPlante();
					afficherScore();
				} else {
					alert("Vous ne pouvez pas lancer cette attaque !");
				}
			}


	//Achat Autoclick = attaque normal x1 sans influence du type
		function afficherNbAutoclick() {
			autoclick.innerHTML = "Attaque normal continue " + nbAutoclick + " (score à atteindre : " + prixAutoclick() + ")";
		}

		function prixAutoclick() {
			return 2000 * (nbAutoclick * nbAutoclick + 1);
		}

		var myVar

		function acheterAutoclick() {
			if (score >= prixAutoclick()) {
				score = score - prixAutoclick();
				nbAutoclick = nbAutoclick + 1;
				afficherNbAutoclick();
				afficherScore();
				myVar = setInterval(addClic, 1000);
			} else {
				alert("Vous n'avez pas assez d'expérience !");
			}
		}
		
		function addClic() {
			score = score + nbMultiplicateurFeu + nbMultiplicateurEau + nbMultiplicateurPlante;
			afficherScore();
		}


//-------------------------------------------------------------------------------------------------------------------------------
//Gestion musiques
	
	//Musique combat
		
	//Musique ambience et victoire aléatoire

	//Boutons
		function play(idPlayer, control) {
		    var player = document.querySelector('#' + idPlayer);
			
		    if (player.paused) {
		        player.play();
		        control.textContent = 'Pause';
		    } else {
		        player.pause();	
		        control.textContent = 'Play';
		    }
		}

		function resume(idPlayer) {
		    var player = document.querySelector('#' + idPlayer);
			
		    player.currentTime = 0;
		    player.pause();
		}

	//Option volume
		function volume(idPlayer, vol) {
		    var player = document.querySelector('#' + idPlayer);
			
		    player.volume = vol;	
		}

	//Barre de progression
		function update(player) {
		    var duration = player.duration;    // Durée totale
		    var time     = player.currentTime; // Temps écoulé
		    var fraction = time / duration;
		    var percent  = Math.ceil(fraction * 100);

		    var progress = document.querySelector('#progressBar');
			
		    progress.style.width = percent + '%';
		    progress.textContent = percent + '%';
		}



afficherPokemon();
afficherScore();

multiplicateurFeu.onclick = acheterMultiplicateurFeu;
afficherNbMultiplicateurFeu();
multiplicateurEau.onclick = acheterMultiplicateurEau;
afficherNbMultiplicateurEau();
multiplicateurPlante.onclick = acheterMultiplicateurPlante;
afficherNbMultiplicateurPlante();

autoclick.onclick = acheterAutoclick;
afficherNbAutoclick();