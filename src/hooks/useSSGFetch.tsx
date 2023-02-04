import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import request, { gql } from 'graphql-request';

const useSSGFetch = () => {
  const [countryDetails, setCountryDetails] = useState<any[]>([]);

  const countryCode = useRouter().query.code as string;

  const countryName = countryDetails === undefined ? `` : countryDetails.name;

  const emoji = countryDetails === undefined ? `` : countryDetails.emoji;

  const countryLanguages = () =>
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
    (countryDetails === undefined || countryDetails.length === 0) &&
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
    emoji,
    countryLanguages,
  };
};

export default useSSGFetch;
