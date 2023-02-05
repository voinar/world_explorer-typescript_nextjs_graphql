import styles from '@/styles/Home.module.css';
import useSSGFetch from '../../hooks/useSSGFetch';
import { SpinnerDotted } from 'spinners-react';
import Return from '../components/Return';

const CountryPage: React.FC = () => {
  const {
    countryCode,
    countryDetails,
    countryName,
    countryEmoji,
    countryOfficialLanguages,
  } = useSSGFetch();

  const CountryCode = () => {
    return <h2>Country code: {countryCode}</h2>;
  };

  const CountryName = () => {
    return <h1>{countryName}</h1>;
  };

  const CountryEmoji = () => {
    return <h3>{countryEmoji}</h3>;
  };

  const CountryLanguages = () => {
    return (
      <>
        <ul>
          Official languages:
          {countryOfficialLanguages().length !== 0 ? (
            countryOfficialLanguages()
          ) : (
            <li>None :)</li>
          )}
        </ul>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.countryPage}>
        <Return />
        {!countryDetails ? (
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
