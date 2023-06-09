import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function createAddressApi(address, logout) {
  try {
    const utl = `${BASE_PATH / addresses}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode !== 200) throw "Error del servidor...";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
