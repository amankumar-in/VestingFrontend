import { useContext, useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./pages/HeroSection";
import { useNetwork } from "wagmi";
import { AppContext } from "./utils";
import NetworkSwitch from "./NetworkSwitch";
function App() {
  const { account } = useContext(AppContext);
  const [openNetworkSwitch, setOpenNetworkSwitch] = useState(false);
  const { chain } = useNetwork();

  useEffect(() => {
    if (account && chain && chain?.id !== 1) {
      setOpenNetworkSwitch(true);
    }
  }, [chain, account]);
  return (
    <>
      <NetworkSwitch open={openNetworkSwitch} setOpen={setOpenNetworkSwitch} />
      <Header />
      <HeroSection />
    </>
  );
}

export default App;
