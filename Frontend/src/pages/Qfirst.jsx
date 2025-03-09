import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const tests = [
  { name: "General Mental Health Test", route: "/Quest" },
  { name: "Youth Mental Health Test", route: "/Ymht" },
  { name: "Anxiety Test", route: "/Anxiety" },
  { name: "ADHD Test", route: "/Adhd" },
  { name: "Bipolar Test", route: "/Bipolar" },
  { name: "Depression Test", route: "/Depression" },
  { name: "Addiction Test", route: "/Addiction" },
  { name: "Parent Test: Your Child’s Mental Health", route: "/Ptest" }
];

const Qfirst = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#E3F2FD",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // ✅ Centers everything vertically
        alignItems: "center", // ✅ Centers horizontally
        p: 2,
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" maxWidth={800} mx="auto" mb={2}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Take a Mental Health Test
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={1}>
          Online screening is one of the quickest and easiest ways to determine
          whether you are experiencing symptoms of a mental health condition.
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" mt={1}>
          Mental health conditions, such as depression or anxiety, are real,
          common, and treatable. And recovery is possible.
        </Typography>
      </Box>

      {/* Two-Column Grid of Test Buttons */}
      <Grid
        container
        spacing={0} // ✅ No extra spacing
        rowSpacing={2} // ✅ Removes default row spacing
        columnSpacing={1} // ✅ Keeps columns slightly apart
        maxWidth={900}
        mx="auto"
        sx={{ alignItems: "flex-start" }} // ✅ Aligns to start to prevent extra gaps
      >
        {tests.map((test, index) => (
          <Grid item xs={12} sm={6} key={index} sx={{ mb: 0 }}> {/* ✅ Removes extra bottom margin */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#00838F",
                color: "white",
                fontWeight: "bold",
                maxWidth: "400px",
                mx: "auto",
                p: 1.2, 
                textTransform: "none",
                fontSize: "1.1rem",
                "&:hover": { backgroundColor: "#006064" },
                minHeight: "50px", // ✅ Consistent height, no extra space
                lineHeight: "normal", // ✅ Prevents text from pushing button size
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
