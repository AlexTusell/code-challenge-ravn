import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './themes';
import './index.css';
import 'react-day-picker/dist/style.css';
import { ViewContextProvider } from './contexts/ViewContext';
import { IDContextProvider } from './contexts/IDContext';

const httpLink = createHttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token =
    localStorage.getItem('token') ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiMDk3YTI3Zjk5YWE4IiwicHJvamVjdElkIjoiOWIyNDA4OGMtYWNkOC00ZTM2LWFhMzctYTdhNDVkZjk2ZmMxIiwiZnVsbE5hbWUiOiJBbGV4YW5kZXIgQW50b25pbyBHYWl0w6FuIFR1c2VsbCIsImVtYWlsIjoiYWxleGFuZGVyZ2FpdGFuMDNAZ21haWwuY29tIiwiaWF0IjoxNjczMzczNjk0fQ.Lr6dN-4mwfX6t4eEMVY87wRdi--oPJixzxOSpRQZTyI';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ViewContextProvider>
            <IDContextProvider>
              <App />
            </IDContextProvider>
          </ViewContextProvider>
        </ApolloProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
