"use strict"

const compteur = document.getElementById("compteur");
const soucoupe = document.getElementById("soucoupe");
const cercle = document.getElementById("cercle-curseur");
const piece = document.getElementById("piece");
const boucle= setInterval(tracker, 20); //installe un intervalle qui appelle la fonction tracker toutes les 0.020 sec

let point = 0; // initialisé à 0
let sourisX = 0; 
let sourisY = 0;
let x = 0;
let y = 0;
let jeuActif = false; //initialisé à false
let vitesse = 0.05;

placerPiece();


function placerPiece(){
  piece.style.left = Math.random() *(window.innerWidth - 100)+ "px";   // place la pièce à un endroit aléatoire avec Math.random
  piece.style.top = Math.random() * (window.innerHeight- 100)+ "px";   //pour la verticale
//on enlève 100 px sur la largeur et hauteur pour que la pièce apparaisse bien correctement sur la page

}


function defaite(){
  let zone = soucoupe.getBoundingClientRect();   //méthode pour obtenir la taille et la position de la soucoupe
  if((sourisX >zone.left ) && (sourisX < zone.right)&&(sourisY > zone.top)&&(sourisY<zone.bottom && jeuActif == true)){
    //si la souris est à l'intérieur de la soucoupe (entre ses bords gauche/droite et haut/bas) et que le jeu est actif
      alert("Tu as perdu ! Tu as ramassé " + point + " pièces");   //on affiche une boite de dialogue alert
      clearInterval(boucle);   // on arrête l'intervalle en appelant la const boucle
      location.reload();   // on recharge la page
  
  }}



function tracker() {  //fonction tracker
 x = x + (sourisX - x) * vitesse; // x avance de 15 % de l'écart entre la souris et la soucoupe
//sourisX - x -> écart entre souris et soucoupe
//(écart) * 0.15 = 15 % de l'écart, c'est le pas : la distance que parcourt la soucoupe à ce tour
// x + pas = la nouvelle position sur l'horizontale

  y = y + (sourisY - y) * vitesse;   // pareil pour y (verticale)
  soucoupe.style.left = x-(soucoupe.offsetWidth/2) + "px";   // on divise par deux la largeur de la soucoupe, on soustrait ce résultat à x (sa nouvelle position), puis on rajoute px.
  soucoupe.style.top = y -(soucoupe.offsetHeight/2)+ "px";   //pareil pour la hauteur, sans cette division et soustraction, c'est le coin haut gauche de la soucoupe qui touchait la souris, et ça ne comptait pas toujours comme une défaite
  //maintenant quand la souris s'arrête, le centre de la soucoupe vient se placer sur la souris, ce qui provoque une défaite
  defaite();   //appelle la fonction defaite qui affichera une défaite si la souris et la soucoupe se touchent
  
}





document.addEventListener("mousemove", (event) => {   //event si la souris bouge
   sourisX = event.clientX;   // on change la valeur avec le clientX, coordonnée horizontale du curseur
   sourisY = event.clientY;   // pareil mais verticale, cela va permettre à la soucoupe de nous suivre
   
  
  cercle.style.left = (event.clientX-(cercle.offsetWidth/2)) + "px";    //divise par deux la largeur du cercle pour centrer le curseur dedans, sans cela c'est le coin en haut à gauche du cercle qui est sur la souris.
   //offsetWidth et offsetHeight récupèrent la largeur et la hauteur du cercle; ensuite on met la valeur en px car il faut une unité et dans mon CSS c'est en px
  cercle.style.top = ( event.clientY - (cercle.offsetHeight/2)) + "px";   //pareil pour la verticale(la hauteur)

   
   
})


piece.addEventListener("mouseover", ()=>{   //event quand la souris est sur la pièce
  point = point + 1;   //on ajoute 1 au score
  compteur.textContent = ("Pièces : " + point);  //on change le texte
  placerPiece();   //appelle la fonction pour changer de façon aléatoire la pièce
  if (point >=20){
    compteur.textContent = ("Niveau 2: Pièces : "+ point); //changement texte compteur
    vitesse = 0.1 //augmente la vitesse
  
  }else if (point >= 35){
    compteur.textContent = ("Niveau 3 : Pièces : "+ point);
    vitesse = 0.15
  }
})



setTimeout(()=>{   //un set time out sous forme de fonction fléchée pour changer le jeu actif en true avec 1sec, pour éviter que la boite de dialogue apparaisse immédiatement en lançant le jeu
  jeuActif = true;

}, 2000)


