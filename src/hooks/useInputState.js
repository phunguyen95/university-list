import { useState } from "react";
import _isEmpty from "lodash/isEmpty";
export default (initialVal) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  const resetField = () => {
    setValue("");
  };
  return [value, handleOnChange, resetField];
};
