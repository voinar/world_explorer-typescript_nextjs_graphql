// Na route'ach SSG pobieraj przy pomocy GraphQL Request
// /countres/:code -> SSG - pobiera informacje o danym państwie, np. /countries/fr przenosi do Francji:
// na takiej podstronie trzeba wyświetlić: name, code, emoji i languages (language.name)

import styles from '@/styles/Home.module.css';
import useSSGFetch from '../../hooks/useSSGFetch';
import { SpinnerDotted } from 'spinners-react';
import Return from '../components/Return';

const CountryPage: React.FC = () => {
  const {
    countryCode,
    countryDetails,
    setCountryDetails,
    countryName,
    emoji,
    countryLanguages,
  } = useSSGFetch();

  const CountryCode = () => {
    return <h2>Country code: {countryCode}</h2>;
  };

  const CountryName = () => {
    return <h1>{countryName}</h1>;
  };

  const CountryEmoji = () => {
    return <h3>{emoji}</h3>;
  };

  const CountryLanguages = () => {
    return (
      <>
        <ul>Languages: {countryLanguages()}</ul>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.countryPage}>
        <Return />
        {countryDetails?.length === 0 ? (
          <h1>
            <SpinnerDotted />
          </h1>
        ) : (
          <>
            <CountryName />
            <CountryCode />
            <CountryEmoji />
            <CountryLanguages />
          </>
        )}
      </main>
    </div>
  );
};

export default CountryPage;
