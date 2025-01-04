import React from 'react'
import usePokemonInfo from '../hooks/usePokemonInfo'
import { Tooltip, Card, Inset, Badge, DataList, Heading, Flex, Spinner, Text, Box } from "@radix-ui/themes";
import styles from './pokemonInfo.module.scss';

const PokemonInfo = ({ pokemon, handleCapture, isCaptured }) => {

  const {data:pokemonInfoData, error, isLoading} = usePokemonInfo(pokemon.name);

  const cardClass = document.querySelector(".card-" + pokemon.name);

  if (error) 
		return <p>Sorry, there was a problem on usePokemonInfo, check the console - ERR: {error.message}</p>
  
  return ( 
    <>      
    <Tooltip content={isCaptured ? pokemon.name.toUpperCase() + " CAPTURED" : "Click to catch!"}>
      <Card         
        onPointerUp={() => !isCaptured && handleCapture(pokemon.name)} 
        onKeyDown={(e) => e.key === "Enter" && !isCaptured && handleCapture(pokemon.name)}
        role='button'
        aria-label={`Click to catch ${pokemon.name}`}        
        tabIndex={0}
        className={`${styles.pokemonCard} ${isCaptured ? styles.captured : ""}`} 
        size={{ initial: '2', sm: '4'}} 
        height="100%">
        <Inset clip="padding-box" side="top" pb="current">
          {isLoading 
            ? (
            <Flex align='center' justify='center' width='100%' height='180px'>
              <Spinner />
            </Flex>
            ) : ( 
              <div className={styles.pokemonImgWrapper}>
                <img
                  src={pokemonInfoData.sprites?.back_default} 
                  alt={pokemon.name}
                  className={styles.mainImage}
                />
                <img
                  src={pokemonInfoData.sprites?.front_default} 
                  alt={pokemon.name}
                  className={styles.hoverImage}
                />
              </div>
            )
          }
        </Inset>
        <Heading as='h3' size={{ initial: '2', md: '4'}} mb='5'>{pokemon.name.toUpperCase()}</Heading>
        <PokemonInfoDataList pokemonInfoData={pokemonInfoData}/>
      </Card>   
    </Tooltip>       
    </>
  )
}

export default PokemonInfo

const PokemonInfoDataList = ({pokemonInfoData}) => {
  return (
    <DataList.Root orientation={{ initial: "vertical", sm: "horizontal" }}>

      <DataList.Item>
        <DataList.Label minWidth="80px">Height:</DataList.Label>
        <DataList.Value>
          <Badge color="jade" variant="soft" radius="full">
            {pokemonInfoData.height}
          </Badge>                
        </DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label minWidth="80px">Weight:</DataList.Label>
        <DataList.Value>
          <Badge color="jade" variant="soft" radius="full">
            {pokemonInfoData.weight}
          </Badge>
        </DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label minWidth="80px">Abilities:</DataList.Label>
        <DataList.Value>
          <Box>
          {pokemonInfoData.abilities?.map((item, idx) =>             
            <Text key={idx} as='p'>{item.ability.name}</Text>            
          )}
          </Box>            		   
        </DataList.Value>     
      </DataList.Item>

    </DataList.Root>
  )
}