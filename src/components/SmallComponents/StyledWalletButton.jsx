import { useWeb3Modal } from "@web3modal/wagmi/react";
import { StyledButton } from "./AppComponents";
import { useContext } from "react";
import { AppContext } from "../../utils";

export const ExampleButton = () => {
  const { account } = useContext(AppContext);
  const { open } = useWeb3Modal();

  return (
    <StyledButton onClick={async () => await open()}>
      {account
        ? account.slice(0, 4) + "..." + account.slice(-4)
        : "Connect Wallet"}
    </StyledButton>
  );
};
