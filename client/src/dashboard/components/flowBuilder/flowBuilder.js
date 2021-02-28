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
  isEdge,
  MiniMap,
  updateEdge,
} from "react-flow-renderer";
import { Button } from "@material-ui/core";
import NodeForm from "./components/nodeForm";

// import MessengerInputNode from "./nodeTypes/MessengerInputNode";
import StartNode from "./nodeTypes/StartNode";
import FlowNode from "./nodeTypes/FlowNode";
import EdgeForm from "./components/edgeForm";
import flowParser from "./flowParser";

const FlowBuilder = () => {
  const classes = useStyles();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedBuilderHeight);

  const nodeTypes = {
    // getStartedNode:
    startNode: StartNode,
    // inputNode: MessengerInputNode,
    flowNode: FlowNode,
  };

  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [elementNextId, setElementsNextId] = useState();

  const [selectedElement, setSelectedElement] = useState(null);

  const getForm = () => {
    if (selectedElement) {
      if (isEdge(selectedElement)) {
        return (
          <div>
            <EdgeForm element={selectedElement} />
          </div>
        );
      } else {
        var data = {
          ...selectedElement.data,
          node_id: selectedElement.id,
          node_type: selectedElement.type,
        };

        return (
          <div>
            <NodeForm
              onSubmitCallback={(callbackData) => {
                console.log(["callback data", callbackData]);
                data = { ...callbackData };

                var {
                  node_id,
                  node_type,
                  node_content_type,
                  text,
                  options,
                } = callbackData.formData.node_details;

                var nodeOptions = {};
                for (var o in Object.keys(options)) {
                  nodeOptions[`${node_id}_${Object.keys(options)[o]}`] =
                    options[Object.keys(options)[o]];
                }

                console.log({
                  ...selectedElement.data,
                  content: "quick_reply",
                  text: text,
                  options: nodeOptions,
                });

                updateNode(selectedElement, {
                  id: node_id,
                  type: node_type,
                  data: {
                    ...selectedElement.data,
                    content: "quick_reply",
                    text: text,
                    options: nodeOptions,
                  },
                });

                // setTestData(callbackData);
              }}
              data={data}
              nodeTypes={Object.keys(nodeTypes)}
            />
          </div>
        );
      }
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    console.log(["flowBuilder useEffect elements: ", elements]);
  }, [elements]);

  const addOption = (node_id) => {
    var thisElementIndex;
    var newElements;
    setElements((els) => {
      var newEls = [];
      for (var e in els) {
        if (els[e].id === node_id) {
          thisElementIndex = e;
          var newDataOptions = { ...els[e].data.options };
          newDataOptions[
            `${els[e].id}_${els[e].data.nextOptionsKey}`
          ] = `${els[e].id}_${els[e].data.nextOptionsKey}`;
          newEls.push({
            ...els[e],
            data: {
              ...els[e].data,
              options: newDataOptions,
              nextOptionsKey: els[e].data.nextOptionsKey + 1,
            },
          });
        } else {
          newEls.push(els[e]);
        }
      }
      newElements = newEls;
      return newEls;
    });

    onElementClick(null, newElements[thisElementIndex]);
  };

  useEffect(() => {
    if (elements.length === 0) {
      setElements([
        {
          id: "1",
          type: "startNode",
          data: {
            node_id: "1",
            options: {},
            text: "",
            content: "text",
            addOption: addOption,
            nextOptionsKey: 0,
          },
          position: { x: 0, y: 50 },
        },
        // {
        //   id: "2",
        //   type: "output",
        //   data: {},
        //   position: { x: 0, y: 100 },
        //   sourcePosition: "left",
        // },
      ]);
    }
    setElementsNextId(2);
  }, []);

  useEffect(() => {
    if (reactflowInstance) {
      reactflowInstance.setTransform({ x: 200, y: 50, zoom: 1.5 });
    }
  }, [reactflowInstance]);

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  const onEdgeUpdate = (oldEdge, newConnection) => {
    console.log("edge update:", oldEdge, newConnection);
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  };
  const onConnect = (params) => {
    console.log(["flowBuilder onEdgeUpdate params:", params]);

    setElements((els) => addEdge(params, els));
  };

  const addNode = () => {
    setElements([
      ...elements,
      {
        id: elementNextId.toString(),
        type: "flowNode",
        data: {
          node_id: elementNextId.toString(),
          options: {},
          text: "",
          content: "text",
          nextOptionsKey: 0,
          addOption: addOption,
        },
        position: { x: 100 * Math.random(), y: 100 * Math.random() },
      },
    ]);

    setElementsNextId(elementNextId + 1);
  };

  const removeNode = () => {
    let els = [];

    for (var e in elements) {
      if (elements[e].id !== selectedElement.id) {
        els.push(elements[e]);
      }
    }

    setElements(els);
    setSelectedElement(null);
  };

  const onElementClick = (event, element) => {
    // console.log({ event, element });
    setSelectedElement(element);
  };

  const updateNode = (element, changes) => {
    let els = [...elements];

    const { type = element.type, data = element.data } = changes;

    for (var e in els) {
      if (els[e].id === element.id) {
        els[e] = {
          ...els[e],
          // id: data.id,
          type: type,
          data: data,
        };
      }
    }

    setElements(els);
  };

  const showOptions = () => {
    if (!selectedElement) {
      return false;
    } else {
      let flag = false;
      for (var e in elements) {
        if (elements[e].id === selectedElement.id) {
          flag = true;
        }
      }

      return flag;
    }
  };

  const parseAndDeploy = () => {
    var response = flowParser(elements);
    console.log(response);
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
                onNodeDragStart={onElementClick}
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
              {showOptions() ? getForm() : null}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.controlsContainer}>
              {showOptions() ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ margin: "10px" }}
                  onClick={removeNode}
                >
                  Remove Node {selectedElement?.id}
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
                onClick={parseAndDeploy}
              >
                <h3>Deploy Bot</h3>
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* <div
          className={classes.showOptionsPopup}
          style={
            showOptions() ? { visibility: "visible" } : { visibility: "hidden" }
          }
        ></div> */}
      </Container>
    </main>
  );
};

export default FlowBuilder;

// const drawerWidth = 240;

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
