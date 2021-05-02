import axios from "axios";
const API = `https://apis.kelvin.ac.in/sapi/kites/getLiveClass?page=1`;

export async function getRooms() {
  return axios
    .post(API, {
      stuId: 838,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
}
