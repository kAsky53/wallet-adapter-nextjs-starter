import { Button } from '@mui/material';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import axios from 'axios';
import { useNotify } from './notify';

export const SendBuyTransaction: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const notify = useNotify();

    const onClick = useCallback(async () => {
        if (!publicKey) {
            notify('error', 'Wallet not connected!');
            return;
        }

        let signature: TransactionSignature = '';
        try {
            const { data } = await axios.post('/api/auction-house/buy', {
                "wallet": publicKey.toBase58(),
                // we can get auction house key from the api below
                // https://ah-demo.beta.live/api/auction-house/show
                "auctionHouse": "AXT22CtoqLUXHqJKBp5Bgz6zWFaWuFypLKBCTv5p6LbW",
                // https://solscan.io/token/LN1BZi5KKAhGooRa7Pjqtq7UpSVT8LK1sYT8RBEqMfB?cluster=devnet
                "mint": "LN1BZi5KKAhGooRa7Pjqtq7UpSVT8LK1sYT8RBEqMfB",
                "buyPrice": 0.2,
                "tokenSize": 1
            })
            const transaction = Transaction.from(new Uint8Array(data.buff.data));
            console.log(transaction);

            signature = await sendTransaction(transaction, connection);
            notify('info', 'Transaction sent:', signature);

            await connection.confirmTransaction(signature, 'processed');
            notify('success', 'Offer successful!', signature);
        } catch (error: any) {
            notify('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);

    return (
        <Button variant="contained" color="secondary" onClick={onClick} disabled={!publicKey}>
            Offer 0.2 SOL
        </Button>
    );
};
