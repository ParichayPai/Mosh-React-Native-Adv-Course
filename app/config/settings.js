import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.29.109:9000/api",
  },
  staging: {
    apiUrl: "http://192.168.29.109:9000/api",
  },
  prod: {
    apiUrl: "http://192.168.29.109:9000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) {
    return settings.dev;
  } else if (Constants.manifest.releaseChannel === "staging") {
    return settings.staging;
  } else {
    return settings.prod;
  }
};

export default getCurrentSettings();
