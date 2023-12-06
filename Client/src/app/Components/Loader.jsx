import styles from '../Styles/Loader.module.css'

const Loader = ({ size = 55 }) => {
  return (
    <div className={styles.spinnerContainer}>
       <div style={{ width: size, height: size }} className={styles.spinner} />
    </div>
   
  );
}

export default Loader;
