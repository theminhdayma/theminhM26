import { questionInstance } from "../../utils/instances"; // Import the instance to make API calls
import baseURL from "../baseURL"; // Import base URL

// Function to fetch all questions from the server
export const getAllQuestion = async () => {
  try {
    const res = await questionInstance.get(`${baseURL}/question`); // Make GET request
    return res.data; // Return the data
  } catch (err) {
    alert(err); // Handle error (you can improve error handling as needed)
  }
};
