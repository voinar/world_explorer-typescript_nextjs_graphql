import { request, gql } from 'graphql-request';
import { Country } from '@/gql/graphql';
import { useEffect, useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import Return from './components/Return';
import CountryTile from './components/CountryTile';
import styles from '@/styles/Home.module.css';

const Countries = () => {
  const [allCountriesData, setAllCountriesData] = useState<[]>([]);

  const CountriesList:
    | React.FC<Country>
    | (() => JSX.Element | JSX.Element[])
    | (() => Element | Element[]) = () => {
    return allCountriesData.length !== 0 ? (
      allCountriesData.map((country, index) => (
        <CountryTile country={country} index={index} key={index} />
      ))
    ) : (
      <SpinnerDotted />
    );
  };

  useEffect(() => {
    const GET_ALL_COUNTRIES = gql`
      query getAllCountries {
        countries {
          code
          name
        }
      }
    `;

    request(`https://countries.trevorblades.com/`, GET_ALL_COUNTRIES).then(
      (data) => setAllCountriesData(data.countries),
    );
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Return />
        <header>Explore all countries &rarr;</header>
        <div className={styles.grid}>
          <CountriesList />
        </div>
      </main>
    </div>
  );
};

export default Countries;
