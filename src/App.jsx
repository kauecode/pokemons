import React, {useState} from 'react'
import { Container, Heading, Text } from "@radix-ui/themes";
import PokemonGrid from "./components/PokemonGrid"
import Footer from './components/Footer';

const App = () => {
	return (
		<>				
			<Container 
				p={{ initial: '2', md: '8' }} 
				size={{ xs: '1', sm: '1', md: '3', lg: '4' }}>
					<Heading align='center' my='2' as='h1'>Pokémon! Catch them all!!!</Heading>
					<Text as='p' mb='6' align='center'>Click on the Pokémon cards to capture them. Once you’ve captured them all, more will be loaded for you automatically.</Text>
					<PokemonGrid />
			</Container>
			<Footer />
		</>
	)
}

export default App