import { createRef } from "react";

const navigationRef = createRef();

const navigate = (name, params) =>
  navigationRef.current?.navigate(name, params);

export default {
  navigationRef,
  navigate,
};
