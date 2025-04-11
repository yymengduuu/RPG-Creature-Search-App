const searchInput = document.getElementById("search-input");
const button = document.getElementById("search-button");
const pokeAPI = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Creature not found");
    }
    const data = await res.json();
    displayPokemonInfo(data);
  } catch (err) {
    alert("Creature not found");
    console.error("Creature not found");
  }
};

const checkUserInput = () => {
  let searchValue = searchInput.value.trim();
  if (!searchValue) {
    alert("Please enter a creature name or ID");
    return;
  }
  searchValue = searchValue.toLowerCase(); 
  const fullUrl = `${pokeAPI}/${searchValue}`;
  fetchData(fullUrl);
};

const displayPokemonInfo = (data) => {
  document.getElementById("creature-name").textContent = `${data.name}`;
  document.getElementById("creature-id").textContent = `${data.id}`;
  document.getElementById("weight").textContent = `${data.weight}`;
  document.getElementById("height").textContent = `${data.height}`;

  const typesContainer = document.getElementById("types");
typesContainer.innerHTML = ""; 
data.types.forEach(el => {
  const typeSpan = document.createElement("span");
  typeSpan.textContent = el.name.toUpperCase();
  typesContainer.appendChild(typeSpan);
});
  
  data.stats.forEach(stat=>{
    const statName = stat.name;
    const statValue = stat.base_stat;
    const statElement = document.getElementById(statName);
    if(statElement) {
      statElement.textContent = statValue;
    }
  })
}

button.addEventListener("click", checkUserInput);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
