import axios from "axios";

export class UtilNetwork {
  static async getIpAddress() {
    try {
      const response = await axios.get("https://api.ip.pe.kr/");
      return response.data;
    } catch (error) {
      console.error("Failed to get IP address:", error);
      return "Failed to get IP";
    }
  }
}

// (async () => {
//   const restul = await UtilNetwork.getIpAddress();
//   console.log(restul);
// })();
