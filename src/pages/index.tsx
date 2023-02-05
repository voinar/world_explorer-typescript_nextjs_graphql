import { Head, styles, CountryTile, client, ApolloProvider } from '../imports';
import useCSRFetch from '../hooks/useCSRFetch';

const profileCountry = `PL`; // default profile country

export default function Home() {
  const { profileCountryDetails } = useCSRFetch(profileCountry);

  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <Head>
          <title>World Explorer</title>
          <meta name="description" content="Welcome to Countries Explorer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="./countries">World Explorer!</a>
          </h1>

          <p className={styles.description}>Get started:</p>

          <div className={styles.grid}>
            <a href="./countries" className={styles.card}>
              <h2>All Countries &rarr;</h2>
              <p>View full list of countries</p>
            </a>

            <CountryTile country={profileCountryDetails} />
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://github.com/voinar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by Marcin Wojnar
            <span className={styles.logo}></span>
          </a>
        </footer>
      </div>
    </ApolloProvider>
  );
}
