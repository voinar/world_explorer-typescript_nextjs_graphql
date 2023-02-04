import Head from 'next/head';
// import Image from 'next/image';
import CountryTile from './components/CountryTile';
import styles from '@/styles/Home.module.css';

import useCSRFetch from '../hooks/useCSRFetch';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: `https://countries.trevorblades.com/`,
  cache: new InMemoryCache(),
});

/////////////////
const GET_LOCATIONS = gql`
  query getCountryDetails($countriesFilter: CountryFilterInput) {
    countries(filter: $countriesFilter) {
      name
      code
      emoji
      languages {
        name
      }
    }
  }
`;

/////////////////
const profileCountry = `PL`;
////////////////

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    variables: {
      countriesFilter: {
        code: {
          eq: profileCountry,
        },
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log('data', data);

  return (
    <div>
      <h3>{data.countries[0].code}</h3>
      <h3>{data.countries[0].name}</h3>
      <h3>{data.countries[0].emoji}</h3>
    </div>
  );
}

export default function Home() {
  const { defaultData, profileCountryDetails, setProfileCountryDetails } =
    useCSRFetch();

  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <Head>
          <title>TypeScript starter for Next.js</title>
          <meta name="description" content="Welcome to Countries Explorer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="./countries">World Explorer!</a>
          </h1>

          <p className={styles.description}>
            Get started:
            {/* <code className={styles.code}>src/pages/index.tsx</code> */}
          </p>

          <div className={styles.grid}>
            <a href="./countries" className={styles.card}>
              <h2>All Countries &rarr;</h2>
              <p>View full list of countries available</p>
            </a>

            <CountryTile country={profileCountryDetails} />
            <DisplayLocations />
            {/* <ProfileTile countryCode={`PL`} /> */}
            {/*
          <a href="./profile" className={styles.card}>
            <h2>Profile &rarr;</h2>
            <p>View information about Poland</p>
          </a> */}

            {/* <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=typescript-nextjs-starter"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://github.com/voinar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by Marcin Wojnar
            <span className={styles.logo}>
              {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
            </span>
          </a>
        </footer>
      </div>
    </ApolloProvider>
  );
}
