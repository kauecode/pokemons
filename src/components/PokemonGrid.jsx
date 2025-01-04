import React, { useEffect, useState } from 'react'
import PokemonInfo from './PokemonInfo';
import usePokemonList from '../hooks/usePokemonList';
import { Grid, Skeleton, Flex, Spinner, Text } from "@radix-ui/themes";
import StatsDialog from './StatsDialog';

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
      <Grid columns={{ initial: '2', sm: '2', md: '3', lg: '4' }} gap={{ initial: '4', sm: '6' }}  width="auto">       
        {pages < 1 && isLoading && skeletons.map(item => 
          <Skeleton key={item} width="100%" height="400px" />
        )}
        {data.length > 0 && data.map((pokemon, idx) => 
          <PokemonInfo 
            key={idx} 
            pokemon={pokemon}
            handleCapture={handleCapture}
            isCaptured={capturedList.includes(pokemon.name)} />
        )}					    
      </Grid>
      
      <Text m='5' as='p' align="center" size='1'>
        <strong>Data stats:</strong> Loaded {data.length} pokemons in {pages} pages so far.
      </Text>
      
      <Flex p='5' align='center' justify='center'>
          {isLoading 
            ? <Spinner/>
            : <StatsDialog capturedList={capturedList} setCapturedList={setCapturedList} />
          }
      </Flex>         
    </>
  )
}

export default PokemonGrid