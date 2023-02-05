import { styles, SpinnerDotted } from '../../imports';

interface CountryTileInterface {
  country: {
    code: string;
    name: string;
  };

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
      {country.country.name.length === 0 ? (
        <SpinnerDotted />
      ) : (
        <>
          <h2>{country.country.name} </h2>
          <p>{country.country.code} </p>
        </>
      )}
    </a>
  </>
);

export default CountryTile;
