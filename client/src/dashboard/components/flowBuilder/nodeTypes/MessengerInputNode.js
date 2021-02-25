import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { memo } from "react";
import { Handle } from "react-flow-renderer";

export default memo(({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.nodeContainer}>
      <Handle
        id="a"
        type="source"
        position="right"
        className={classes.rightTopHandle}
      />
      <div>
        Hello
        <div className={classes.subContainer}>
          <Handle
            id="b"
            type="source"
            position="right"
            className={classes.internalHandle}
          />
        </div>
      </div>

      {/* <Handle
        type="source"
        position="left"
        style={{ background: "#1A90F1" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      /> */}
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
  nodeContainer: {
    padding: "20px",
    textAlign: "center",
    border: "1px solid black",
    borderRadius: "15px",
  },

  subContainer: {
    height: "50px",
    width: "100px",
    borderRadius: "15px",
    border: "2px dotted lightGreen",
  },

  rightTopHandle: {
    background: "#1A90F1",
    top: "10px",
    // rigth: "0",
    height: "10px",
    width: "10px",
  },

  internalHandle: {
    background: "red",
    position: "relative",
    top: "15px",
    // right: "0px",
    left: "95%",

    height: "10px",
    width: "10px",
  },
}));
