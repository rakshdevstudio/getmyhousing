import React, { useState } from "react";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import PasswordForm from "./PasswordForm";
import { Box, useTheme } from "@mui/material";

const ResetPassword = () => {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleEmailSubmitted = (email) => {
    setEmail(email);
    setStep(2);
  };

  const handleOtpSubmitted = () => {
    setStep(3);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: { md: `url(/media/images/bg-login.jpg)` },
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: theme.spacing(3),
      }}
    >
      {step === 1 && <EmailForm onEmailSubmitted={handleEmailSubmitted} />}
      {step === 2 && (
        <OtpForm onOtpSubmitted={handleOtpSubmitted} email={email} />
      )}
      {step === 3 && <PasswordForm email={email} />}
    </Box>
  );
};

export default ResetPassword;
