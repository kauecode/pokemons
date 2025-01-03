import axios, { CanceledError } from 'axios'
import { useEffect, useState } from 'react'

const usePokemonList = () => {

  const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
  })

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [params, setParams] = useState({limit: 12, offset: 0})
  const [pages, setPages] = useState(0)

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController()
  
    axiosInstance.get("pokemon", { signal: controller.signal, params })
      .then(res => {
        setTimeout(() => { 
          setPages(prev => prev + 1)
          setData(prev => [...prev, ...res.data.results])
          setIsLoading(false); 
        }, 1000) // Creates suspense, accomplishes nothing :)
      }) 
      .catch(err => { 
        if (err instanceof CanceledError) return        
        console.log("FETCH ERROR FROM USEPOKEMONLIST:", err)             
        setError(err)
        setIsLoading(false)      
      }) 

      return () => {
        controller.abort()
      }

  },[params])

  const fetchNextPage = () => {
    setParams(prev => ({limit: prev.limit, offset: prev.offset + prev.limit}))
  }

  return {data, error, isLoading, fetchNextPage, pages}
}

export default usePokemonList