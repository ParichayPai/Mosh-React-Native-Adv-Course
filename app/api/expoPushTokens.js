import client from "./client";

const register = async (pushToken) =>
  client.post("./expoPushTokens", { token: pushToken.data });

export default {
  register,
};
