import styles from './CardItem.module.css'
import notFoundImage from '../../assets/not-found-image.jpg'
import Spinner from './Spinner/Spinner'
import Stars from './Stars/Stars'
import { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'



const CardItem = (props) => {
  const [rate, setRate] = useState(0)
  const [spinner, setPoster] = useState(<Spinner />)
  const [genres, setGenres] = useState([])  

  let posterImage = `https://image.tmdb.org/t/p/original/${props.poster}`

  //let reit = props.reit.toFixed(1)
  
  useEffect(() => {
    genry()
  }, [])

  async function genry () {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=37dbc229629046beea70425741f436fd&append_to_response=credits`)
    const data = await response.json()       
    setGenres(data.genres)    
  }

  if(props.poster === null) {
    posterImage = notFoundImage
  }

  const posterHandler = () => {
    setPoster('')
  }

  let date = 'Sorry no info from date relise'
  let description = 'Sorry no info from description'
  let notGenre = 'Sorry no info from genres'

  if(props.date.length > 0){
    date = format(parse(props.date, 'yyyy-MM-dd', new Date()), 'MMMM dd,yyyy')
  }  

  if(props.description.length > 0){
    description = props.description
  }


  const addFilms = (id, event) => {    
    setRate(event)
    localStorage.setItem(`${id}`, `${event}`)    
  }
  
  useEffect(() => {    
    setRate(Number(localStorage.getItem(`${props.id}`)))
  }, [])
 
  let borderColor = ''

  if(rate >= 0 && rate <= 3){
    borderColor = '#E90000'
  } else if (rate > 3 && rate <= 5){
    borderColor = '#E97E00'
  } else if (rate > 5 && rate <= 7){
    borderColor = '#E9D100'
  } else {
    borderColor = '#66E900'
  }



  return (    
    <div className={styles.card_item}>
      {spinner}
      <img className={styles.card_item_poster} alt='poster' src={posterImage} onLoad={posterHandler}/>
      <div className={styles.card_description_wrapper}>
        <div className={styles.card_description}>
          <div className={styles.title_wrapper}>
            <h3 className={styles.title}>{props.name}</h3>
            <div className={styles.title_reit_border} style = {{borderColor: `${borderColor}`}}>
              <span className={styles.title_reit}>{rate === 10 ? rate : rate.toFixed(1)}</span>
            </div>          
          </div>
          <span className={styles.date}>{date}</span>
          <div className={styles.genre_wrapper}>
            { genres.length === 0 ? <span className={styles.notGenre}>{notGenre}</span> : 
              genres.map(el => {
                return <span className={styles.genre} key={el.id}>{el.name}</span>
              })
            }
          </div>
          <div className={styles.description_wrapper}>
            <p className={styles.description_movie}>{description}</p>
          </div>        
          
        </div>  
        <Stars reit={props.reit} addFilms={addFilms} id={props.id} name={props.name}/> 
      </div>         
    </div>
  )
}



export default CardItem