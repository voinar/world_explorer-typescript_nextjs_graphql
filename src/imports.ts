// index of imports by category

// nextjs
import { useRouter } from 'next/router';
import router from 'next/router';
import Head from 'next/head';

// react hooks
import { useEffect, useState } from 'react';

// graphQL
import { request, gql } from 'graphql-request';
import { gql as gqlApollo } from '@apollo/client';
import { client } from './graphql/client';
import { ApolloProvider } from '@apollo/client';

// loading spinner
import { SpinnerDotted } from 'spinners-react';

// components
import Return from './pages/components/Return';
import CountryTile from './pages/components/CountryTile';

//styles
import styles from '@/styles/Home.module.css';

export {
  useRouter,
  router,
  Head,
  useEffect,
  useState,
  request,
  gql,
  gqlApollo,
  client,
  ApolloProvider,
  SpinnerDotted,
  Return,
  CountryTile,
  styles,
};
