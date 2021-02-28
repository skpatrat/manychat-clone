import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Drawflow from "drawflow";
import "./drawflow.scss";
import useScript from "../../../customHooks/useScript";

const DrawflowFlowBuilder = () => {
  const classes = useStyles();
  const [editor, setEditor] = useState();
  const [started, setStarted] = useState(false);

  const [selectedMobileItem, setSelectedMobileItem] = useState("");
  const [lastMobileMove, setLastMobileMove] = useState(null);

  useScript(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"
  );
  //   useScript("./drawflowJS.js");

  useEffect(() => {
    setEditor(new Drawflow(document.getElementById("drawflow")));
  }, []);

  useEffect(() => {
    if (editor) {
      if (!started) {
        setStarted(true);
        editor.reroute = true;

        editor.start();

        editor.on("nodeCreated", function (id) {
          console.log("Node created " + id);
        });

        editor.on("nodeRemoved", function (id) {
          console.log("Node removed " + id);
        });

        editor.on("nodeSelected", function (id) {
          console.log("Node selected " + id);
        });

        editor.on("moduleCreated", function (name) {
          console.log("Module Created " + name);
        });

        editor.on("moduleChanged", function (name) {
          console.log("Module Changed " + name);
        });

        editor.on("connectionCreated", function (connection) {
          console.log("Connection created");
          console.log(connection);
        });

        editor.on("connectionRemoved", function (connection) {
          console.log("Connection removed");
          console.log(connection);
        });

        editor.on("mouseMove", function (position) {
          // console.log("Position mouse x:" + position.x + " y:" + position.y);
        });

        editor.on("nodeMoved", function (id) {
          console.log("Node moved " + id);
        });

        editor.on("zoom", function (zoom) {
          console.log("Zoom level " + zoom);
        });

        editor.on("translate", function (position) {
          console.log("Translate x:" + position.x + " y:" + position.y);
        });

        editor.on("addReroute", function (id) {
          console.log("Reroute added " + id);
        });

        editor.on("removeReroute", function (id) {
          console.log("Reroute removed " + id);
        });
      }
    }
  }, [editor, started]);

  const addNodeToDrawFlow = (name, pos_x, pos_y) => {
    if (editor.editor_mode === "fixed") {
      return false;
    }
    pos_x =
      pos_x *
        (editor.precanvas.clientWidth /
          (editor.precanvas.clientWidth * editor.zoom)) -
      editor.precanvas.getBoundingClientRect().x *
        (editor.precanvas.clientWidth /
          (editor.precanvas.clientWidth * editor.zoom));
    pos_y =
      pos_y *
        (editor.precanvas.clientHeight /
          (editor.precanvas.clientHeight * editor.zoom)) -
      editor.precanvas.getBoundingClientRect().y *
        (editor.precanvas.clientHeight /
          (editor.precanvas.clientHeight * editor.zoom));

    switch (name) {
      case "facebook":
        var facebook = `
        <div>
          <div class="title-box"><i class="fab fa-facebook"></i> Facebook Message</div>
        </div>
        `;
        editor.addNode(
          "facebook",
          0,
          1,
          pos_x,
          pos_y,
          "facebook",
          {},
          facebook
        );
        break;
      case "slack":
        var slackchat = `
          <div>
            <div class="title-box"><i class="fab fa-slack"></i> Slack chat message</div>
          </div>
          `;
        editor.addNode("slack", 1, 0, pos_x, pos_y, "slack", {}, slackchat);
        break;
      case "github":
        var githubtemplate = `
          <div>
            <div class="title-box"><i class="fab fa-github "></i> Github Stars</div>
            <div class="box">
              <p>Enter repository url</p>
            <input type="text" df-name>
            </div>
          </div>
          `;
        editor.addNode(
          "github",
          0,
          1,
          pos_x,
          pos_y,
          "github",
          { name: "" },
          githubtemplate
        );
        break;
      case "telegram":
        var telegrambot = `
          <div>
            <div class="title-box"><i class="fab fa-telegram-plane"></i> Telegram bot</div>
            <div class="box">
              <p>Send to telegram</p>
              <p>select channel</p>
              <select df-channel>
                <option value="channel_1">Channel 1</option>
                <option value="channel_2">Channel 2</option>
                <option value="channel_3">Channel 3</option>
                <option value="channel_4">Channel 4</option>
              </select>
            </div>
          </div>
          `;
        editor.addNode(
          "telegram",
          1,
          0,
          pos_x,
          pos_y,
          "telegram",
          { channel: "channel_3" },
          telegrambot
        );
        break;
      case "aws":
        var aws = `
          <div>
            <div class="title-box"><i class="fab fa-aws"></i> Aws Save </div>
            <div class="box">
              <p>Save in aws</p>
              <input type="text" df-db-dbname placeholder="DB name"><br><br>
              <input type="text" df-db-key placeholder="DB key">
              <p>Output Log</p>
            </div>
          </div>
          `;
        editor.addNode(
          "aws",
          1,
          1,
          pos_x,
          pos_y,
          "aws",
          { db: { dbname: "", key: "" } },
          aws
        );
        break;
      case "log":
        var log = `
            <div>
              <div class="title-box"><i class="fas fa-file-signature"></i> Save log file </div>
            </div>
            `;
        editor.addNode("log", 1, 0, pos_x, pos_y, "log", {}, log);
        break;
      case "google":
        var google = `
            <div>
              <div class="title-box"><i class="fab fa-google-drive"></i> Google Drive save </div>
            </div>
            `;
        editor.addNode("google", 1, 0, pos_x, pos_y, "google", {}, google);
        break;
      case "email":
        var email = `
            <div>
              <div class="title-box"><i class="fas fa-at"></i> Send Email </div>
            </div>
            `;
        editor.addNode("email", 1, 0, pos_x, pos_y, "email", {}, email);
        break;

      case "template":
        var template = `
            <div>
              <div class="title-box"><i class="fas fa-code"></i> Template</div>
              <div class="box">
                Ger Vars
                <textarea df-template></textarea>
                Output template with vars
              </div>
            </div>
            `;
        editor.addNode(
          "template",
          1,
          1,
          pos_x,
          pos_y,
          "template",
          { template: "Write your template" },
          template
        );
        break;
      case "multiple":
        var multiple = `
            <div>
              <div class="box">
                Multiple!
              </div>
            </div>
            `;
        editor.addNode(
          "multiple",
          3,
          4,
          pos_x,
          pos_y,
          "multiple",
          {},
          multiple
        );
        break;
      case "personalized":
        var personalized = `
            <div>
              Personalized
            </div>
            `;
        editor.addNode(
          "personalized",
          1,
          1,
          pos_x,
          pos_y,
          "personalized",
          {},
          personalized
        );
        break;
      case "dbclick":
        var dbclick = `
            <div>
            <div class="title-box"><i class="fas fa-mouse"></i> Db Click</div>
              <div class="box dbclickbox" ondblclick="showpopup(event)">
                Db Click here
                <div class="modal" style="display:none">
                  <div class="modal-content">
                    <span class="close" onclick="closemodal(event)">&times;</span>
                    Change your variable {name} !
                    <input type="text" df-name>
                  </div>
                </div>
              </div>
            </div>
            `;
        editor.addNode(
          "dbclick",
          1,
          1,
          pos_x,
          pos_y,
          "dbclick",
          { name: "" },
          dbclick
        );
        break;

      default:
    }
  };

  useEffect(() => {
    console.log(["onDragStart", selectedMobileItem]);
  }, [selectedMobileItem]);

  const onDragStart = (event) => {
    setSelectedMobileItem(
      event.target.closest(".drag-drawflow").getAttribute("data-node")
    );
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setLastMobileMove(event);
    // console.log(["onDragOver", event]);
  };

  const onDrop = (event) => {
    console.log(["onDrop", event, lastMobileMove]);
    var parentdrawflow = document
      .elementFromPoint(lastMobileMove.clientX, lastMobileMove.clientY)
      .closest("#drawflow");
    if (parentdrawflow != null) {
      addNodeToDrawFlow(
        selectedMobileItem,
        lastMobileMove.clientX,
        lastMobileMove.clientY
      );

      setSelectedMobileItem("");
    }
  };

  const drag = (event) => {
    console.log(["drag", event]);
  };

  const changeMode = (event) => {
    console.log(["changeMode", event]);
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
        <Grid item xs={3}>
            <Paper className={classes.controlsContainer}>
              <div className="wrapper">
                <div className="col">
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="facebook"
                  >
                    <i className="fab fa-facebook"></i>
                    <span> Facebook</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="slack"
                  >
                    <i className="fab fa-slack"></i>
                    <span> Slack recive message</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="github"
                  >
                    <i className="fab fa-github"></i>
                    <span> Github Star</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="telegram"
                  >
                    <i className="fab fa-telegram"></i>
                    <span> Telegram send message</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="aws"
                  >
                    <i className="fab fa-aws"></i>
                    <span> AWS</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="log"
                  >
                    <i className="fas fa-file-signature"></i>
                    <span> File Log</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="google"
                  >
                    <i className="fab fa-google-drive"></i>
                    <span> Google Drive save</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="email"
                  >
                    <i className="fas fa-at"></i>
                    <span> Email send</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="template"
                  >
                    <i className="fas fa-code"></i>
                    <span> Template</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="multiple"
                  >
                    <i className="fas fa-code-branch"></i>
                    <span> Multiple inputs/outputs</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="personalized"
                  >
                    <i className="fas fa-fill"></i>
                    <span> Personalized</span>
                  </div>
                  <div
                    className="drag-drawflow"
                    draggable="true"
                    onDragStart={onDragStart}
                    data-node="dbclick"
                  >
                    <i className="fas fa-mouse"></i>
                    <span> DBClick!</span>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.fixedBuilderHeight}>
              {/* <div
                id="drawflow"
                onDrop="drop(event)"
                onDragOver="allowDrop(event)"
                // className="drawflow"
                style={{
                  width: "100%",
                  height: "100%",
                  //   backgroundColor: "lightgreen",
                  //   position: "relative",
                }}
              ></div> */}
              <div id="drawflow" onDrop={onDrop} onDragOver={onDragOver}>
                <div
                  className="btn-export"
                  onClick={() => {
                    console.log(JSON.stringify(editor.export(), null, 4));
                  }}
                >
                  Export
                </div>
                <div
                  className="btn-clear"
                  onClick={() => {
                    editor.clearModuleSelected();
                  }}
                >
                  Clear
                </div>
                <div className="btn-lock">
                  <i
                    id="lock"
                    className="fas fa-lock"
                    onClick={() => {
                      editor.editor_mode = "fixed";
                      changeMode("lock");
                    }}
                  ></i>
                  <i
                    id="unlock"
                    className="fas fa-lock-open"
                    onClick={() => {
                      editor.editor_mode = "edit";
                      changeMode("unlock");
                    }}
                    style={{ display: "none" }}
                  ></i>
                </div>
                <div className="bar-zoom">
                  <i
                    className="fas fa-search-minus"
                    onClick={() => {
                      editor.zoom_out();
                    }}
                  ></i>
                  <i
                    className="fas fa-search"
                    onClick={() => {
                      editor.zoom_reset();
                    }}
                  ></i>
                  <i
                    className="fas fa-search-plus"
                    onClick={() => {
                      editor.zoom_in();
                    }}
                  ></i>
                </div>
              </div>
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

export default DrawflowFlowBuilder;

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
    height: "80vh",
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
