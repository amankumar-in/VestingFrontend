import React from "react";
import { Dialog, DialogContent, Box, Slide, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useSwitchNetwork } from "wagmi";
import { StyledButton } from "./components/SmallComponents/AppComponents";
import { errorPng } from "./components/SmallComponents/Images";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledModal = withStyles(() => ({
  root: {
    "& .MuiDialog-root": {
      zIndex: "1301 !important",
    },
    "&.MuiDialog-container": {
      overflowY: "hidden !important",
    },
    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: "black",
      height: "auto",
      boxShadow: "black 0px 0px 8px 1px",
      //   border: "5px solid black",
      borderRadius: "10px",
    },
    "& .dialoge__content__section": {
      background: "black!important",
      borderRadius: "10px",
      border: "1px solid transparent",
    },
    "& .MuiDialogContent-root": {
      paddingTop: "20px",
      paddingBottom: "20px",
    },
  },
}))(Dialog);

export default function NetworkSwitch({ open, setOpen }) {
  const { switchNetwork } = useSwitchNetwork();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="modal__main__container">
      <StyledModal
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        // eslint-disable-next-line jsx-a11y/aria-props
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="dialoge__content__section">
          <Box
            borderRadius="100px"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width={{ xs: "35%", sm: "25%" }}
            >
              <Box component={"img"} width="100%" src={errorPng} alt="" />
            </Box>
            <Typography
              mt={2}
              sx={{
                fontSize: { xs: "20px", sm: "26px" },
                fontWeight: "400",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Switch to Sepolia Network
            </Typography>
            <Typography
              mt={2}
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              You are currently connected to the wrong network. Kindly switch to
              the appropriate network.
            </Typography>
            <Box mt={2}>
              <StyledButton
                width="230px"
                onClick={() => {
                  switchNetwork?.(1);
                  setOpen(false);
                }}
              >
                Switch Network
              </StyledButton>
            </Box>
          </Box>
        </DialogContent>
      </StyledModal>
    </div>
  );
}
