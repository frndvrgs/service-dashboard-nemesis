export const settings = {
  API: {
    CMS: {
      HOST: process.env.CMS_SERVER_HOST,
      PUBLIC: {
        ENDPOINT_GRAPHQL: "/graphql",
      },
      USER: {
        ENDPOINT_SESSION_CREATE: "/user/session/create",
        ENDPOINT_GRAPHQL: "/user/graphql",
      },
    },
  },
};
