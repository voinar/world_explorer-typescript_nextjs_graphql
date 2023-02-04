import { request, gql } from 'graphql-request';
import { FunctionComponent, useEffect, useState } from 'react';
import Return from './components/Return';
import CountryTile from './components/CountryTile';
import styles from '@/styles/Home.module.css';

// Na route'ach SSG pobieraj przy pomocy GraphQL Request
// /countries -> SSG - pobiera listę państw i je wylistowuje:
// kafelek państwa zawiera: name, code + jest linkiem (przenosi do podstrony)

interface CountriesInterface {
  allCountriesData: [];
}

const Countries: FunctionComponent<CountriesInterface> = () => {
  const [allCountriesData, setAllCountriesData] = useState<any[]>([]);
  const GET_ALL_COUNTRIES = gql`
    {
      countries {
        code
        name
      }
    }
  `;

  useEffect(() => {
    request(`https://countries.trevorblades.com/`, GET_ALL_COUNTRIES).then(
      (data) => setAllCountriesData(data.countries),
    );
  }, [GET_ALL_COUNTRIES]);

  const CountriesList: any = () => {
    const data = allCountriesData.map((country, index) => (
      <CountryTile country={country} index={index} key={index} />
      // </a>
    ));

    return data;
  };

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
