import React, { useEffect, useState } from "react";
import Form from "@rjsf/material-ui";
import axios from "axios";
import apiIP from "../../../constants";

const SetWhitelistedDomainsForm = () => {
  const [data, setData] = useState({});

  const whitelistedDomainsSchema = {
    title: "Set Whitelisted Domains",
    type: "array",

    items: {
      type: "string",
    },
  };

  const onSubmitWhitelistedDomainSchema = (data) => {
    var body = {
      command: {
        name: "setWhitelistedDomains",
        arguments: data.formData,
      },
    };

    console.log(body);

    axios
      .post(`${apiIP}messenger/messengerRequests`, body)
      .then(function (response) {
        console.log(response);
      });
    alert("Done!");
  };

  useEffect(() => {
    axios
      .post(
        `${apiIP}messenger/messengerRequests`,
        {
          getRequest: {
            function: "getWhitelistedDomains",
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
        <h2>Current Whitelisted Domains:</h2>
        <pre style={{ textAlign: "left" }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <Form
        schema={whitelistedDomainsSchema}
        onSubmit={onSubmitWhitelistedDomainSchema}
        formData={data}
      />
    </div>
  );
};

export default SetWhitelistedDomainsForm;
