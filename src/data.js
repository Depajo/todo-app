import axios from "axios";

const getdata = async function (url) {
  let res = await axios.get(url);
  return res;
};

const postdata = async function (url, data) {
  await axios.post(url, data);
};

const putdata = async function (url, data) {
  await axios.put(url, data);
};

const deletedata = async function (url) {
  await axios.delete(url);
};

export { getdata, postdata, putdata, deletedata };
