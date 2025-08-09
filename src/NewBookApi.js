import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class NewBookApi {
  // the token for interactive with the API will be stored here.

  static async checkConnection() {
    try {
      const res = await axios.get(`${BASE_URL}/ping`);
      return res.data.message;
    } catch (err) {
      console.error("Backend Connection Check Failed:", err);
      return false;
    }
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const token = localStorage.getItem("token");

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  // --------------------------------------------------------------
  // Search
  // --------------------------------------------------------------
  static async getBookbyTitle({ query, maxResults }) {
    try {
      let res = await this.request("search", { query, maxResults });
      return res.books;
    } catch (err) {
      throw new Error("Failed to fetch Book By Title ");
    }
  }

  static async getBookbyVolumeID(volume_id) {
    try {
      // Change this to match the backend route
      console.log("VOLUME ID IN NEWBookApi", volume_id);
      let res = await this.request(`search/${volume_id}`);
      console.log("RES.BOOK", res.book);
      return res.book;
    } catch (err) {
      throw new Error("Failed to fetch book details");
    }
  }

  // ----------------------------------------------------------------
  // AI Book Recommendation - Open Router Gemini
  // ----------------------------------------------------------------
  static async recoAskAI(content) {
    try {
      let res = await this.request("recommendation/ask", { content }, "post");

      return res.response;
    } catch (err) {
      throw new Error("Failed to fetch recommendation from AI");
    }
  }

  static async recoUserDescript(content) {
    try {
      let res = await this.request(
        "recommendation/userDescription",
        { content },
        "post"
      );

      return res.response;
    } catch (err) {
      throw new Error("Failed to fetch recommendation from AI");
    }
  }
  static async recoUserCover(content) {
    try {
      let res = await this.request(
        "recommendation/userCover",
        { content },
        "post"
      );

      return res.response;
    } catch (err) {
      throw new Error("Failed to fetch recommendation from AI");
    }
  }

  static async recoSimBook(content) {
    try {
      let res = await this.request(
        "recommendation/similarBook",
        { content },
        "post"
      );

      return res.response;
    } catch (err) {
      throw new Error("Failed to fetch recommendation from AI");
    }
  }
  // ----------------------------------------------------------------
  // Authentication - REGISTER
  // ----------------------------------------------------------------
  // below used for signup
  static async authRegister(userInfo) {
    let res = await this.request(`auth/register`, userInfo, "post");
    console.log(res);
    return res.token;
  }
  // below used for login
  static async authToken(userInfo) {
    let res = await this.request(`auth/token`, userInfo, "post");
    return res.token;
  }

  // ----------------------------------------------------------------
  // Users
  // ----------------------------------------------------------------
  static async patchUser(username, userInfo) {
    const res = await this.request(`users/${username}`, userInfo, "patch");
    return res.user;
  }

  static async getUser(username) {
    try {
      let res = await this.request(`users/${username}`);
      return res.user;
    } catch (err) {
      throw new Error("Failed to User Info");
    }
  }

  static async applyToJob(username, jobId) {
    const res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      "post"
    );
    return res.applied;
  }

  // ----------------------------------------------------------------
  // Save Books
  // ----------------------------------------------------------------

  //Save a new book for a user
  static async saveBook(username, bookData) {
    try {
      console.log("Current User Save Books:", username);
      console.log("Book Data Save Books:", bookData);
      let res = await this.request(`savebooks/${username}`, bookData, "post");
      console.log("SaveBooks Raw Res: ", res);
      return res;
    } catch (err) {
      throw new Error("Failed to Save Book");
    }
  }

  // Get all saved books for a user
  static async getSaveBook(username) {
    console.log("Current User GET ALL Save Books:", username);
    try {
      let res = await this.request(`savebooks/${username}`);
      console.log("GET SaveBooks Raw Res: ", res);
      return res;
    } catch (err) {
      throw new Error("Failed to GET all Saved Books");
    }
  }

  // Get saved books for a user filtered by title
  static async getFilterSaveBook(username, searchFilter) {
    console.log("Current User GET Filtered Save Books:", username);
    try {
      let res = await this.request(`savebooks/${username}`, searchFilter);
      console.log("GET Filter SaveBooks Raw Res: ", res);
      return res;
    } catch (err) {
      throw new Error("Failed to GET Filter Saved Books");
    }
  }

  // Remove a saved book for a user
  static async deleteSaveBook(username, volumeId) {
    try {
      console.log("Current User Delete Books:", username);
      console.log("VolumeID Deleted Books:", volumeId);
      let res = await this.request(
        `savebooks/${username}/${volumeId}`,
        {},
        "delete"
      );
      console.log("Delete SaveBooks Raw Res: ", res);
      return res;
    } catch (err) {
      throw new Error("Failed to Delete Saved Books");
    }
  }
}

export default NewBookApi;
