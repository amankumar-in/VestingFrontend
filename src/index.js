import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { ConectivityProvider } from "./utils";

// wallet start

const projectId = "cba73ada547c01c1a64d7725fb732495";
const chains = [mainnet];

const wagmiConfig = defaultWagmiConfig({ chains, projectId });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
});
// wallet end
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <ConectivityProvider>
        <App />
      </ConectivityProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
