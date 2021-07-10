module.exports = {
  client: {
    service: {
      name: "backend",
      url: "https://hasura-bf8d3585.nhost.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret": "bc13d5d4dbb9df0617c85dc8d5faa555",
      },
    },
    includes: ["src/**/*.graphql"],
  },
};
