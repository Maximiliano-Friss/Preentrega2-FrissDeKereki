const mainContainer2 = document.getElementById('main-container2');
const logoPokemonContainer = document.getElementById('logoPokemon-container')
const theme = new Audio('../audio/RedTheme.mp3');
theme.setAttribute('muted', 'true');
const welcomeContainer = document.getElementById('welcome-container');
const welcomeContainerNombres = document.getElementById('welcome-container-nombres');
const footerContainer = document.getElementById('footer-container');
const audioOff = document.createElement('img');
const logoPokemonImg = document.createElement('img');
const profOak = document.createElement('img');
const msgWelcome = document.createElement('p');
const btnNext = document.createElement('button');
const formularioNombres = document.createElement('form');
const inputUsuario = document.createElement('input');
const inputEnemigo = document.createElement('input');
const submitNombres = document.createElement('input');
const msgName = document.createElement('p');
const btnLab = document.createElement('button');
const labContainer = document.createElement('div');
const labContainerPokeballs = document.createElement('div');
const labContainerPokemon = document.createElement('div');
const labTitulo = document.createElement ('h2');
const labSubtitulo = document.createElement('p');

//CLASE Poder

class Poder{
constructor(identificador, damage, type, probabilidadExito, efectoEnAtaqueEnemigo, efectoEnDefensaPropia, efectoEnExitoEnemigo) {
    this.identificador = identificador;
    this.damage = damage;
    this.type = type;
    this.probabilidadExito = probabilidadExito;
    this.efectoEnAtaqueEnemigo = efectoEnAtaqueEnemigo;
    this.efectoEnDefensaPropia = efectoEnDefensaPropia;
    this.efectoEnExitoEnemigo = efectoEnExitoEnemigo;
    }
}

//PODERES

const ASCUAS = new Poder('ASCUAS', 20, 'FUEGO', 0.95, 1, 1, 1);
const GRUNIDO = new Poder('GRUÑIDO', 0, 'NORMAL', 0.90, 0.95, 1, 1); //Baja ataque del enemigo. Se resta del ataque.
const LANZALLAMAS = new Poder('LANZALLAMAS', 31, 'FUEGO', 0.75, 1, 1, 1);
const CUCHILLADA = new Poder('CUCHILLADA', 15, 'NORMAL', 1, 1, 1, 1);
const PLACAJE = new Poder('PLACAJE', 18, 'NORMAL', 0.95, 1, 1, 1);
const BURBUJA = new Poder('BURBUJA', 22, 'AGUA', 0.92, 1, 1, 1);
const REFUGIO = new Poder('REFUGIO', 0, 'NORMAL', 0.9, 1, 1.1, 1);   //Aumenta la defensa propia.
const HIDROPULSO = new Poder('HIDROPULSO', 32, 'AGUA', 0.85, 1, 1, 0.95) //Baja prob Exito enemigo.
const LATIGO_CEPA = new Poder('LÁTIGO CEPA', 19, 'PLANTA', 0.94, 1, 1, 1);
const HOJA_AFILADA = new Poder('HOJA AFILADA', 15, 'PLANTA', 1, 1, 1, 1);


//CLASE Pokemon
class Pokemon{
    constructor(nombre, salud, defensa, tipo, probabilidadCritico, poderes, entrenador){
        this.nombre = nombre;
        this.salud = salud;
        this.defensa = defensa;     //Esto sera un factor inicial 1 que multiplica el ataque de quien ataca. Si baja, baja el ataque del enemigo.
        this.tipo = tipo;
        this.probabilidadCritico = probabilidadCritico;
        this.poderes = poderes;     //Esto sera el array de poderes.
        this.entrenador = entrenador;
        this.source = `../img/choose${this.nombre}.gif`;
    }
}

const CHARMANDER = new Pokemon('CHARMANDER', 88, 1, 'FUEGO', 0.15, [ASCUAS, GRUNIDO, LANZALLAMAS, CUCHILLADA], localStorage.getItem('USUARIO'));
const CHARMANDER2 = new Pokemon('CHARMANDER', 88, 1, 'FUEGO', 0.15, [ASCUAS, GRUNIDO, LANZALLAMAS, CUCHILLADA], localStorage.getItem('ENEMIGO'));
const SQUIRTLE = new Pokemon ('SQUIRTLE', 90, 1, 'AGUA', 0.15, [PLACAJE, BURBUJA, REFUGIO, HIDROPULSO], localStorage.getItem('USUARIO'));
const SQUIRTLE2 = new Pokemon ('SQUIRTLE', 90, 1, 'AGUA', 0.15, [PLACAJE, BURBUJA, REFUGIO, HIDROPULSO], localStorage.getItem('ENEMIGO'));
const BULBASAUR = new Pokemon ('BULBASAUR', 89, 1, 'PLANTA', 0.15, [PLACAJE, GRUNIDO, LATIGO_CEPA, HOJA_AFILADA], localStorage.getItem('USUARIO'));
const BULBASAUR2 = new Pokemon ('BULBASAUR', 89, 1, 'PLANTA', 0.15, [PLACAJE, GRUNIDO, LATIGO_CEPA, HOJA_AFILADA], localStorage.getItem('ENEMIGO'));
const CHOOSE_POKEMON = [CHARMANDER, SQUIRTLE, BULBASAUR];
const OPCIONES_POKEMON = [CHARMANDER2, SQUIRTLE2, BULBASAUR2];

mainContainer2.onload = cargarMain2();

function cargarMain2() {
    footerContainer.appendChild(audioOff);
    audioOff.classList.add('audioOff');
    const currentSound = localStorage.getItem('SOUND');

    if(parseInt(currentSound) || currentSound === null) {
        theme.play();
        audioOff.setAttribute('src', '../img/audiooff.png');
    } else {
        theme.pause();
        audioOff.setAttribute('src', '../img/mute.png');
    }

    audioOff.onclick = () => {
        const currentSound = localStorage.getItem('SOUND');
        if (parseInt(currentSound) || currentSound === null) {
            localStorage.setItem('SOUND', 0);
            theme.pause()
            audioOff.setAttribute('src', '../img/mute.png');
        } else {
            localStorage.setItem('SOUND', 1);
            theme.play()
            audioOff.setAttribute('src', '../img/audiooff.png');
        }
    };
    audioOff.style.cursor = 'pointer';

    setTimeout(function () {
        logoPokemonImg.setAttribute('src', '../img/pokemonLogo.gif');
        logoPokemonContainer.appendChild(logoPokemonImg);
        logoPokemonImg.classList.add('animate__animated', 'animate__fadeInDown', 'animate__slower');
        
        setTimeout(function () {
            logoPokemonImg.classList.remove('animate__fadeInDown');
            logoPokemonImg.classList.add('animate__fadeOutDown');
        }, 7000);
        
        setTimeout(function () {
            logoPokemonContainer.remove();
            welcomeContainer.appendChild(welcomeContainerNombres);
            welcomeContainer.classList.add('cuadroGrande');
            welcomeContainer.appendChild(profOak);
            profOak.setAttribute('src', '../img/profOak.png');
            profOak.classList.add('profOak', 'animate__animated', 'animate__zoomIn');

            welcomeContainerNombres.appendChild(msgWelcome);
            msgWelcome.innerHTML = `Hola!<br>Soy el Profesor Oak.<br> Todo listo para comenzar?`;
            msgWelcome.classList.add('textos', 'animate__animated', 'animate__zoomIn');
            welcomeContainerNombres.appendChild(btnNext);
            btnNext.innerHTML = 'Continuar'
            btnNext.classList.add('textos', 'btn-Next', 'animate__animated', 'animate__zoomIn');
        }, 10000);
    }, 4000);
}

btnNext.addEventListener('click', () => {
    msgWelcome.classList.remove('animate__zoomIn');
    btnNext.classList.remove('animate__zoomIn');
    msgWelcome.classList.add('animate__zoomOut');
    btnNext.classList.add('animate__zoomOut');
    logoPokemonImg.remove();

    setTimeout(function () {
        msgWelcome.remove();
        btnNext.remove();
        
        welcomeContainerNombres.appendChild(formularioNombres);
        
        formularioNombres.appendChild(inputUsuario);
        formularioNombres.appendChild(inputEnemigo);
        formularioNombres.appendChild(submitNombres);

        inputUsuario.type = 'text';
        inputUsuario.id = 'nombreUsuario';
        inputUsuario.placeholder = 'Tu nombre';
        inputUsuario.required = true;
        inputUsuario.className = 'inputNombres';
        inputUsuario.autocomplete = "off";

        inputEnemigo.type = 'text';
        inputEnemigo.id = 'nombreEnemigo';
        inputEnemigo.placeholder = 'Nombre de tu oponente';
        inputEnemigo.required = true;
        inputEnemigo.className = 'inputNombres';
        inputEnemigo.autocomplete = "off";


        submitNombres.type = 'submit';
        submitNombres.id = 'btn-submit';
        submitNombres.value = 'Continuar';
        submitNombres.className = 'btn-Next';
    },1000);
});

formularioNombres.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const nombreUsuario = document.getElementById('nombreUsuario').value.toUpperCase();
    const nombreEnemigo = document.getElementById('nombreEnemigo').value.toUpperCase();
    localStorage.setItem('USUARIO', nombreUsuario);
    localStorage.setItem('ENEMIGO', nombreEnemigo);
    inputUsuario.classList.add('animate__animated', 'animate__fadeOutDown');
    inputEnemigo.classList.add('animate__animated', 'animate__fadeOutDown');
    submitNombres.classList.add('animate__animated', 'animate__fadeOutDown');

    setTimeout(function () {
        formularioNombres.remove();
        welcomeContainerNombres.appendChild(msgName);
        welcomeContainerNombres.appendChild(btnLab);
        msgName.classList.add('textos', 'animate__animated', 'animate__zoomIn');
        btnLab.classList.add('btn-Next', 'animate__animated', 'animate__zoomIn');
        msgName.innerHTML = `Te doy la bienvenida ${localStorage.getItem('USUARIO')}! <br> Todo listo para seleccionar<br>a tu Pokémon?`;
        btnLab.innerHTML = 'Ir al laboratorio';
    }, 1800);
}, 1500);

btnLab.onclick = () => {
    msgName.classList.remove('animate__zoomIn');
    btnLab.classList.remove('animate__zoomIn');
    profOak.classList.remove('animate__zoomIn');
    msgName.classList.add('animate__zoomOut');
    btnLab.classList.add('animate__zoomOut');
    profOak.classList.add('animate__zoomOut');

    setTimeout(function () {
        welcomeContainerNombres.remove();
        profOak.remove();
        welcomeContainer.classList.remove('cuadroGrande');
        welcomeContainer.classList.add('cuadroGrandeLab', 'animate__animated', 'animate__fadeIn');

        setTimeout(function(){
            mainContainer2.appendChild(labContainer);
            mainContainer2.appendChild(labContainerPokemon);
            mainContainer2.appendChild(labContainerPokeballs);
            mainContainer2.appendChild(labTitulo);
            labTitulo.innerHTML = 'Escoge una pokeball';
            labTitulo.classList.add('textos', 'lab-titulo');
            labContainer.classList.add('lab-container', 'animate__animated', 'animate__fadeIn');
            labContainerPokemon.classList.add('lab-container-pokemon', 'animate__animated', 'animate__fadeIn');
            labContainerPokeballs.classList.add('lab-container-pokeballs', 'animate__animated', 'animate__fadeIn');
            mostrarPokeballs();
        }, 1000);
    }, 1800);
}

function mostrarPokeballs() {
    for(const pok of CHOOSE_POKEMON) {
        const imgPokeball = document.createElement('img');
        imgPokeball.src = '../img/choosepokeball.png';
        labContainerPokeballs.appendChild(imgPokeball);
        
        imgPokeball.onmouseenter = (evt) => {
            evt.target = true;
            imgPokeball.style.cursor = 'pointer';
            labContainerPokemon.innerHTML ='';
            imgPokeball.classList.add('animate__animated', 'animate__bounce');
            const imgPokemon = document.createElement('img');
            imgPokemon.src = pok.source;
            imgPokemon.classList.add('animate__animated', 'animate__bounceIn');
            labContainerPokemon.appendChild(imgPokemon);
            
        }
        imgPokeball.onclick = () => {
            location.href = "./pages/battle.html";
        }
    }
}



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