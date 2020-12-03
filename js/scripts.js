let pokemonRepository = (function () {
    let pokemonList = [];

    pokemonList = [
        {
            name: 'Charmander',
            height: 6,
            types: ['fire']
        },
        {
            name: 'Squirtle',
            height: 5,
            types: ['water']
        },
        {
            name: 'Togepi',
            height: 3,
            types: ['fairy']
        },
        {
            name: 'Bulbasaur',
            height: 7,
            types: ['grass', 'poison']
        }
    ];

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if(a.length !== b.length) return false;

        let c = sort(a);
        let d = sort(b);

        for(let i=0; i < c.length; i++) {
            if(c[i] !== d[i]) return false;
        }
        return true;
    }

    function getAll() {
        return pokemonList;
    }
    function add(item) {
        pokemonList.push(item)
    }
    function addv(item) {
        if(typeof(item) === typeof(pokemonList[0])) {
            if(arraysEqual(Object.keys(item)), Object.keys(pokemonList[0])) {
                pokemonList.push(item)
            } else {
                window.alert('The given keys of the object don\'t match.');
            }
        } else {
            window.alert('The given parameter is not an object.');
        }
    }
    return {
        getAll: getAll,
        add: add,
        addv: addv,
        arraysEqual: arraysEqual
    };
})();

let testObject = {name: 'poki', height: 8, types: ['air', 'earth']};
pokemonRepository.addv(testObject);

let threshHeight = 7;
let bigText = ' - Wow, that\'s big!';
pokemonRepository.getAll().forEach(function(pokemon){
    /*looking at one array element at a time one after another
    declare a string variable 'text' and assign the pokemon's name as well as its height to it.*/
    let text = '<p class="pokemon">'+pokemon.name
    + ' (height: ' + pokemon.height+ ')';
    /*check if the current pokemon is bigger than the predefined threshold height.
    If so, add a specific string to the text variable.*/
    if(pokemon.height>=threshHeight){
        text = text + bigText + '</p>';
    } else{
        text = text + '</p>';
    }
    document.write(text);
});
