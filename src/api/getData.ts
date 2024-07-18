import axios from "axios";

export const fetchAllPokemon = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
