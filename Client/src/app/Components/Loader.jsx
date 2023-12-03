import styles from '../Styles/Loader.module.css'

const Loader = ({ size = 25 }) => {
  return (
    <div style={{ width: size, height: size }} className={styles.spinner} />
  );
}

export default Loader;
