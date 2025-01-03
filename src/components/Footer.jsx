import React from 'react'
import { Text, Link, Box } from "@radix-ui/themes";
import { FaCanadianMapleLeaf } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{backgroundColor: "var(--gray-2)"}}>
      <Box p="5" align='center'>
        <Text as='p' display={'block'}>
          Made in Toronto <FaCanadianMapleLeaf color='orange' style={{display: "inline"}}/> Canada, by <Link target='_blank' weight='bold' textDecoration='underline' href='https://kaue.ca'>Kaue</Link>.        
        </Text>
        <Text as='p'>
          This is a test project, you can find the <Link target='_blank' weight='bold' textDecoration='underline' href='https://github.com/kauecode/pokemons'>source code here</Link>.
        </Text>        
      </Box>
    </footer>		
  )
}

export default Footer