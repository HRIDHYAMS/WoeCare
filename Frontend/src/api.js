import axios from "axios";

const API_URL = "http://localhost:3000"; // Backend URL

export const fetchSlots = async () => {
  try {
    const response = await axios.get(`${API_URL}/slots`);
    return response.data;
  } catch (error) {
    console.error("Error fetching slots:", error);
  }
};

export const bookSlot = async (slotData) => {
  try {
    const response = await axios.post(`${API_URL}/book-slot`, slotData);
    return response.data;
  } catch (error) {
    console.error("Error booking slot:", error);
  }
};
