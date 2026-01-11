'use client';

import * as React from 'react';
import { useSendTransaction, useAccount } from 'wagmi'; 
import { parseEther, isAddress } from 'viem'; 

export function SendTransaction() {
  const { address: senderAddress } = useAccount();
  const { sendTransaction, data: hash, isPending, error } = useSendTransaction();

  // State for form inputs
  const [recipient, setRecipient] = React.useState('');
  const [amount, setAmount] = React.useState('0.0001');

  // State to store details of the last successful transaction
  const [lastTx, setLastTx] = React.useState<{
    from: string;
    to: string;
    hash: string;
  } | null>(null);

  // Updates the "Last Transaction" state when a new hash is generated
  React.useEffect(() => {
    if (hash && senderAddress) {
      setLastTx({
        from: senderAddress,
        to: recipient,
        hash: hash,
      });
    }
  }, [hash, senderAddress, recipient]);

  // Function to generate a random valid-looking address
  function fillRandomAddress() {
    // Generates a random hex string of 40 characters
    const randomHex = Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setRecipient(`0x${randomHex}`);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault(); 
    if (!isAddress(recipient)) {
      alert('Invalid Wallet Address');
      return;
    }
    sendTransaction({
      to: recipient as `0x${string}`,
      value: parseEther(amount), 
    });
  }

  return (
    <div className="w-full max-w-lg p-6 mt-8 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Transfer ETH</h2>
      
      <form onSubmit={handleSend} className="flex flex-col gap-4">
        
        {/* Recipient Input + Random Button */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Recipient Address
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="0x..." 
              required
              className="flex-1 p-3 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <button
              type="button"
              onClick={fillRandomAddress}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium text-sm transition"
            >
              Random
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount (ETH)
          </label>
          <input 
            type="number" 
            step="0.000000000000000001"
            placeholder="0.0001" 
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button 
          type="submit"
          disabled={isPending || !recipient || !amount}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? 'Confirming...' : 'Send Transaction'}
        </button>

        {error && (
          <div className="text-red-500 text-sm mt-2 text-center bg-red-100 dark:bg-red-900/20 p-2 rounded">
            {error.message.split('\n')[0]} 
          </div>
        )}
      </form>

      {/* SUCCESS RECEIPT: Shows Sender, Recipient, and Hash */}
      {lastTx && (
        <div className="mt-8 p-5 bg-green-50 border border-green-200 rounded-xl dark:bg-green-900/20 dark:border-green-800">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-green-800 dark:text-green-400 text-lg">Transaction Sent!</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            
            {/* Sender */}
            <div>
              <p className="font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase">From (You)</p>
              <p className="font-mono text-gray-900 dark:text-gray-200 break-all bg-white dark:bg-black/30 p-2 rounded border border-gray-200 dark:border-gray-700">
                {lastTx.from}
              </p>
            </div>

            {/* Recipient */}
            <div>
              <p className="font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase">To (Recipient)</p>
              <p className="font-mono text-gray-900 dark:text-gray-200 break-all bg-white dark:bg-black/30 p-2 rounded border border-gray-200 dark:border-gray-700">
                {lastTx.to}
              </p>
            </div>

            {/* Hash */}
            <div>
              <p className="font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase">Transaction Hash</p>
              <div className="flex flex-col gap-1">
                <p className="font-mono text-gray-900 dark:text-gray-200 break-all bg-white dark:bg-black/30 p-2 rounded border border-gray-200 dark:border-gray-700">
                  {lastTx.hash}
                </p>
                <a 
                  href={`https://sepolia.etherscan.io/tx/${lastTx.hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline text-xs text-right mt-1"
                >
                  View on Explorer &rarr;
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}