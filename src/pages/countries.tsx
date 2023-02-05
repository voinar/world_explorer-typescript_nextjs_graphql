import {
  request,
  gql,
  useEffect,
  useState,
  SpinnerDotted,
  Return,
  CountryTile,
  styles,
} from '../imports';
import { Country } from '@/gql/graphql';
import getAllCountries from 'src/graphql/getAllCountries.graphql';

const Countries = () => {
  const [allCountriesData, setAllCountriesData] = useState<[]>([]);

  const CountriesList:
    | React.FC<Country>
    | (() => JSX.Element | JSX.Element[]) = () => {
    return allCountriesData ? (
      allCountriesData.map((country, index) => (
        <CountryTile country={country} index={index} key={index} />
      ))
    ) : (
      <SpinnerDotted />
    );
  };

  useEffect(() => {
    const GET_ALL_COUNTRIES = gql`
      ${getAllCountries.getAllCountries.loc.source.body}
    `;

    request(`https://countries.trevorblades.com/`, GET_ALL_COUNTRIES).then(
      (data) => setAllCountriesData(data.countries),
    );
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Return />
        <h2>Explore all countries: </h2>
        <div className={styles.grid}>
          <CountriesList />
        </div>
      </main>
    </div>
  );
};

export default Countries;
