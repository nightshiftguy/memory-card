import { useEffect, useState } from "react"
import Cardboard from "./components/Cardboard"
import Scoreboard from "./components/Scoreboard"
const pokemonNames = ["ditto","bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle"]
function App() {
  const [cards, setCards] = useState([]);
  const POKEMON_API = "https://pokeapi.co/api/v2/";

  async function fetchCardImages(pokemonNames){
    let pokemonCards = []
    for(let pokemonName of pokemonNames){
      let res = await fetch(POKEMON_API+"pokemon/"+pokemonName)
      if(!res.ok){
        throw new Error(`Response status: ${res.status}`)
      }
      let pokemonData = await res.json();
      let image_url = pokemonData.sprites.front_default;

      pokemonCards.push({name: pokemonName, image_url})
    }
    return pokemonCards;
  }

  function randomizeItemsOrder(array){
    let randomArray = [];
    let length = array.length;
    for(let i=0; i<length; i++){
      //find random item
      let randomIndex = Math.floor(Math.random() * array.length);
      //move random item to new array
      randomArray.push(array[randomIndex]);
      //remove it from old array
      array.splice(randomIndex, 1);
    }
    return randomArray;
  }

  useEffect(()=>{
    fetchCardImages(pokemonNames).then(
      (pokemons)=>setCards(randomizeItemsOrder(pokemons))
  );
  }, []);

  return (
    <>
    <Scoreboard/>
    <Cardboard Cards={cards}/>
    </>
  )
}

export default App
