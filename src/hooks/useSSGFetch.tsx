import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import request, { gql } from 'graphql-request';
import { Country } from '@/gql/graphql';

const useSSGFetch = () => {
  const [countryDetails, setCountryDetails] = useState<Country>();
  const countryCode = useRouter().query.code as string;
  const countryName = countryDetails === undefined ? `` : countryDetails.name;
  const countryEmoji = countryDetails === undefined ? `` : countryDetails.emoji;

  const countryOfficialLanguages = () =>
    countryDetails === undefined
      ? ``
      : countryDetails.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ));

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
    countryDetails === undefined &&
      request(`https://countries.trevorblades.com/`, GET_COUNTRY_DETAILS, {
        countriesFilter: {
          code: {
            eq: countryCode,
          },
        },
      }).then((data) => setCountryDetails(data.countries[0]));
  }, [GET_COUNTRY_DETAILS, countryCode, countryDetails]);

  console.log(countryDetails);

  return {
    countryCode,
    countryDetails,
    setCountryDetails,
    countryName,
    countryEmoji,
    countryOfficialLanguages,
  };
};

export default useSSGFetch;
