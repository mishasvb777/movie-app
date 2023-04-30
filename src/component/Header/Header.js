import styles from './Header.module.css'
import { Radio } from 'antd';

const Header = (props) => {

  const searchHandler = (event) => {    
    props.getRequest(event.target.value)
  }

  const stylesButton = {
    borderInlineStart: 0,
    borderRadius: 0
  }
  
  return(
    <header className={styles.header}>       
      <div className={styles.button_wrapper}> 
        <Radio.Group defaultValue="Search"  className={styles.button_wrapper}>
          <Radio.Button className={styles.button} value="Search" onClick={props.searchFilms} style={stylesButton}>Search</Radio.Button>
          <Radio.Button className={styles.button} value="Rated" onClick={props.ratedFilms } style={stylesButton}>Rated</Radio.Button>          
        </Radio.Group>  
      </div>
      {
        !props.visibel && <input className={styles.input} placeholder='Type to search...' onChange={searchHandler}/>        
      }      
    </header>
  ) 
}

export default Header;