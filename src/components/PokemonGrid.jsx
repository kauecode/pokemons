import React, { useEffect, useState } from 'react'
import { Grid, Skeleton, Flex, Spinner, Text } from "@radix-ui/themes";
import { PAGE_SIZE } from '../config/constants'
import usePokemonList from '../hooks/usePokemonList';
import PokemonCard from './PokemonCard/PokemonCard';
import StatsDialog from './StatsDialog';

const PokemonGrid = () => {

	const {data, error, isLoading, fetchNextPage, pages} = usePokemonList();
  const [capturedList, setCapturedList] = useState([]);
  

  const handleCapture = (pokemonName) => setCapturedList([...capturedList, pokemonName]);

  useEffect(() => {
      if (capturedList.length > 1 && capturedList.length === data.length) fetchNextPage();
  }, [capturedList])

	if (error) 
		return <p>Sorry, there was a problem on usePokemonList, check the console - ERR: {error.message}</p>  
  
  return (
    <>         
      <Grid columns={{ initial: '2', sm: '2', md: '4', lg: '4' }} gap={{ initial: '4', lg: '8' }}  width="auto">       
        {pages < 1 && isLoading && Array.from({ length: PAGE_SIZE }, (_, i) => 
          <Skeleton key={i} width="100%" height="375px" />
        )}
        {data.length > 0 && data.map((pokemon, idx) => 
          <PokemonCard 
            key={idx} 
            pokemon={pokemon}
            handleCapture={handleCapture}
            isCaptured={capturedList.includes(pokemon.name)} />
        )}					    
      </Grid>
      
      <Text m='5' as='p' align="center" size='1'>
        <strong>Data stats:</strong> Loaded {data.length} pokémons in {pages > 1 ? `${pages} pages` : `${pages} page`} so far.
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