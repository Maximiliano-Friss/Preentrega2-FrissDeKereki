const pokemon1 = JSON.parse(localStorage.getItem('POKEMON_ELEGIDO'));
const pokemon2 = JSON.parse(localStorage.getItem('POKEMON_ENEMIGO'));
console.log(pokemon1.back);
const USUARIO = localStorage.getItem('USUARIO');
const ENEMIGO = localStorage.getItem('ENEMIGO');
const imgUsuario = document.getElementById('battle-Usuario');
const imgEnemigo = document.getElementById('battle-Enemigo');

const backPokemon1 = document.createElement('img');
backPokemon1.src = pokemon1.back;
backPokemon1.classList.add('battle-pokemon1', 'animate__animated', 'animate__fadeInUp');

const frontPokemon2 = document.createElement('img');
frontPokemon2.src = pokemon2.front;
frontPokemon2.classList.add('battle-pokemon2', 'animate__animated', 'animate__fadeInUp');

const battleContainer = document.querySelector('.battle-container');
const btnContinue = document.querySelector('.btn-Continue');
//Variables de texto
const msg0 = document.getElementById('msg-0');



msg0.innerHTML = `${ENEMIGO} te ha desafiado a una batalla Pokémon!`;
btnContinue.style.cursor = 'pointer';
btnContinue.onclick = batalla0;

function batalla0() {
    msg0.innerHTML = `${pokemon1.nombre} yo te elijo!`;
    btnContinue.onclick = () => {
        imgUsuario.classList.add('animate__animated', 'animate__zoomOutRight');
        imgEnemigo.classList.add('animate__animated', 'animate__zoomOutLeft');

        setTimeout(() => {
            imgUsuario.remove();
            imgEnemigo.remove();
            battleContainer.appendChild(backPokemon1);
            battleContainer.appendChild(frontPokemon2);
        }, 1000);
    }
}

//     function jugar() {

//     let poder1 = '';
//     let poder2 = '';
//     let f1 = 1;
//     let f2 = 1;
//     let totalDamage1 = 0;
//     let totalDamage2 = 0;
    
//     const poderAlAzar = (poke) => Math.floor(Math.random()*poke.poderes.length);
//     const pokemonVivos = () => pokemon1.salud > 0 && pokemon2.salud > 0;
    
//     function damage1(poder) {
//         totalDamage1 = Math.round(f1*(poder.damage/pokemon2.defensa));
//         pokemon2.salud -= totalDamage1;
//         pokemon2.salud = pokemon2.salud > 0 ? pokemon2.salud : 0;
//         f2 *= poder.efectoEnAtaqueEnemigo;
//         pokemon1.defensa *= poder.efectoEnDefensaPropia;
//         pokemon2.poderes[poderAlAzar(pokemon2)].probabilidadExito *= poder.efectoEnExitoEnemigo;
//     }
    
//     function damage2(poder) {
//         totalDamage2 = Math.round(f2*(poder.damage/pokemon1.defensa));
//         pokemon1.salud -= totalDamage2;
//         pokemon1.salud = pokemon1.salud > 0 ? pokemon1.salud : 0;
//         f1 *= poder.efectoEnAtaqueEnemigo;
//         pokemon2.defensa *= poder.efectoEnDefensaPropia;
//         pokemon1.poderes[poderAlAzar(pokemon1)].probabilidadExito *= poder.efectoEnExitoEnemigo;
//     }
    
//     function lograAtacar(poder, poke, user){
//         let fallar = Math.random();
//         if(fallar < poder.probabilidadExito) {
//             console.log(`${poke.nombre} de ${localStorage.getItem('USUARIO')} utiliza ${poder.identificador}!`);
//             return true;
//         } else {
//             console.log(`Pero ${poke.nombre} de ${localStorage.getItem('USUARIO')} falló!`);
//             return false;
//         }
//     }
    
//     function batalla(poke){
//         console.log('pokemon1', pokemon1);
//         console.log('pokemon2', pokemon2);
//         switch(poke){
//             case 'pokemon1':
//                 console.log('Selecciona un movimiento de ataque. OPCIONES:');
//                 pokemon1.poderes.forEach((poder, index) => console.log(`${index + 1}: ${poder.identificador}`)); 
//                 numeroPoder1 = parseInt(prompt('Elige el número (1 a 4) del movimiento a utilizar.'));
    
//                 while (isNaN(numeroPoder1) || numeroPoder1 <= 0 || numeroPoder1 > 4) {
//                     numeroPoder1 = parseInt(prompt("El valor ingresado no es correcto. Elige el número (1 a 4) del movimiento a utilizar."));
//                 }
    
//                 poder1 = pokemon1.poderes[numeroPoder1 - 1];
//                 console.log(`Has seleccionado ${poder1.identificador}.`);
//                 if(lograAtacar(poder1, pokemon1, localStorage.getItem('USUARIO'))){
//                     damage1(poder1);
//                 }
//                 console.log(`${pokemon2.nombre} de ${localStorage.getItem('ENEMIGO')} recibe ${totalDamage1} de daño.`);
//                 break;
    
//             case 'pokemon2':
//                 poder2 = pokemon2.poderes[poderAlAzar(pokemon2)];
//                 console.log(`${pokemon2.nombre} de ${localStorage.getItem('ENEMIGO')} elige ${poder2.identificador}!`);
//                 if(lograAtacar(poder2, pokemon2, localStorage.getItem('ENEMIGO'))){
//                     damage2(poder2);
//                 }
//                 console.log(`${pokemon1.nombre} recibe ${totalDamage2} de daño.`);
//                 break;
    
//             default:
//                 console.log('Algo ha salido mal.');
//         }
//     }
    
//         while(pokemonVivos()){
//             batalla('pokemon1');
//             if(pokemonVivos()){
//                 batalla('pokemon2');
//             }
//         }
//         console.log(`La batalla ha finalizado! ${pokemon1.salud > pokemon2.salud ? `${localStorage.getItem('USUARIO')} ha ganado!` : `${localStorage.getItem('ENEMIGO')} ha ganado!`}`);
//     }
// }
// })