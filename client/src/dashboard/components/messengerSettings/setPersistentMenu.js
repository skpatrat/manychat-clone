import React, { useEffect, useState } from "react";
import Form from "@rjsf/material-ui";
import axios from "axios";

const SetPersistentMenuForm = () => {
  const [data, setData] = useState({});

  const persistentMenuSchema = {
    type: "object",
    definitions: {
      callToActions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            type: {
              title: "type",
              type: "string",
              default: "postback",
              oneOf: [
                {
                  title: "postback",
                  enum: ["postback"],
                },
                {
                  title: "web_url",
                  enum: ["web_url"],
                },
              ],
            },
          },
          required: ["title", "type"],
          dependencies: {
            type: {
              oneOf: [
                {
                  properties: {
                    type: {
                      enum: ["postback"],
                    },
                    payload: {
                      title: "payload",
                      type: "string",
                    },
                  },
                  required: ["payload"],
                },
                {
                  properties: {
                    type: {
                      enum: ["web_url"],
                    },
                    url: {
                      title: "url",
                      type: "string",
                    },
                  },
                  required: ["url"],
                },
              ],
            },
          },
        },
      },
    },
    properties: {
      callToActions: {
        title: "callToActions",
        $ref: "#/definitions/callToActions",
      },
    },
  };

  const onSubmitPersistentMenuSchema = (data) => {
    console.log(data);

    var body = {
      command: {
        name: "setPersistentMenu",
        arguments: data.formData.callToActions.map(function (e) {
          var response = {};
          if (e.type === "web_url") {
            response = {
              type: e.type,
              title: e.title,
              url: e.url,
            };
          } else if (e.type === "postback") {
            response = {
              type: e.type,
              title: e.title,
              payload: e.payload,
            };
          }
          return response;
        }),
      },
    };

    console.log(body);

    axios
      .post("http://localhost:9000/messenger/messengerRequests", body)
      .then(function (response) {
        console.log(response);
      });
    alert("Done!");
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:9000/messenger/messengerRequests",
        {
          getRequest: {
            function: "getPersistentMenu",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <div>
        <h2>Current Menu:</h2>
        <pre style={{ textAlign: "left" }}>
          {JSON.stringify(data[0], null, 2)}
        </pre>
      </div>
      <Form
        schema={persistentMenuSchema}
        onSubmit={onSubmitPersistentMenuSchema}
      />
    </div>
  );
};

export default SetPersistentMenuForm;
