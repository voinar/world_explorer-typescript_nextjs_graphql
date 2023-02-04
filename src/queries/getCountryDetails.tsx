import { gql } from 'graphql-request';

export const GET_COUNTRY_DETAILS = gql`
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
