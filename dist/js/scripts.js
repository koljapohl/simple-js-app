let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrlFront=t.sprites.front_default,e.imageUrlBack=t.sprites.back_default,e.height=t.height,e.weight=t.weight,e.types=[];for(let n=0;n<t.types.length;n++)e.types.push(" "+t.types[n].type.name)}).catch(function(e){console.error(e)})}return $(".nav-item a").attr("class").indexOf("active")<0&&function(){let e=document.querySelector("#contact-form"),t=document.querySelector("#mail"),n=document.querySelector("#msgbox");function i(){let e=t.value;return e?-1===e.indexOf("@")?(r(t,'You must enter a valid email address that contains an "@"-sign.'),!1):(r(t,null),!0):(r(t,"E-mail is a required field."),!1)}function o(){return n.value?(r(n,null),!0):(r(n,"You must enter a message."),!1)}function r(e,t){let n=e.parentElement,i=n.querySelector(".error-message");if(i&&n.removeChild(i),t){let e=document.createElement("div");e.classList.add("error-message"),e.innerText=t,n.appendChild(e)}}t.addEventListener("input",i),n.addEventListener("input",o),e.addEventListener("submit",e=>{e.preventDefault(),function(){let e=i(),t=o();return e&&t}()&&alert("Success!")})}(),{getAll:function(){return e},addv:function(t){typeof t==typeof e[0]?(function(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;let n=sort(e),i=sort(t);for(let e=0;e<n.length;e++)if(n[e]!==i[e])return!1}(Object.keys(t)),Object.keys(e[0])?e.push(t):window.alert("The given keys of the object don't match.")):window.alert("The given parameter is not an object.")},addListItem:function(e){let t=document.querySelector(".pokemon-list"),i=document.createElement("li"),o=document.createElement("button");o.innerText=e.name,o.classList.add("btn","btn-primary","btn-block","pokebutton","list--item","list-group-item"),o.setAttribute("data-target","#modal-container"),o.setAttribute("data-toggle","modal"),i.appendChild(o),t.appendChild(i),function(e,t){e.addEventListener("click",function(){!function(e){n(e).then(function(){!function(e){let t=$(".modal-body"),n=$(".modal-title");n.empty(),t.empty();let i=$("<h2>"+e.name+"</h2>"),o=$('<img class="modal-img">');o.attr("src",e.imageUrlFront);let r=$('<img class="modal-img">');r.attr("src",e.imageUrlBack);let a=$("<p>Height: "+e.height+"</p>"),l=$("<p>Weight: "+e.weight+"</p>"),c=$("<p>Types: "+e.types+"</p>");n.append(i),t.append(o),t.append(r),t.append(a),t.append(l),t.append(c)}(e)})}(t)})}(o,e)},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(t){t.results.forEach(function(t){!function(t){e.push(t)}({name:t.name,detailsUrl:t.url})})}).catch(function(e){console.error(e)})},loadDetails:n}}();$(".nav-item a").attr("class").indexOf("active")>-1&&pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});
