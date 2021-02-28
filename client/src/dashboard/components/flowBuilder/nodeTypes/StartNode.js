import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Handle } from "react-flow-renderer";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const StartNode = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.nodeContainer}>
      <Handle
        id={`${data.node_id}_source`}
        type="source"
        position="right"
        className={classes.internalHandle}
      />
      <div>
        <div style={{ minWidth: "100px" }}>
          If user says: {data.text ? `"${data.text}"` : "(Add text) "}
        </div>
        {/* {Object.keys(data.options).map((key) => (
          <div className={classes.subContainer}>
            <div
              style={{ position: "fixed", textAlign: "center", margin: "auto" }}
            >
              {data.options[key]}
            </div>
            <Handle
              id={key}
              type="source"
              position="right"
              className={classes.internalHandle}
            />{" "}
          </div>
        ))} */}

        {/* <Button
          className={classes.subContainer}
          onClick={() => {
            console.log(data);
            data.addOption(data.node_id);
          }}
        >
          <AddCircleOutlineIcon style={{ color: "#888" }} />
          
        </Button> */}
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

export default StartNode;

const useStyles = makeStyles((theme) => ({
  nodeContainer: {
    padding: "20px",
    textAlign: "center",
    border: "1px solid black",
    borderRadius: "15px",
    backgroundColor: "white",
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

  // rightTopHandle: {
  //   top: "10px",
  //   // rigth: "0",
  //   height: "10px",
  //   width: "10px",
  // },

  internalHandle: {
    background: "#1A90F1",
    // background: "red",
    position: "relative",
    // top: "10p  x",
    // right: "0px",
    left: "110%",

    height: "15px",
    width: "15px",
  },
}));
