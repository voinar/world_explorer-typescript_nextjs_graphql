// Na route'ach CSR pobieraj przy pomocy Apollo Client
// /:profile -> CSR - pobiera informacje o Polsce (tak jakby użytkownik miał Polskę wybraną w swoim profilu):
// kafelek Polski zawiera: name, code + jest linkiem (przenosi do podstrony)

import styles from '@/styles/Home.module.css';

interface CountryTileInterface {
  country: any;
  index?: number;
  key?: number;
}

const CountryTile: React.FC<CountryTileInterface> = (country, index) => (
  <>
    <a
      href={`./countries/${country.country.code}`}
      className={styles.card}
      key={index}
    >
      <h2>{country.country.name} </h2>
      <p>{country.country.code} </p>
    </a>
  </>
);

export default CountryTile;
