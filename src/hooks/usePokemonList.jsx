import axiosInstance, { CanceledError } from '../services/api-service'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PAGE_SIZE } from '../config/constants'

const usePokemonList = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [params, setParams] = useState({limit: PAGE_SIZE, offset: 0})
  const [pages, setPages] = useState(0)

  const fetchNextPage = useCallback(() => {
    setParams(prev => ({limit: prev.limit, offset: prev.offset + prev.limit}))
  }, []);

  useEffect(() => { 

    setIsLoading(true);
    const controller = new AbortController()

    axiosInstance.get("pokemon", { signal: controller.signal, params })
      .then(res => {
        setTimeout(() => { 
          setPages(prev => prev + 1)
          setData(prev => [...prev, ...res.data.results])          
          setIsLoading(false); 
        }, 500) // Creates suspense, accomplishes nothing, but can you see the skeletons? :P
      }) 
      .catch(err => { 
        if (err instanceof CanceledError) return        
        console.log("FETCH ERROR FROM USEPOKEMONLIST:", err)             
        setError(err)
        setIsLoading(false)      
      }) 

      return () => controller.abort()

  }, [params] )

  return {data, error, isLoading, fetchNextPage, pages}
}

export default usePokemonList