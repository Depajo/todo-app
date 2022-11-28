import React from "react";
import axios from "axios";

const getdata = async function (url) {
  let res = await axios.get(url);
  return res;
};

export { getdata };
