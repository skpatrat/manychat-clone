import Form from "@rjsf/material-ui";
import React, { useEffect } from "react";

const NodeForm = ({ onSubmitCallback, data, nodeTypes }) => {
  //   const [data, setData] = useState(currentData);

  const nodeFormSchema = {
    type: "object",
    definitions: {
      node_details: {
        type: "object",
        properties: {
          text: {
            type: "string",
          },
          node_type: {
            title: "type",
            type: "string",
            default: nodeTypes[0],
            oneOf: nodeTypes.map((n) => ({
              title: n.toString(),
              enum: [n.toString()],
            })),
          },
        },
        required: ["text", "node_type"],
        dependencies: {
          node_type: {
            oneOf: nodeTypes.map((n) =>
              n === nodeTypes[0]
                ? {
                    properties: {
                      node_type: {
                        enum: [n],
                      },
                    },
                  }
                : {
                    properties: {
                      node_type: {
                        enum: [n],
                      },
                      node_content_type: {
                        title: "node content type",
                        type: "string",
                        // default: ["text"],
                        oneOf: [
                          {
                            title: "text",
                            enum: ["text"],
                          },
                          {
                            title: "quick_reply",
                            enum: ["quick_reply"],
                          },
                        ],
                      },
                    },
                    required: ["node_content_type"],
                    dependencies: {
                      node_content_type: {
                        oneOf: [
                          {
                            properties: {
                              node_content_type: {
                                enum: ["text"],
                              },
                            },
                            // required: [],
                          },
                          {
                            properties: {
                              node_content_type: {
                                enum: ["quick_reply"],
                              },
                              options: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  }
            ),
          },
        },
      },
    },
    properties: {
      node_details: {
        title: "Node Form",
        $ref: "#/definitions/node_details",
      },
    },
  };

  useEffect(() => {
    console.log(["nodeForm useEffect data:", data]);
    // console.log([
    //   "nodeForm useEffect formData:",
    //   {
    //     node_details: {
    //       ...data,
    //     },
    //   },
    // ]);
  }, [data]);

  return (
    <div>
      <h3>{`NODE ${data.node_id}`}</h3>
      <Form
        schema={nodeFormSchema}
        onSubmit={onSubmitCallback}
        formData={{
          node_details: {
            ...data,
            options: Object.values(data.options),
          },
        }}
      />
    </div>
  );
};

export default NodeForm;
