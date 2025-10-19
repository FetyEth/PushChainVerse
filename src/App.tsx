import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";



import Index from "@/pages/Index";
import Wallets from "@/pages/Wallets";
import Transfer from "@/pages/Transfer";
import Analytics from "@/pages/Analytics";
import History from "@/pages/History";
import Recipients from "@/pages/Recipients";
import NotFound from "@/pages/NotFound";

import {
  PushUniversalWalletProvider,
  PushUI
} from "@pushchain/ui-kit";

import { config } from "./config/wagmi";
// if you have wagmi config defined elsewhere

// create query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <PushUniversalWalletProvider
      config={{ network: PushUI.CONSTANTS.PUSH_NETWORK.TESTNET }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "hsl(330, 80%, 55%)",
              accentColorForeground: "white",
              borderRadius: "large",
            })}
          >
            <TooltipProvider>
              <Toaster />
              <Sonner />

              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/wallets" element={<Wallets />} />
                  <Route path="/transfer" element={<Transfer />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/recipients" element={<Recipients />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PushUniversalWalletProvider>
  );
};

export default App;
