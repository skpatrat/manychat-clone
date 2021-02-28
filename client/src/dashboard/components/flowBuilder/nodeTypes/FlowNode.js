import { Button,  makeStyles } from "@material-ui/core";
import React from "react";
import { Handle } from "react-flow-renderer";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const FlowNode = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.nodeContainer}>
      <Handle
        id={`payload_${data.node_id}`}
        type="target"
        position="left"
        className={classes.leftTopHandle}
      />
      <div>
        <div style={{ minWidth: "100px" }}>
          {data.text ? data.text : "Add text "}
        </div>
        {Object.keys(data.options).map((key) => (
          <div className={classes.subContainer}>
            <div
              style={{ position: "fixed", textAlign: "center", margin: "auto" }}
            >
              {data.options[key]}
            </div>
            <Handle
              id={`${key}`}
              type="source"
              position="right"
              className={classes.internalHandle}
            />{" "}
          </div>
        ))}

        <Button
          className={classes.subContainer}
          onClick={() => {
            console.log(data);
            data.addOption(data.node_id);
          }}
        >
          <AddCircleOutlineIcon style={{ color: "#888" }} />
          {/* <div>Add options</div> */}
        </Button>
      </div>

      {/* <Handle
        type="source"
        position="left"
        style={{ background: "#1A90F1" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      /> */}
    </div>
  );
};

export default FlowNode;

const useStyles = makeStyles((theme) => ({
  nodeContainer: {
    padding: "20px",
    textAlign: "center",
    border: "1px solid black",
    borderRadius: "15px",
    // backgroundColor: "white",
  },

  subContainer: {
    minHeight: "40px",
    // height: "40px",
    width: "100%",
    marginTop: "10px",
    padding: "5px",
    borderRadius: "15px",
    border: "1px solid grey",
  },

  leftTopHandle: {
    background: "lightRed",
    top: "50%",
    left: "-7px",
    height: "15px",
    width: "15px",
  },

  internalHandle: {
    background: "#1A90F1",
    // background: "red",
    position: "relative",
    top: "45%",
    // right: "0px",
    left: "95%",

    height: "15px",
    width: "15px",
  },
}));
