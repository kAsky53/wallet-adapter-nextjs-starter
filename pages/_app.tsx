import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { FC, ReactNode } from 'react';

// Use require instead of import, and order matters
require('../styles/globals.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const ContextProvider = dynamic<{ children: ReactNode }>(
    () => import('../components/ContextProvider').then(({ ContextProvider }) => ContextProvider),
    {
        ssr: false,
    }
);

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Auction House Demo</title>
            </Head>
            <ContextProvider>
                <Component {...pageProps} />
            </ContextProvider>
        </>
    );
};

export default App;
