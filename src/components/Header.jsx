import React from "react";
import { Container, Box } from "@mui/material";
import { logo } from "./SmallComponents/Images";
import { ExampleButton } from "./SmallComponents/StyledWalletButton";

export default function Header() {
  return (
    <>
      <Box
        sx={{
          background: "transparent",
        }}
        height="92px"
        width="100%"
        py={1}
      >
        <Container maxWidth="xl">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img width="60px" src={logo} alt="" />

            <ExampleButton />
          </Box>
        </Container>
      </Box>
    </>
  );
}
