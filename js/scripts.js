let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
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
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //adding form validation UI pattern
    (function() {
        let form = document.querySelector('#register-form');
        let emailInput = document.querySelector('#email');
        let passwordInput = document.querySelector('#password');

        function validateEmail() {
            let value = emailInput.value;

            if (!value) {
                showErrorMessage(emailInput, 'Email is a required field.');
                return false;
            }
            if (value.indexOf('@') === -1) {
                showErrorMessage(emailInput, 'You must enter a valid email address.');
                return false;
            }
            showErrorMessage(emailInput, null);
            return true;
        }

        function validatePassword() {
            let value = passwordInput.value;

            if (!value) {
                showErrorMessage(passwordInput, 'Passord is a required field.');
                return false;
            }
            if(value.length < 8) {
                showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
                return false;
            }
            showErrorMessage(passwordInput, null);
            return true;
        }

        function validateForm() {
            let isValidEmail = validateEmail();
            let isValidPassword = validatePassword();
            return isValidEmail && isValidPassword;
        }

        function showErrorMessage(input, message) {
            let container = input.parentElement; //that's the .input-wrapper

            //Remove possible existing error
            let error = container.querySelector('.error-message');
            if (error) {
                container.removeChild(error);
            }

            //Add error message if the message itself is not empty
            if (message) {
                let error = document.createElement('div');
                error.classList.add('error-message');
                error.innerText = message;
                container.appendChild(error);
            }
        }

        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //Do not submit to the server

            if(validateForm()) {
                alert('Success!');
            }
        })
    })();

    //Modal event
    function showModal(title, text) {
        let modalContainer = document.querySelector('#modal-container');
        //clear all existing content
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        //Add modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', (e) => {
        showModal('Modal title', 'This ist the modal content!');
    });

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });
    document.querySelector('#modal-container').addEventListener('click', (e) => {
        let target = e.target;
        if (target === document.querySelector('#modal-container')) {
            hideModal();
        }
    });

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
