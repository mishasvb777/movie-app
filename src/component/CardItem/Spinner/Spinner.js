import styles from './Spinner.module.css'

const Spinner = () => {
  return(
    <div className={styles.spinner_wrapper}>
      <div className={styles['lds-default']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>  
  )
}

export default Spinner