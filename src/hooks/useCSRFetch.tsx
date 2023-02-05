import { useEffect, useState } from 'react';
import { client } from '../graphql/client';
import { gql } from '@apollo/client';
import { Country } from '@/gql/graphql';

type DefaultData = {
  name: string;
  code: string;
  emoji: string;
  languages: {
    name: string;
  }[];
};

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

  const [profileCountryDetails, setProfileCountryDetails] = useState<
    Country | DefaultData
  >(defaultData);

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
