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

let threshHeight = 7;
let bigText = ' - Wow, that\'s big!';
for(let i =0; i<pokemonList.length; i++){
    /*looking at one array element at a time one after another
    declare a string variable 'text' and assign the pokemon's name as well as its height to it.*/
    let text = '<p class="pokemon">'+pokemonList[i].name
    + ' (height: ' + pokemonList[i].height+ ')';
    /*check if the current pokemon is bigger than the predefined threshold height.
    If so, add a specific string to the text variable.*/
    if(pokemonList[i].height>=threshHeight){
        text = text + bigText + '</p>';
    } else{
        text = text + '</p>';
    }
    document.write(text);
}
