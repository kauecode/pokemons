import React from 'react'
import { Container, Heading, Text } from "@radix-ui/themes";
import PokemonGrid from "./components/PokemonGrid"
import Footer from './components/Footer';

const App = () => {
	return (
		<>				
			<Container 
				p={{ initial: '2', md: '8' }} 
				size={{ xs: '1', sm: '2', md: '3', lg: '4' }}>
					<Heading align='center' my='2' as='h1'>Pokemons! Catch them all!!!</Heading>
					<Text as='p' mb='6' align='center'>Click on the pokemon cards to capture them, scroll down to check your stats.</Text>
					<PokemonGrid />
			</Container>
			<Footer />
		</>
	)
}

export default App