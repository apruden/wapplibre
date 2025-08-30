import { JSONRPCClient } from "json-rpc-2.0";

const endpoint = 'http://localhost:3000/api';

export const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);

export default client;
