
const pokemon1 = JSON.parse(localStorage.getItem('POKEMON_ELEGIDO'));
const pokemon2 = JSON.parse(localStorage.getItem('POKEMON_ENEMIGO'));
console.log(pokemon1.nombre);
console.log(pokemon2.salud);



//     function jugar() {
//     let ingresarPokemon = prompt('Selecciona un pokémon ingresando su nombre. Opciones: Charmander, Squirtle o Bulbasaur.').toUpperCase();
//     let pokemon1 = '';
    
//     while(!pokemon1){
//         switch(ingresarPokemon){
//             case "CHARMANDER":
//                 pokemon1 = CHARMANDER;
//                 break;
//             case "SQUIRTLE":
//                 pokemon1 = SQUIRTLE;
//                 break;
//             case "BULBASAUR":
//                 pokemon1 = BULBASAUR;
//                 break;
//             default:
//                 ingresarPokemon = prompt('Valor incorrecto. Elegir una de estas opciones: Charmander, Squirtle o Bulbasaur.').toUpperCase();
//         }
//     }
    
//     console.log(`${localStorage.getItem('USUARIO')} ha escogido a ${pokemon1.nombre}!`);
    
//     let poder1 = '';
//     let poder2 = '';
//     let f1 = 1;
//     let f2 = 1;
//     let totalDamage1 = 0;
//     let totalDamage2 = 0;
    
//     //OPONENTE ELEGIDO
//     const OPONENTE_AL_AZAR = Math.floor(Math.random()*OPCIONES_POKEMON.length);
//     const pokemon2 = OPCIONES_POKEMON[OPONENTE_AL_AZAR];
//     console.log(`${localStorage.getItem('ENEMIGO')} ha escogido a ${pokemon2.nombre}!`);
    
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