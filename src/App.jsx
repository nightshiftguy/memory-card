import { useEffect, useState } from "react"
import Cardboard from "./components/Cardboard"
import Scoreboard from "./components/Scoreboard"
const pokemonNames = ["ditto","bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle"]
function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameInfo, setGameInfo] = useState("");

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

  function cardClickHandler(event){
    let pokemonName = event.target.name;
    if(clickedCards.includes(pokemonName)){
      //pokemon already clicked
      setBestScore(currentScore>bestScore ? currentScore : bestScore);
      setCurrentScore(0);
      setClickedCards([]);
      setGameInfo("Pokemon clicked twice - You lose")
    }
    else{
      //pokemon not clicked
      if(cards.length === clickedCards.length-1){
        //player found last pokemon
        let newCurrentScore = currentScore+1;
        setBestScore(newCurrentScore>bestScore ? newCurrentScore : bestScore);
        setCurrentScore(0);
        setClickedCards([]);
        setGameInfo("You found all pokemons. Congratulations!");
      } else{
        //player found another pokemon
        setCurrentScore(currentScore+1);
        let newClickedCards = clickedCards;
        newClickedCards.push(pokemonName)
        setClickedCards(newClickedCards);
        setGameInfo("You found new pokemon!")
      }
    }
    setCards(randomizeItemsOrder(cards));
  }

  useEffect(()=>{
    fetchCardImages(pokemonNames).then(
      (pokemons)=>setCards(randomizeItemsOrder(pokemons))
  );
  }, []);


  return (
    <>
    <Scoreboard currentScore={currentScore} bestScore={bestScore}/>
    <Cardboard Cards={cards} cardClickHandler={cardClickHandler}/>
    <p>{gameInfo}</p>
    </>
  )
}

export default App
