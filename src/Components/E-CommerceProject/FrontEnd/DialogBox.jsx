import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

// ... (data array, if needed)

function Media(props) {
  const { loading = false, data = [] } = props; // Added data prop

  return (
    <Grid container wrap="nowrap">
      {loading
        ? Array.from(new Array(3)).map((item, index) => (
            <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          ))
        : // Render actual media items using data
          data.map((item, index) => (
            <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
              <img src={item.src} alt={item.title} />
              <Typography variant="body2">{item.title}</Typography>
              <Typography variant="caption">{item.channel}</Typography>
            </Box>
          ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object), // Added prop type for data
};

export default function DialogBox() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
    </Box>
  );
}
