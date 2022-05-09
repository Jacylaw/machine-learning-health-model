import axios from "axios";

const url = "https://www.jacyhealthmodel.xyz/api/ml/score";

export const fetchPosts = (payload) => axios.post(url, {payload});