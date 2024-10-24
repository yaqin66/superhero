import axios from 'axios';

const baseUrl = 'https://www.superheroapi.com/api.php/5ae3aa2267f764a4b536db7565f06df4/';

export const fetchSuperheroById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching superhero data:', error);
    throw error;
  }
};
