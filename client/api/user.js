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
    console.log(result);
  } catch (error) {
    console.log(error);
    return null;
  }
}
