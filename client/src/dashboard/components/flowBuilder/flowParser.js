import axios from "axios";
import { isEdge } from "react-flow-renderer";
import apiIP from "../../../constants";

const flowParser = (elements) => {
  var result = {
    payload: {
      payloads: {},
      textWatchlist: {},
    },
  };

  var connections = {};

  for (var j in elements) {
    if (isEdge(elements[j])) {
      var { sourceHandle, targetHandle } = elements[j];
      connections[sourceHandle] = targetHandle;
    }
  }

  console.log(connections);

  for (var i in elements) {
    if (isEdge(elements[i])) {
    } else {
      switch (Object.keys(elements[i].data.options).length) {
        case 0:
          //* Text
          //   console.log(["text content node", elements[i]]);

          if (elements[i].type === "flowNode") {
            result.payload.payloads[`payload_${elements[i].id}`] = {
              text: elements[i].data.text,
            };
          } else if (elements[i].type === "startNode") {
            if (elements[i].data.text.length > 0) {
              result.payload.textWatchlist[`${elements[i].data.text}`] =
                connections[`${elements[i].id}_source`];
            }
          }
          break;

        default:
          //* Quick Reply
          if (elements[i].type === "flowNode") {
            var temp = {};
            temp.text = elements[i].data.text;
            temp.quickReplies = [];

            console.log(Object.keys(elements[i].data.options));

            for (var k in Object.keys(elements[i].data.options)) {
              if (
                elements[i].data.options[
                  Object.keys(elements[i].data.options)[k]
                ].length > 0
              ) {
                temp.quickReplies = [
                  ...temp.quickReplies,
                  {
                    contentType: "text",
                    title:
                      elements[i].data.options[
                        Object.keys(elements[i].data.options)[k]
                      ],
                    payload:
                      connections[Object.keys(elements[i].data.options)[k]],
                  },
                ];
              }
            }

            result.payload.payloads[`payload_${elements[i].id}`] = temp;
          }
          break;
      }
    }
  }

  axios
    .post(`${apiIP}messenger/messengerRequests`, {
      deployBot: result,
    })
    .then(function (response) {
    });
    
    alert("Bot deployed!");
  return result;
};

export default flowParser;
