import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FaMusic } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function ContainedButtons({ libraryStatus, setLibraryStatus }) {
  const classes = useStyles();
  const openLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  };
  return (
    <div className={classes.root}>
      <Button onClick={openLibraryHandler} variant="contained" color="primary">
        {<FaMusic />}
      </Button>
    </div>
  );
}

export default ContainedButtons;
