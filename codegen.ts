import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `https://countries.trevorblades.com/`,
  documents: `src/graphql/**/*.{gql,graphql}`,
  generates: {
    './src/gql/': {
      preset: `client`,
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: [`introspection`],
    },
  },
};

export default config;
