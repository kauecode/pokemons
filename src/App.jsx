import React from 'react'
import { Container, Heading } from "@radix-ui/themes";
import PokemonGrid from "./components/PokemonGrid"
import Footer from './components/Footer';

const App = () => {
	return (
		<>				
			<Container 
				p={{ initial: '2', md: '8' }} 
				size={{ xs: '1', sm: '2', md: '3', lg: '4' }}>
					<Heading align='center' my='6' as='h1'>Pokemons! Catch them all!!!</Heading>
					<PokemonGrid />
			</Container>
			<Footer />
		</>
	)
}

export default App