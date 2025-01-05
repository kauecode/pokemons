import React from 'react'
import { Dialog, Flex, Button, Text, Strong } from "@radix-ui/themes";
import { FaInfoCircle } from "react-icons/fa";

const StatsDialog = ( {capturedList, setCapturedList} ) => {

  const pokemonsTotal = capturedList.length;
  const pokemonsTotalString = pokemonsTotal > 1 ? `${pokemonsTotal} Pokémons` : `${pokemonsTotal} Pokémon`

  return (
    <Dialog.Root>

      <Dialog.Trigger>
        <Button size='4' ><FaInfoCircle /> You have {pokemonsTotal > 0 
        ? pokemonsTotalString
        : "no Pokemons!" }</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title mt="3">Your Stats</Dialog.Title>
        <Dialog.Description size="3" mt="5">
          {pokemonsTotal === 0 
            ? <Text>You have not captured any pokemons :(</Text>
            : <Text>You have captured <Strong>{pokemonsTotalString}</Strong> so far, here is your capture list:</Text>
          }          
        </Dialog.Description>
        {pokemonsTotal > 0 &&
        <Flex direction="row" wrap="wrap" my='5' align='center' gap="3">
          {capturedList.map((pokemonName, idx) =>
            <Text key={idx} color='gray'>{pokemonName}{idx < pokemonsTotal -1 && ","}</Text>            
          )}
          <Button variant='soft' size='2' onClick={() => setCapturedList([])}>Release them back!</Button>
        </Flex>
        }
        <Text as='p' mb="5">Catch them all to load the next batch!</Text>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
      
    </Dialog.Root>
  )
}

export default StatsDialog