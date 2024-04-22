import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import {
  StyledButton,
  ToastNotify,
} from "../components/SmallComponents/AppComponents";
import {
  tokenReadFunction,
  vestingReadFunction,
  vestingWriteFunction,
} from "../ConnectivityAssets/hooks";
import { AppContext } from "../utils";
import { formatUnits } from "viem";
import Loading from "../components/SmallComponents/loading";
import { vestingAddress } from "../ConnectivityAssets/environment";

function HeroSection() {
  const { account } = useContext(AppContext);
  const [yourClaimAble, setyourClaimAble] = useState(0);
  const [loading, setloading] = useState(false);
  const [callFunction, setCallFunction] = useState(true);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const showAlert = (message, severity = "error") => {
    setAlertState({
      open: true,
      message,
      severity,
    });
  };
  useEffect(() => {
    if (account) {
      (async () => {
        try {
          const dec = await tokenReadFunction("decimals");
          const userData = await vestingReadFunction("users", [account]);
          setyourClaimAble(
            formatUnits(userData[1]?.toString(), +dec.toString())
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [account, callFunction]);
  const claimHandler = async () => {
    if (!account) {
      return showAlert("Error! Please connect your wallet.");
    }
    try {
      setloading(true);
      await vestingWriteFunction("claimAmount");
      setCallFunction(false);
      setloading(false);
      showAlert("Success! Transaction Confirmed", "success");
    } catch (error) {
      setloading(false);
      showAlert(error?.shortMessage);
    }
  };
  return (
    <>
      <Loading loading={loading} />
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <Box>
        <Container maxWidth="sm">
          <Stack
            mt={4}
            sx={{
              background: "#0d1824",
              px: { xs: 2, sm: 4 },
              py: 2,
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "#EBE9ED",
                fontSize: account ? "30px" : "15px",
                fontFamily: "Outfit",
                fontWeight: account ? "700" : "400",
                textAlign: "center",
              }}
            >
              {account
                ? "Your TUIT holdings"
                : "Connect your Metamask wallet to view your TUIT holdings"}
            </Typography>
            <Stack
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent={"space-between"}
              gap={{ xs: 1, sm: 0 }}
              alignItems={{ xs: "start", md: "center" }}
              mt={2}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#EBE9ED",
                  fontSize: "20px",
                  fontFamily: "Outfit",
                  lineHeight: "32px",
                  fontWeight: "600",
                  textAlign: "Left",
                }}
              >
                Total Purchased TUIT
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#1F60C9",
                  fontSize: "20px",
                  fontFamily: "Outfit",
                  lineHeight: "32px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {parseFloat(yourClaimAble).toFixed(0)}
              </Typography>
            </Stack>

            <Box mt={2} />
            <StyledButton onClick={() => claimHandler()} width="100%">
              Withdraw TUIT
            </StyledButton>
            <Box mt={1} />
            <a
              href={`https://etherscan.io/address/${vestingAddress}`}
              target="_blank"
              style={{
                color: "#1F60C9",
                fontSize: "16px",
                fontFamily: "Outfit",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {" "}
              View Smart Contract
            </a>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#EBE9ED",
                fontSize: "15px",
                fontFamily: "Outfit",
                fontWeight: "400",
                textAlign: "center",
                mt: 2,
              }}
            >
              Write to us at info@coinsforcollege.org for any queries about you
              vested tokens and release schedule.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default HeroSection;
