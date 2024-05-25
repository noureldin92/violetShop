import axios from "axios";

export async function getCategories() {
  const response = await axios.get(
    "https://dummyjson.com/products/category-list"
  );

  return response.data;
}
