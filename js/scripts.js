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

    function getAll() {
        return pokemonList;
    }
    function add(item) {
        pokemonList.push(item)
    }
    function addv(item) {
        if(typeof(item) === typeof(pokemonList[0])) {
            document.write('Item: ' + Object.keys(item) + '<br>');
            document.write('Repo: ' + Object.keys(pokemonList[0]) + '<br>');
            if(Object.keys(item).concat() === Object.keys(pokemonList[0]).concat()) {
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
        addv: addv
    };
})();


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
let testObject = {name: 'poki', height: 5, types: ['air', 'earth']};
pokemonRepository.addv(testObject);
