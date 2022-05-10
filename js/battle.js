function start(){
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
    
    const USUARIO = prompt('Ingresa tu nombre.').toUpperCase();
    console.log(`Hola ${USUARIO}! Prepárate para conocer a tu oponente.`);
    const ENEMIGO = prompt('Ingresa el nombre de tu oponente.').toUpperCase();
    console.log(`Tu oponente será ${ENEMIGO}!`);
    
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
        }
    }
    
    const CHARMANDER = new Pokemon('CHARMANDER', 88, 1, 'FUEGO', 0.15, [ASCUAS, GRUNIDO, LANZALLAMAS, CUCHILLADA], USUARIO);
    const CHARMANDER2 = new Pokemon('CHARMANDER', 88, 1, 'FUEGO', 0.15, [ASCUAS, GRUNIDO, LANZALLAMAS, CUCHILLADA], ENEMIGO);
    const SQUIRTLE = new Pokemon ('SQUIRTLE', 90, 1, 'AGUA', 0.15, [PLACAJE, BURBUJA, REFUGIO, HIDROPULSO], USUARIO);
    const SQUIRTLE2 = new Pokemon ('SQUIRTLE', 90, 1, 'AGUA', 0.15, [PLACAJE, BURBUJA, REFUGIO, HIDROPULSO], ENEMIGO);
    const BULBASAUR = new Pokemon ('BULBASAUR', 89, 1, 'PLANTA', 0.15, [PLACAJE, GRUNIDO, LATIGO_CEPA, HOJA_AFILADA], USUARIO);
    const BULBASAUR2 = new Pokemon ('BULBASAUR', 89, 1, 'PLANTA', 0.15, [PLACAJE, GRUNIDO, LATIGO_CEPA, HOJA_AFILADA], ENEMIGO);
    
    const OPCIONES_POKEMON = [CHARMANDER2, SQUIRTLE2, BULBASAUR2];
    
    //DEFINICION DE POKEMON ELEGIDO
    function jugar() {
    let ingresarPokemon = prompt('Selecciona un pokémon ingresando su nombre. Opciones: Charmander, Squirtle o Bulbasaur.').toUpperCase();
    let pokemon1 = '';
    
    while(!pokemon1){
        switch(ingresarPokemon){
            case "CHARMANDER":
                pokemon1 = CHARMANDER;
                break;
            case "SQUIRTLE":
                pokemon1 = SQUIRTLE;
                break;
            case "BULBASAUR":
                pokemon1 = BULBASAUR;
                break;
            default:
                ingresarPokemon = prompt('Valor incorrecto. Elegir una de estas opciones: Charmander, Squirtle o Bulbasaur.').toUpperCase();
        }
    }
    
    console.log(`${USUARIO} ha escogido a ${pokemon1.nombre}!`);
    
    let poder1 = '';
    let poder2 = '';
    let f1 = 1;
    let f2 = 1;
    let totalDamage1 = 0;
    let totalDamage2 = 0;
    
    //OPONENTE ELEGIDO
    const OPONENTE_AL_AZAR = Math.floor(Math.random()*OPCIONES_POKEMON.length);
    const pokemon2 = OPCIONES_POKEMON[OPONENTE_AL_AZAR];
    console.log(`${ENEMIGO} ha escogido a ${pokemon2.nombre}!`);
    
    const poderAlAzar = (poke) => Math.floor(Math.random()*poke.poderes.length);
    const pokemonVivos = () => pokemon1.salud > 0 && pokemon2.salud > 0;
    
    function damage1(poder) {
        totalDamage1 = Math.round(f1*(poder.damage/pokemon2.defensa));
        pokemon2.salud -= totalDamage1;
        pokemon2.salud = pokemon2.salud > 0 ? pokemon2.salud : 0;
        f2 *= poder.efectoEnAtaqueEnemigo;
        pokemon1.defensa *= poder.efectoEnDefensaPropia;
        pokemon2.poderes[poderAlAzar(pokemon2)].probabilidadExito *= poder.efectoEnExitoEnemigo;
    }
    
    function damage2(poder) {
        totalDamage2 = Math.round(f2*(poder.damage/pokemon1.defensa));
        pokemon1.salud -= totalDamage2;
        pokemon1.salud = pokemon1.salud > 0 ? pokemon1.salud : 0;
        f1 *= poder.efectoEnAtaqueEnemigo;
        pokemon2.defensa *= poder.efectoEnDefensaPropia;
        pokemon1.poderes[poderAlAzar(pokemon1)].probabilidadExito *= poder.efectoEnExitoEnemigo;
    }
    
    function lograAtacar(poder, poke, user){
        let fallar = Math.random();
        if(fallar < poder.probabilidadExito) {
            console.log(`${poke.nombre} de ${user} utiliza ${poder.identificador}!`);
            return true;
        } else {
            console.log(`Pero ${poke.nombre} de ${user} falló!`);
            return false;
        }
    }
    
    function batalla(poke){
        console.log('pokemon1', pokemon1);
        console.log('pokemon2', pokemon2);
        switch(poke){
            case 'pokemon1':
                console.log('Selecciona un movimiento de ataque. OPCIONES:');
                pokemon1.poderes.forEach((poder, index) => console.log(`${index + 1}: ${poder.identificador}`)); 
                numeroPoder1 = parseInt(prompt('Elige el número (1 a 4) del movimiento a utilizar.'));
    
                while (isNaN(numeroPoder1) || numeroPoder1 <= 0 || numeroPoder1 > 4) {
                    numeroPoder1 = parseInt(prompt("El valor ingresado no es correcto. Elige el número (1 a 4) del movimiento a utilizar."));
                }
    
                poder1 = pokemon1.poderes[numeroPoder1 - 1];
                console.log(`Has seleccionado ${poder1.identificador}.`);
                if(lograAtacar(poder1, pokemon1, USUARIO)){
                    damage1(poder1);
                }
                console.log(`${pokemon2.nombre} de ${ENEMIGO} recibe ${totalDamage1} de daño.`);
                break;
    
            case 'pokemon2':
                poder2 = pokemon2.poderes[poderAlAzar(pokemon2)];
                console.log(`${pokemon2.nombre} de ${ENEMIGO} elige ${poder2.identificador}!`);
                if(lograAtacar(poder2, pokemon2, ENEMIGO)){
                    damage2(poder2);
                }
                console.log(`${pokemon1.nombre} recibe ${totalDamage2} de daño.`);
                break;
    
            default:
                console.log('Algo ha salido mal.');
        }
    }
    
        while(pokemonVivos()){
            batalla('pokemon1');
            if(pokemonVivos()){
                batalla('pokemon2');
            }
        }
        console.log(`La batalla ha finalizado! ${pokemon1.salud > pokemon2.salud ? `${USUARIO} ha ganado!` : `${ENEMIGO} ha ganado!`}`);
        }
}

