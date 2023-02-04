import { useEffect, useState } from 'react';
// import { gql } from '@apollo/client';
// import client from '../apollo-client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';

const useCSRFetch = () => {
  const defaultData = {
    name: `Poland`,
    code: `PL`,
    emoji: `🇵🇱`,
    languages: [
      {
        name: `Polish`,
      },
    ],
  };

  const [profileCountryDetails, setProfileCountryDetails] =
    useState(defaultData);

  const GET_COUNTRY_DETAILS = gql`
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

  useEffect(() => {
    const client = new ApolloClient({
      uri: `https://countries.trevorblades.com/`,
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: GET_COUNTRY_DETAILS,
      })
      .then((data) => setProfileCountryDetails(data.data.countries[0]));
  }, []);

  return { defaultData, profileCountryDetails, setProfileCountryDetails };
};

export default useCSRFetch;
