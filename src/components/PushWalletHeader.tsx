import React from "react";
import {
  PushUniversalAccountButton,
  usePushChainClient,
} from "@pushchain/ui-kit";

export default function PushWalletHeader(): JSX.Element {
  const { pushChainClient, isInitialized } = usePushChainClient();

  // safe short address helper
  const shortAddress = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {/* Button will reflect connected state via hook */}
      <PushUniversalAccountButton
        connectButtonText={isInitialized ? "Connected ✅" : "Connect Account"}
      />

      {isInitialized && pushChainClient && (
        <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1 }}>
          <div>{shortAddress(pushChainClient.universal.account)}</div>
          <div style={{ opacity: 0.75, fontSize: 11 }}>
            {pushChainClient.universal.origin.chain}
          </div>
        </div>
      )}
    </div>
  );
}
