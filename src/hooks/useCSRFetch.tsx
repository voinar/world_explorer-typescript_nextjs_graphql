import { useEffect, useState } from 'react';
// import { gql } from '@apollo/client';
// import client from '../apollo-client';
import { client } from '../queries/client';
import { GET_COUNTRY_DETAILS } from '../queries/getCountryDetails';
import { gql } from '@apollo/client';

const useCSRFetch = (profileCountry: string) => {
  const defaultData = {
    name: ``,
    code: ``,
    emoji: ``,
    languages: [
      {
        name: ``,
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
    client
      .query({
        query: GET_COUNTRY_DETAILS,
        variables: {
          countriesFilter: {
            code: {
              eq: profileCountry,
            },
          },
        },
      })
      .then((data) => setProfileCountryDetails(data.data.countries[0]));
  }, [GET_COUNTRY_DETAILS, profileCountry]);

  return { defaultData, profileCountryDetails, setProfileCountryDetails };
};

export default useCSRFetch;
