import axios from 'axios';

export const fetchChatMessages = async (page: number) => {
  try {
    const response = await axios.get(`https://qa.corider.in/assignment/chat?page=${page}`);
    let data = response.data.chats;
    return data;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
};
