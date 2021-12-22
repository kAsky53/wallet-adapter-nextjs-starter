import { FormControlLabel, Switch, Tooltip } from '@mui/material';
import {
    WalletModalProvider as ReactUIWalletModalProvider,
    WalletMultiButton as ReactUIWalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { NextPage } from 'next';
import { useAutoConnect } from '../components/AutoConnectProvider';
import { RequestAirdrop } from '../components/RequestAirdrop';
import { SendBuyTransaction } from '../components/SendTransaction';

const Index: NextPage = () => {
    const { autoConnect, setAutoConnect } = useAutoConnect();

    return (
        <ReactUIWalletModalProvider>
            <ReactUIWalletMultiButton />
            <Tooltip title="Only runs if the wallet is ready to connect" placement="left">
                <FormControlLabel
                    control={
                        <Switch
                            name="autoConnect"
                            color="secondary"
                            checked={autoConnect}
                            onChange={(event, checked) => setAutoConnect(checked)}
                        />
                    }
                    label="AutoConnect"
                />
            </Tooltip>
            <RequestAirdrop />
            <SendBuyTransaction />
        </ReactUIWalletModalProvider>
    );
};

export default Index;
