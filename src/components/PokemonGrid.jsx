import React, { useEffect, useRef, useState } from 'react'
import PokemonInfo from './PokemonInfo';
import usePokemonList from '../hooks/usePokemonList';
import { Grid, Skeleton, Button, Flex, Spinner, Text } from "@radix-ui/themes";

const PokemonGrid = () => {

	const {data, error, isLoading, fetchNextPage, pages} = usePokemonList();
  const [capturedList, setCapturedList] = useState([]);
  const skeletons = [1,2,3,4,5,6,7,8,9,10,11,12]
 
  const handleCapture = (pokemonName) => {
    setCapturedList([...capturedList, pokemonName])    
  } 

  useEffect(() => {
      if (capturedList.length > 1 && capturedList.length === data.length) {
        fetchNextPage();
      }      
  }, [capturedList])

	if (error) 
		return <p>Sorry, there was a problem on usePokemonList, check the console - ERR: {error.message}</p>  
  
  return (
    <>     
      <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="6"  width="auto">       
        {pages < 1 && isLoading && 
          skeletons.map(item => <Skeleton key={item} width="100%" height="400px" />)}
        {data.length > 0 && data.map((pokemon, idx) => <PokemonInfo key={idx} pokemon={pokemon}  handleCapture={handleCapture} isCaptured={capturedList.includes(pokemon.name)} />)}					    
      </Grid>
      
      <Text m='5' as='p' align="center" size='1'>Stats: Loaded {data.length} pokemons in {pages} pages, captured <strong>{capturedList.length}</strong> pokemons.</Text>
      
      <Flex p='5' align='center' justify='center'>
        <Button disabled={isLoading} size='3' onClick={fetchNextPage}>
          {isLoading 
            ? <Spinner/>
            : "Load More..."}
        </Button>        
      </Flex>         
    </>
  )
}

export default PokemonGrid