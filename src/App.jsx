import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import PokemonInfo from './components/PokemonInfo';

function App() {

  // State
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch the extra info endpoint
  async function getExtraInfo(url) {
    try {
      const extraData = await axios.get(url).then(res => res.data);
      const filteredData = {
        image: extraData.sprites.front_default,
        height: extraData.height,
        weight: extraData.weight
      }
      return filteredData;      
    } catch (error) {
      console.log(error);
      throw new Error("ooops: " + error.message)
    }
  }

  useEffect(() => {

    setLoading(true);
    
    async function getPokemonList() {
      try {
        const pokemonList = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50").then(res => res.data.results);     
        // Building the object with complete info for use later
        for (const pokemon of pokemonList) {
          const extraInfo = await getExtraInfo(pokemon.url);
          pokemon.image_card = extraInfo.image;
          pokemon.height = extraInfo.height;
          pokemon.weight = extraInfo.weight;
          pokemon.infoVisible = false;
        }
        setPokemonData(pokemonList);
        setLoading(false);        
      } catch (error) {
        console.log(error);
        throw new Error("ooops: " + error.message)        
      }
    }
    getPokemonList();   

  }, [])  

  function showPokemonInfo(index) {
    setPokemonData(pokemonData.map(
      (item, i) => (i === index ? {...item, infoVisible : true } : item )
    ));
  }

  return (
    <>
      <h1>Pokemons!</h1>

      {loading && 
        <div className='text-center'>
          <p className='text-center'>Hang tight, we will have your Pokemons shortly!</p>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>          
        </div>        
      }

      <div className='wrapper'>
        {pokemonData.map((item, index) => 
          <div className='card' key={index}>
            <img 
              src={item.image_card} 
              className="card-img-top" 
              alt={item.name + " Picture"}/>
            <h4>{(item.name).toUpperCase()}</h4>
            
            {!item.infoVisible &&
            <button className='btn btn-warning' onClick={()=>showPokemonInfo(index)}>Find out more!</button>}
            
            {item.infoVisible &&
            <PokemonInfo height={item.height} weight={item.weight}/>}
          </div>
        )}     
      </div>      
      
    </>
  )
}

export default App
