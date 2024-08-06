import React, { createElement, useEffect, useState } from 'react'

const PokemonInfo = (props) => {

  return (
  <>
    <div className='pokemon-info'>
      <ul className='list-group'>
        <li className='list-group-item'>Height: {props.height}</li>
        <li className='list-group-item'>Weight: {props.weight}</li>
      </ul>
    </div>
  </>
  )
}

export default PokemonInfo