import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    logger.log(error);
  }
};

const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};

const get = async (key) => {
  try {
    const value = AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) {
      return null;
    }

    if (isExpired(item)) {
      // This line below is a violation of CQS
      // Command Query Seperation
      // a func should be either a command or a query but as we can see its both
      // Its ok for now
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (error) {
    logger.log(error);
  }
};

export default {
  store,
  get,
};
