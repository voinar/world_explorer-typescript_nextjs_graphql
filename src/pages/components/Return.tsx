import { router, styles } from '../../imports';

const Return = () => (
  <button className={styles.return} onClick={() => router.back()}>
    <span>&larr;</span>
  </button>
);

export default Return;
