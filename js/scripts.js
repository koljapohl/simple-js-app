let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'btn-block','pokebutton','list--item','list-group-item');
        button.setAttribute('data-target', '#modal-container');
        button.setAttribute('data-toggle', "modal");
        listItem.appendChild(button);
        list.appendChild(listItem);
        //calls function for applying event listener to button
        addListener(button,pokemon);
    }
    //adds a listener to the button that lastly was created by 'addListItem' that triggers the showDetails-function
    function addListener(button, pokemon) {
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
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

    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function (details) {
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            for(let n = 0; n<details.types.length; n++) {
                item.types.push(' '+ details.types[n].type.name);
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Modal event
    let modalContainer = document.querySelector('#modal-container');
    function showModal(item) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');
        //clear existing content of the modal
        modalTitle.empty();
        modalBody.empty();

        //Add modal content
        let nameElement = $('<h2>' + item.name + '</h2>');
        let imageElementFront = $('<img class="modal-img">');
        imageElementFront.attr('src', item.imageUrlFront);
        let imageElementBack = $('<img class="modal-img">');
        imageElementBack.attr('src', item.imageUrlBack);
        let heightElement = $('<p>Height: ' + item.height + '</p>');
        let weightElement = $('<p>Weight: ' + item.weight + '</p>');
        let typesElement = $('<p>Types: ' + item.types + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
    }

    let dialogPromiseReject;

    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if(dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    function showDialog(title, text) {
        showModal(title, text);

        let modal = document.querySelector('.modal');
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        confirmButton.focus();

        //Return a promise that resolves when confirmed, else rejects
        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
                dialogPromiseReject = null;
                hideModal();
                resolve();
            });
            dialogPromiseReject = reject;
        });
    }

    // //adding form validation UI patterns
    // (function() {
    //     let form = document.querySelector('#register-form');
    //     let emailInput = document.querySelector('#email');
    //     let passwordInput = document.querySelector('#password');
    //
    //     function validateEmail() {
    //         let value = emailInput.value;
    //
    //         if (!value) {
    //             showErrorMessage(emailInput, 'Email is a required field.');
    //             return false;
    //         }
    //         if (value.indexOf('@') === -1) {
    //             showErrorMessage(emailInput, 'You must enter a valid email address.');
    //             return false;
    //         }
    //         showErrorMessage(emailInput, null);
    //         return true;
    //     }
    //
    //     function validatePassword() {
    //         let value = passwordInput.value;
    //
    //         if (!value) {
    //             showErrorMessage(passwordInput, 'Passord is a required field.');
    //             return false;
    //         }
    //         if(value.length < 8) {
    //             showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
    //             return false;
    //         }
    //         showErrorMessage(passwordInput, null);
    //         return true;
    //     }
    //
    //     function validateForm() {
    //         let isValidEmail = validateEmail();
    //         let isValidPassword = validatePassword();
    //         return isValidEmail && isValidPassword;
    //     }
    //
    //     function showErrorMessage(input, message) {
    //         let container = input.parentElement; //that's the .input-wrapper
    //
    //         //Remove possible existing error
    //         let error = container.querySelector('.error-message');
    //         if (error) {
    //             container.removeChild(error);
    //         }
    //
    //         //Add error message if the message itself is not empty
    //         if (message) {
    //             let error = document.createElement('div');
    //             error.classList.add('error-message');
    //             error.innerText = message;
    //             container.appendChild(error);
    //         }
    //     }
    //
    //     emailInput.addEventListener('input', validateEmail);
    //     passwordInput.addEventListener('input', validatePassword);
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault(); //Do not submit to the server
    //
    //         if(validateForm()) {
    //             alert('Success!');
    //         }
    //     })
    // })();

    return {
        getAll: getAll,
        addv: addv,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// let testObject = {name: 'poki', height: 8, types: ['air', 'earth']};
// pokemonRepository.addv(testObject);

pokemonRepository.loadList().then(function() {
    //Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
