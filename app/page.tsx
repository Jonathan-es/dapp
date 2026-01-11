import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SendTransaction } from './send-transaction';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-black">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center gap-8 font-sans">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-white">
            Sepolia Transfer
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Connect your wallet and send testnet ETH securely.
          </p>
        </div>

        {/* Wallet Connection */}
        <ConnectButton showBalance={false} />

        {/* The Transfer Card */}
        <SendTransaction />
        
      </div>
    </main>
  );
}