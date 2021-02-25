import React, { useCallback, useEffect, useState } from "react";
// import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  updateEdge,
} from "react-flow-renderer";
import MessengerInputNode from "./nodeTypes/MessengerInputNode";
import { Button } from "@material-ui/core";
import NodeForm from "./components/nodeForm";

const FlowBuilder = () => {
  const classes = useStyles();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedBuilderHeight);

  const nodeTypes = {
    inputNode: MessengerInputNode,
  };

  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [elementNextId, setElementsNextId] = useState();
  const [showOptions, setShowOptions] = useState(false);

  const [selectedElement, setSelectedElement] = useState();

  const getForm = () => {
    if (selectedElement !== null) {
      var data = selectedElement.data;

      return (
        <div>
          <NodeForm
            onSubmitCallback={(callbackData) => {
              console.log(callbackData);
              data = { ...callbackData };

              updateNode(selectedElement, data);
              // setTestData(callbackData);
            }}
            data={data}
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    setElementsNextId(elements.length + 1);
  }, [elements]);

  useEffect(() => {
    setElements([
      {
        id: "1",
        type: "inputNode",
        data: { label: "An input node", sampleText: "this and that" },
        position: { x: 0, y: 50 },
      },
      {
        id: "2",
        type: "output",
        data: { label: "An input node", sampleName: "hello" },
        position: { x: 0, y: 100 },
        sourcePosition: "left",
      },
    ]);
  }, []);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  useEffect(() => {
    console.log(elements);
  }, [elements]);

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  const onConnect = (params) => {
    console.log(params);

    setElements((els) => addEdge(params, els));
  };

  const addNode = () => {
    setElements([
      ...elements,
      {
        id: elementNextId.toString(),
        type: "output",
        data: {},
        position: { x: 100 * Math.random(), y: 100 * Math.random() },
      },
    ]);
  };

  const removeNode = () => {
    let els = [];

    for (var e in elements) {
      if (elements[e].id !== selectedElement.id) {
        els.push(elements[e]);
      }
    }

    setElements(els);
  };

  const onElementClick = (event, element) => {
    console.log({ event, element });
    setShowOptions(true);
    setSelectedElement(element);
  };

  const updateNode = (element, changes) => {
    let els = [...elements];

    const { type = element.type, data = element.data } = changes;

    for (var e in els) {
      if (els[e].id === element.id) {
        els[e] = {
          ...els[e],
          type: type,
          data: data,
        };
      }
    }

    setElements(els);
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.fixedBuilderHeight}>
              <ReactFlow
                elements={elements}
                nodeTypes={nodeTypes}
                onLoad={onLoad}
                elementsSelectable={true}
                onElementClick={onElementClick}
                onEdgeUpdate={onEdgeUpdate}
                onConnect={onConnect}
              >
                <Background color="black" gap={10} />
                <MiniMap nodeColor="blue" />
                <Controls />
              </ReactFlow>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.controlsContainer}>
              {showOptions ? getForm() : null}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.controlsContainer}>
              {showOptions ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ margin: "10px" }}
                  onClick={removeNode}
                >
                  Remove Node
                </Button>
              ) : null}

              <Button
                variant="outlined"
                color="primary"
                style={{ margin: "10px" }}
                onClick={addNode}
              >
                Add Node
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
              >
                <h3>Deploy Bot</h3>
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* <div
          className={classes.showOptionsPopup}
          style={
            showOptions ? { visibility: "visible" } : { visibility: "hidden" }
          }
        ></div> */}
      </Container>
    </main>
  );
};

export default FlowBuilder;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    padding: theme.spacing(1),
  },
  fixedBuilderHeight: {
    height: "60vh",
  },
  controlsContainer: {
    minHeight: "20vh",
    padding: theme.spacing(2),
  },
  showOptionsPopup: {
    height: "300px",
    width: "300px",
    backgroundColor: "beige",
    // position: "absolute",
    // top: "10vh",
    // right: "0",
    borderRadius: "30px",
  },
}));
