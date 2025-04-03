const pokeContainer = document.querySelector("#pokeContainer");
const searchInput = document.querySelector("#search");
const pokemonCount = 1026;
const colors = {
    fire: "#FDOFDF",
    grass: "#DEFDE0",
    electric: "yellow",
    water: "#12d4fb",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#88006d",
    bug: "#f8d5a3",
    dragon: "darkblue",
    psychic: "pink",
    flying: "skyblue",
    fighting: "orange",
    normal: "#F5F5F5",
    steel: 'gray',
    dark: 'darkslategrey',
    ghost: 'indigo',
    ice: 'azure'
};
const mainTypes = Object.keys(colors);

let allPokemons = [];

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    allPokemons.push(data);
    createPokemonCard(data); 
};

// Função para criar o cartão de um Pokémon
const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types ? poke.types.map(type => type.type.name) : [];
    const typeColors = pokeTypes.map(type => colors[type]);

    let cardColor;
    if (pokeTypes.length === 2) {
        cardColor = `linear-gradient(to right, ${typeColors[0]}, ${typeColors[1]})`;
    } else {
        cardColor = typeColors[0] || "#F5F5F5";
    }

    card.style.background = cardColor;

    card.addEventListener('click', () => {
        window.location.href = `details.html?id=${poke.id}`;
    });

    // const typeImages = {
    //     fire: "images/fire.png",
    //     water: "images/water.png",
    //     grass: "images/grass.png",
    //     electric: "images/electric.png",
    //     ice: "images/ice.png",
    //     fighting: "images/fighting.png",
    //     poison: "images/poison.png",
    //     ground: "images/ground.png",
    //     flying: "images/flying.png",
    //     psychic: "images/psychic.png",
    //     bug: "images/bug.png",
    //     rock: "images/rock.png",
    //     ghost: "images/ghost.png",
    //     dragon: "images/dragon.png",
    //     dark: "images/dark.png",
    //     steel: "images/steel.png",
    //     fairy: "images/fairy.png"
    // };
    //     const typeContainer = document.getElementById("type");
    
    //     poke.forEach(typeInfo => {
    //         const typeName = typeInfo.type.name;
    //         const imgSrc = typeImages[typeName];
    //     });
    
    //     document.querySelector(".pokeDesc").appendChild(typeContainer);
    
    const pokemonInnerHTML = `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${pokeTypes.join(', ')}</span></small>
        </div>
    `;
    card.innerHTML = pokemonInnerHTML;

    pokeContainer.appendChild(card);
};


const filterPokemons = (searchQuery) => {
    pokeContainer.innerHTML = '';

    const filteredPokemons = allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredPokemons.forEach(pokemon => createPokemonCard(pokemon));
};

searchInput.addEventListener('input', (e) => {
    const searchQuery = e.target.value;
    filterPokemons(searchQuery);
});



fetchPokemons();
