import axios from "axios";

const getdata = async function (url) {
  let res = await axios.get(url);
  return res;
};

const postdata = async function (url, data) {
  console.log(data);
  await axios.post(url, data);
};

export { getdata, postdata };
