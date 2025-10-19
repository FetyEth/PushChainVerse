import React from "react";
import { usePushChainClient, PushUI } from "@pushchain/ui-kit";

export default function PushClientComponent() {
  const { pushChainClient, isInitialized, error } = usePushChainClient();

  return (
    <div style={{ padding: "1rem", color: "white" }}>
      <h3>
        Chain Client Status:{" "}
        {isInitialized ? "Initialized 🎉" : "Not Initialized"}
      </h3>

      {pushChainClient && (
        <>
          <p>Executor: {pushChainClient.universal.account}</p>
          <p>
            Origin: {pushChainClient.universal.origin.address} | Chain:{" "}
            {pushChainClient.universal.origin.chain}
          </p>
        </>
      )}

      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
