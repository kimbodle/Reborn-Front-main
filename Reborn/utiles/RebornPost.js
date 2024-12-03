import axios from "axios";

export const requestPostProgress = async (link, accessToken) => {
  try {
    const response = await axios.post(
      link,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    return response; //함수에서 서버 응답 반환
  } catch (error) {
    console.log("Error Response Body:", error.response.data);
    throw error;
  }
};
