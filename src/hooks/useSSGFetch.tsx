import { useRouter, useEffect, useState, request, gql } from '../imports';
import getCountryDetails from 'src/graphql/getCountryDetails.graphql';
import { Country } from '@/gql/graphql';

const useSSGFetch = () => {
  const [countryDetails, setCountryDetails] = useState<Country>();
  const countryCode = useRouter().query.code as string;
  const countryName = !countryDetails ? `` : countryDetails.name;
  const countryEmoji = !countryDetails ? `` : countryDetails.emoji;

  const countryOfficialLanguages = () =>
    !countryDetails
      ? ``
      : countryDetails.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ));

  const GET_COUNTRY_DETAILS = gql`
    ${getCountryDetails.getCountryDetails.loc.source.body}
  `;

  useEffect(() => {
    !countryDetails &&
      request(`https://countries.trevorblades.com/`, GET_COUNTRY_DETAILS, {
        countriesFilter: {
          code: {
            eq: countryCode,
          },
        },
      }).then((data) => setCountryDetails(data.countries[0]));
  }, [GET_COUNTRY_DETAILS, countryCode, countryDetails]);

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
