import styles from '@/styles/Home.module.css';
import router from 'next/router';

const Return = () => (
  <button className={styles.return} onClick={() => router.back()}>
    <span>&larr;</span>
  </button>
);

export default Return;
