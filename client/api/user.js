import { BASE_PATH } from "../utils/constants";

export async function registerApi(formData) {
  try {
    const url = `${BASE_PATH}/auth/local/register`; //POST p/reg users de strapi
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // datos de Usuarios de Strapi
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error); //Acá va a decir que el POST no va a ningun lado..
    return null;
  }
}
