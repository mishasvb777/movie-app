import CardItem from "../CardItem/CardItem"
import styles from './CardList.module.css'
import Alerts from "./Alert/Alert"

const CardList = (props) => { 

  
  
  return (
    <main className={styles.main}>
      <ul className={styles.card_list}>
        { props.error && props.movies.length === 0 && <h1>{<Alerts errorText = {props.error}/> }</h1>}
        { props.startPage && props.error === null && props.visibel === false && <h2>Введите запрос для поиска</h2>}
        { props.error === null && props.movies.length === 0 && !props.startPage && <Alerts errorText = 'Ничего не найдено'/> }
        { props.movies.length > 0 && props.movies.map(movie => {                        
          return <CardItem 
                  name={movie.original_title} 
                  description={movie.overview} 
                  poster={movie.poster_path} 
                  key={movie.id} 
                  date={movie.release_date}
                  reit={Number(localStorage.getItem(`${movie.id}`)) || 0}
                  id={movie.id}
                  addRatedFilms = {props.addRatedFilms}
                />
        })}
      </ul>
    </main>
    
  )
}

export default CardList