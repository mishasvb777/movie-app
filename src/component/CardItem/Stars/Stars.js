import { useEffect, useState } from 'react';
import styles from './Stars.module.css'

import { Rate } from 'antd';

const Stars = (props) => {  

  const [rate, setRate] = useState()

  useEffect(()=>{
    
  }, [rate])

  const setRatedFilms = (event) => {    
    props.addFilms(props.id, event)
  }
  
  return (
    <div className={styles.stars_wrapper} >
      <Rate className={styles.stars} allowHalf defaultValue={props.reit} count={10} onChange={setRatedFilms}/>
    </div>
  )
}

export default Stars