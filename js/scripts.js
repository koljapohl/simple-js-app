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

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokebutton','list--item');
        listItem.appendChild(button);
        list.appendChild(listItem);
        //calls function for applying event listener to button
        addListener(button, pokemon);
    }
    //adds a listener to the button that lastly was created by 'addListItem' that triggers the showDetails-function
    function addListener(button, pokemon) {
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }
    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

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
        addListItem: addListItem
    };
})();

// let testObject = {name: 'poki', height: 8, types: ['air', 'earth']};
// pokemonRepository.addv(testObject);

let threshHeight = 7;
let bigText = ' - Wow, that\'s big!';
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
