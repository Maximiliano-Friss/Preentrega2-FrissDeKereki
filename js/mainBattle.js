const pokemon1 = JSON.parse(localStorage.getItem('POKEMON_ELEGIDO'));
const pokemon2 = JSON.parse(localStorage.getItem('POKEMON_ENEMIGO'));
const nombrePokemon1 = document.createElement('p');
nombrePokemon1.innerHTML = `${pokemon1.nombre}`;
nombrePokemon1.classList.add('p-pokemon1', 'animate__animated', 'animate__fadeInRight');
const nombrePokemon2 = document.createElement('p');
nombrePokemon2.innerHTML = `${pokemon2.nombre}`;
nombrePokemon2.classList.add('p-pokemon2', 'animate__animated', 'animate__fadeInLeft');
const USUARIO = localStorage.getItem('USUARIO');
const ENEMIGO = localStorage.getItem('ENEMIGO');
const imgUsuario = document.getElementById('battle-Usuario');
const imgEnemigo = document.getElementById('battle-Enemigo');
const pokeballsUsuario = document.getElementById('battle-pokeballs-usuario');
const pokeballsEnemigo = document.getElementById('battle-pokeballs-enemigo');
const containerInfoUsuario = document.getElementById('battle-container-infoUsuario');
const containerInfoEnemigo = document.getElementById('battle-container-infoEnemigo');
const infoUsuario = document.createElement('img');
infoUsuario.src = '../img/battleInfoUsuario.png';
infoUsuario.classList.add('animate__animated', 'animate__fadeInRight');
const infoEnemigo = document.createElement('img');
infoEnemigo.src = '../img/battleInfoEnemigo.png';
infoEnemigo.classList.add('animate__animated', 'animate__fadeInLeft');
const battleTexto = document.querySelector('.battle-texto');
const infoPoder = document.createElement('p');
const backPokemon1 = document.createElement('img');
backPokemon1.src = pokemon1.back;
backPokemon1.classList.add('battle-pokemon1', 'animate__animated', 'animate__fadeInUp');
const frontPokemon2 = document.createElement('img');
frontPokemon2.src = pokemon2.front;
frontPokemon2.classList.add('battle-pokemon2', 'animate__animated', 'animate__fadeInUp');
const battleContainer = document.querySelector('.battle-container');
const btnContinue = document.querySelector('.btn-Continue');
const msg0 = document.getElementById('msg-0');
let poder1 = '';
let poder2 = '';
let f1 = 1;
let f2 = 1;
let totalDamage1 = 0;
let totalDamage2 = 0;
btnContinue.style.cursor = 'pointer';
const pokemonVivos = () => pokemon1.salud > 0 && pokemon2.salud > 0;
const poderAlAzar = (poke) => Math.floor(Math.random()*poke.poderes.length);

start();

function start() {
    msg0.innerHTML = `${ENEMIGO} te ha desafiado a una batalla Pokémon!`;
    showPokemon();
}

function showPokemon() {
    btnContinue.onclick = () => {
    msg0.innerHTML = `${pokemon1.nombre} yo te elijo!`;
        imgUsuario.classList.add('animate__animated', 'animate__fadeOutLeft');
        imgEnemigo.classList.add('animate__animated', 'animate__zoomOutLeft');
        pokeballsUsuario.classList.add('animate__animated', 'animate__fadeOutRight');
        pokeballsEnemigo.classList.add('animate__animated', 'animate__fadeOutLeft');

        setTimeout(() => {
            imgUsuario.remove();
            imgEnemigo.remove();
            pokeballsUsuario.remove();
            pokeballsEnemigo.remove();
            battleContainer.appendChild(backPokemon1);
            battleContainer.appendChild(frontPokemon2);
            containerInfoUsuario.appendChild(infoUsuario);
            containerInfoUsuario.appendChild(nombrePokemon1);
            containerInfoEnemigo.appendChild(infoEnemigo);
            containerInfoEnemigo.appendChild(nombrePokemon2);
            clearTextBox();
        }, 1000);
    }
}

function clearTextBox() {
    btnContinue.onclick = () => {
        btnContinue.remove();
        msg0.innerHTML = '';
        battleTexto.src = '../img/battlePoderesBox.png';
        juegaUsuario();  
    }
}

function clearPowers(){
    const infoPowers = document.querySelector('.p-infoPoder');
    const btnPower0 = document.querySelector('.btn-power-0');
    const btnPower1 = document.querySelector('.btn-power-1');
    const btnPower2 = document.querySelector('.btn-power-2');
    const btnPower3 = document.querySelector('.btn-power-3');
    infoPowers.remove();
    btnPower0.remove();
    btnPower1.remove();
    btnPower2.remove();
    btnPower3.remove();
}

function juegaEnemigo() {
    poder2 = pokemon2.poderes[poderAlAzar(pokemon2)];
    btnContinue.onclick = () => {
        msg0.innerHTML = `${pokemon2.nombre} enemigo usó ${poder2.identificador}!`;
        if(lograAtacar(poder2, pokemon2, ENEMIGO)){
            btnContinue.onclick = () => {
                totalDamage2 = Math.round(f2*(poder2.damage/pokemon1.defensa));
                pokemon1.salud -= totalDamage2;
                pokemon1.salud = pokemon1.salud > 0 ? pokemon1.salud : 0;
                f1 *= poder2.efectoEnAtaqueEnemigo;
                pokemon2.defensa *= poder2.efectoEnDefensaPropia;
                pokemon1.poderes[poderAlAzar(pokemon1)].probabilidadExito *= poder2.efectoEnExitoEnemigo;
                msg0.innerHTML = `${pokemon1.nombre} recibe ${totalDamage2} de daño!`;
                checkStatus();
            }
        } else {
            btnContinue.onclick = () => {
                clearTextBox();
            }
        }
    }
}

function usuarioAtaca() {
    btnContinue.onclick = () => {
        totalDamage1 = Math.round(f1*(poder1.damage/pokemon2.defensa));
        pokemon2.salud -= totalDamage1;
        pokemon2.salud = pokemon2.salud > 0 ? pokemon2.salud : 0;
        f2 *= poder1.efectoEnAtaqueEnemigo;
        pokemon1.defensa *= poder1.efectoEnDefensaPropia;
        pokemon2.poderes[poderAlAzar(pokemon2)].probabilidadExito *= poder1.efectoEnExitoEnemigo;
        msg0.innerHTML = `${pokemon2.nombre} enemigo recibe ${totalDamage1} de daño!`;
        juegaEnemigo();
    }
}

function checkStatus() {
    if(pokemonVivos()){
        clearTextBox();
    } else {
        btnContinue.onclick = () => {
            msg0.innerHTML = `La batalla ha finalizado! ${pokemon1.salud > pokemon2.salud ? `${USUARIO} ha ganado!` : `${ENEMIGO} ha ganado!`}`;
        }
    }
}

function juegaUsuario() {
    for (const poder of pokemon1.poderes){
        const btnPower = document.createElement('button');
        btnPower.innerHTML = poder.identificador;
        battleContainer.appendChild(btnPower);
        btnPower.classList.add(`btn-power-${pokemon1.poderes.indexOf(poder)}`);
    
        btnPower.onmouseover = () => {
            battleContainer.appendChild(infoPoder);
            infoPoder.classList.add('p-infoPoder');
            infoPoder.innerHTML = `TIPO: ${poder.type}`;
        }

        btnPower.onmouseleave = () => {
            infoPoder.innerHTML = '';
        }
    
        btnPower.onclick = () => {
            poder1 = poder;
            clearPowers();
            battleTexto.src = '../img/battleTextBox.png';
            msg0.innerHTML = `${pokemon1.nombre} usó ${poder1.identificador}!`;
            battleContainer.appendChild(btnContinue);
            if(lograAtacar(poder1, pokemon1, USUARIO)){
                usuarioAtaca();
            } else {
                juegaEnemigo();
            }
        }
    }
}

function lograAtacar(poder, poke, jugador){
    let fallar = Math.random();
    if(fallar < poder.probabilidadExito) {
            return true;
        } else {
            msg0.innerHTML = `${poke.nombre} de ${jugador} usó ${poder.identificador}... pero falló!`;
            return false;
    }
}
