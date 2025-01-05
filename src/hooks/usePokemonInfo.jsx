import axiosInstance, { CanceledError } from '../services/api-service'
import { useEffect, useState } from "react";

const usePokemonInfo = (name) => {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    setIsLoading(true);
    const controller = new AbortController();

    axiosInstance.get("pokemon/" + name, {signal: controller.signal})
      .then(res => {
        setTimeout(() => { 
          setData(res.data)
          setIsLoading(false)
        }, 500) // Creates suspense, accomplishes nothing, but can you see the spinners? :P
      })
      .catch(err => {
        if (err instanceof CanceledError) return        
        console.log("FETCH ERROR FROM USEPOKEMONINFO:", err)             
        setError(err)
        setIsLoading(false)               
      })

      return () => controller.abort()

  }, [] )

  return {data, error, isLoading}
}

export default usePokemonInfo;

