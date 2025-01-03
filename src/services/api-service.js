import axios from 'axios'

export const CanceledError = axios.CanceledError;

export default axios.create({
  baseURL: "https://pokeapi.co/api/v2/"
})