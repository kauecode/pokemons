import React from 'react'
import usePokemonInfo from '../../hooks/usePokemonInfo'
import { Tooltip, Card, Inset, Badge, DataList, Heading, Flex, Spinner, Text, Box } from "@radix-ui/themes";
import styles from './pokemonCard.module.scss';

const PokemonCard = ({ pokemon, handleCapture, isCaptured }) => {

  const {data:pokemonInfoData, error, isLoading} = usePokemonInfo(pokemon.name);

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
        size={{ initial: '2', lg: '4'}} 
        height="100%">
        <Inset clip="border-box" side="top" pb="current">
          {isLoading 
            ? (
            <Flex align='center' justify='center' width='100%' height='150px'>
              <Spinner size='3' />
            </Flex>
            ) : ( 
              pokemonInfoData?.sprites?.back_default && (
                <div className={styles.pokemonImgWrapper}>
                  <img
                    src={pokemonInfoData.sprites?.back_default} 
                    alt={pokemon.name}
                    className={styles.mainImage}
                  />
                  <img                  
                    src={pokemonInfoData.sprites?.other.showdown.front_default} 
                    alt={pokemon.name}
                    className={styles.hoverImage}
                  />
                </div>
              )
            )
          }
        </Inset>
        <Heading as='h3' size={{ initial: '2', lg: '4'}} mb={{ initial: '2', lg: '5'}}>{pokemon.name.toUpperCase()}</Heading>
        <PokemonCardDataList pokemonInfoData={pokemonInfoData}/>
      </Card>   
    </Tooltip>       
    </>
  )
}

export default PokemonCard

const PokemonCardDataList = ({pokemonInfoData}) => {
  return (
    <DataList.Root orientation={{ initial: "vertical", lg: "horizontal" }}>

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