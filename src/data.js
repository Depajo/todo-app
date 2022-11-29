import axios from "axios";

const getdata = async function (url) {
  let res = await axios.get(url);
  return res;
};

const postdata = async function (url, data) {
  console.log(data);
  await axios.post(url, data);
};

const putdata = async function (url, data) {
  await axios.put(url, data);
};

export { getdata, postdata, putdata };
