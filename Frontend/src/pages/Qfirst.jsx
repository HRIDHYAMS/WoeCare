import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const tests = [
  { name: "General Mental Health Test", route: "/Quest" },
  { name: "Youth Mental Health Test", route: "/ymht" },
  { name: "Anxiety Test", route: "/anxiety" },
  { name: "ADHD Test", route: "/adhd" },
  { name: "Bipolar Test", route: "/bipolar" },
  { name: "Depression Test", route: "/depression" },
  { name: "Addiction Test", route: "/addiction" },
  { name: "Parent Test: Your Child’s Mental Health", route: "/ptest" }
];

const Qfirst = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <Box
  sx={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #a8edea, #fed6e3)", // 🌈 Matches the slot booking gradient
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    p: 4,
  }}
>
  {/* Header Section */}
  <Box
    textAlign="center"
    maxWidth={800}
    mx="auto"
    mb={4} /* Increased bottom margin for breathing space */
    sx={{
      background: "rgba(255, 255, 255, 0.9)", /* Soft glassmorphism effect */
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Typography
      variant="h3"
      fontWeight="bold"
      color="#0077b6"
      fontFamily="'Dancing Script', cursive"
    >
      Take a Mental Health Test
    </Typography>
    <Typography variant="body1" color="#333" mt={2}>
      Online screening is one of the quickest and easiest ways to determine
      whether you are experiencing symptoms of a mental health condition.
    </Typography>
    <Typography variant="body1" fontWeight="bold" color="#0077b6" mt={1}>
      Mental health conditions, such as depression or anxiety, are real,
      common, and treatable. And recovery is possible.
    </Typography>
  </Box>

  {/* Two-Column Grid of Test Buttons */}
  <Grid
    container
    spacing={2}
    maxWidth={900}
    mx="auto"
    sx={{ alignItems: "center" }} /* Centers items better */
  >
    {tests.map((test, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "white",
            color: "#0077b6",
            fontWeight: "bold",
            maxWidth: "400px",
            mx: "auto",
            p: 1.5,
            textTransform: "none",
            fontSize: "1.2rem",
            borderRadius: "25px", /* Matches slot booking buttons */
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
              background: "#0077b6",
              color: "white",
            },
            minHeight: "50px",
            lineHeight: "normal",
          }}
          onClick={() => navigate(test.route)}
        >
          {test.name}
        </Button>
      </Grid>
    ))}
  </Grid>
</Box>

  );
};

export default Qfirst;
