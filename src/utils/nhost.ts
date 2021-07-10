import { createClient } from "nhost-js-sdk";

const config = {
  baseURL: "https://backend-bf8d3585.nhost.app",
};

const nhost = createClient(config);

export { nhost };
