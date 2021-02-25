import Form from "@rjsf/core";
import React from "react";

const NodeForm = ({ onSubmitCallback, data }) => {
  //   const [data, setData] = useState(currentData);

  const nodeFormSchema = {
    type: "object",
    definitions: {
      node_details: {
        type: "object",
        properties: {
          node_id: {
            type: "string",
          },
          node_type: {
            title: "type",
            type: "string",
            default: "text",
            oneOf: [
              {
                title: "text response",
                enum: ["text"],
              },
              {
                title: "quick reply",
                enum: ["quick_reply"],
              },
            ],
          },
        },
        required: ["node_id", "node_type"],
        dependencies: {
          node_type: {
            oneOf: [
              {
                properties: {
                  node_type: {
                    enum: ["text"],
                  },
                  node_content_type: {
                    title: "text node content type",
                    type: "string",
                  },
                },
                required: ["node_content_type"],
              },
              {
                properties: {
                  node_type: {
                    enum: ["quick_reply"],
                  },
                  node_content_type: {
                    title: "text node content type",
                    type: "string",
                  },
                },
                required: ["node_content_type"],
              },
            ],
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

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <Form
        schema={nodeFormSchema}
        onSubmit={onSubmitCallback}
        formData={data}
      />
    </div>
  );
};

export default NodeForm;
