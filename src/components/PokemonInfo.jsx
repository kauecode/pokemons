import React from 'react'
import usePokemonInfo from '../hooks/usePokemonInfo'
import { Tooltip, Card, Inset, Badge, DataList, Heading, Flex, Skeleton, Spinner } from "@radix-ui/themes";
import styles from './pokemonInfo.module.scss';


const PokemonInfo = ({ pokemon, handleCapture, isCaptured }) => {

  const {data:pokemonInfoData, error, isLoading} = usePokemonInfo(pokemon.name);

  if (isCaptured) {
    const elem = document.querySelector(".card-" + pokemon.name);
    elem.classList.add(styles.captured);    
  }

  if (error) 
		return <p>Sorry, there was a problem on usePokemonInfo, check the console - ERR: {error.message}</p>
  
  return ( 
    <>      
    <Tooltip content={isCaptured ? "CAPTURED" : "Click to capture!"}>
      <Card 
        onClick={() => !isCaptured && handleCapture(pokemon.name)} 
        className={`${styles.pokemonCard} card-${pokemon.name}`} 
        size="4" 
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
        <Heading as='h3' style={{marginBottom: "20px"}}>{pokemon.name.toUpperCase()}</Heading>
        <DataList.Root>
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
              {pokemonInfoData.abilities?.map((item, idx) => 
                <React.Fragment key={idx}>
                {item.ability.name} <br/>
                </React.Fragment>
              )}            		   
            </DataList.Value>     
          </DataList.Item>
        </DataList.Root>
      </Card>   
    </Tooltip>       
    </>
  )
}

export default PokemonInfo