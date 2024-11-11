import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});

export const client = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});
