import './App.css';
import Alerts from './component/CardList/Alert/Alert';
import CardList from './component/CardList/CardList';
import Header from './component/Header/Header';
import Paginations from './component/Pagination/Pagination';
import { useState, useEffect } from 'react';

function App() {
  const [ratedMovies, setRatedMovies] = useState([])
  const [moviesData, setMoviesData] = useState('')  
  const [request, setRequest] = useState('')
  const [visibel, setVisibel] = useState(false)
  const [page, setPage] = useState(1)
  const [startPage, setStartPage] = useState(true)
  const [error, setError] = useState(null)

  const requestSerch = `https://api.themoviedb.org/3/search/movie?api_key=37dbc229629046beea70425741f436fd&query=${request}&page=${page}`
  const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=37dbc229629046beea70425741f436fd&page=${page}` 

  const ratedFilms = (value) => {
    setVisibel(true)
    setPage(1)
    ratedData()    
  }

  async function ratedData () {
    let arr = []
    for(let i = 0; i < localStorage.length; i++){
      let id = localStorage.key(i)
      const request = `https://api.themoviedb.org/3/movie/${id}?api_key=37dbc229629046beea70425741f436fd`
      const response = await fetch(request)
      const data = await response.json(); 
      arr.push(data)
    }
    setRatedMovies(arr)
  }

  const searchFilms = () => {
    setRequest('')
    setVisibel(false)
    setStartPage(true)
    setMoviesData('')
  }

  const nextPage = (value) => {  
    if(request.length === 0){
      setMoviesData('')
    }  
    setPage(value)    
  }
  
  const find = (value) => {
    if(value.length === 0){     
      setMoviesData('')
      setRequest(value)
      setStartPage(true)      
    }
    if(value.length > 0){
      setStartPage(false)
      setRequest(value)
    }    
  }
   
  useEffect(()=> {
    if(request.length > 0) {
      getMoviesData(requestSerch)
    }    
    if(visibel){
      getMoviesData(topRatedMovies)
    }    
  }, [page]) 


  useEffect(() => {
    const timer = setTimeout(() => {
      getMoviesData(requestSerch)
    }, 800)

    return () => {
      clearTimeout(timer)
    }
  }, [request])

  const addRatedFilms = (event) => {
    console.log(event)
  }

  async function getMoviesData (request)  {
    setError(null)
    try{
      const response = await fetch(request)
      if(!response.ok){
        throw new Error('что то пошло не так...')
      }
      const data = await response.json();          
      setMoviesData(data.results)
    } catch(err) {
      setError(err.message) 
      console.log(error)  
    }
  }

  
    
  return (
    <div className="App">
      <Header getRequest={find} ratedFilms={ratedFilms} searchFilms={searchFilms} visibel={visibel} />
      <CardList movies={ !visibel ? moviesData : ratedMovies} startPage={startPage} error={error} visibel={visibel} addRatedFilms={addRatedFilms} ratedMovies={ratedMovies}/>
      <Paginations nextPage={nextPage}/>
    </div>
  );
}
export default App;
