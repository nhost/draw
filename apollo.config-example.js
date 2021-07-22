module.exports = {
  client: {
    service: {
      name: "backend",
      url: "https://hasura-bf8d3585.nhost.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret": "",
      },
    },
    includes: ["src/**/*.graphql"],
  },
};
