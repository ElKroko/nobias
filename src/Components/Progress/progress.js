import React, { useEffect, useState } from "react";
import { LinearProgress } from '@mui/material';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  green: {
    backgroundColor: "#4f0069 !important",
  },
  barGreen: {
    backgroundColor: "#66da81 !important",
  },
  barYellow2: {
    backgroundColor: "#B4D95C !important",
  },
  barYellow: {
    backgroundColor: "#DDC928 !important",
  },
  barOrange: {
    backgroundColor: "#EFBC72 !important",
  },
  barRed: {
    backgroundColor: "#D95C5C !important",
  },
  backGroundBar: {
    backgroundColor: "#A5A6F6 !important"
  }
}));

const ProgressBar = (props) => {

  const { result } = props;
  const classes = useStyles();
  const [barColor, setBarColor] = useState("");

  useEffect(() => {

    if (result >= 80) {
      setBarColor(classes.barRed);
    } else if (result >= 60) {
      setBarColor(classes.barOrange);
    } else if (result >= 30){
      setBarColor(classes.barYellow);
    } else if (result >= 10){
      setBarColor(classes.barYellow2);
    } else {
      setBarColor(classes.barGreen);
    }

  }, [])

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={result}
          sx={{ borderRadius: 5, height: 10 }}
          classes={{
            colorPrimary: classes.backGroundBar,
            barColorPrimary: barColor,
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${result}%`}</Typography>
      </Box>
    </Box>
  );

}

export default ProgressBar;
