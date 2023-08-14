import axios from "axios";

const clientId = "a439c1481de445a3ad2018263b474525"; // Spotify 개발자 대시보드에서 얻은 클라이언트 ID
const clientSecret = "aa169735fd6644538a032c2d11f650e5"; // Spotify 개발자 대시보드에서 얻은 클라이언트 시크릿
const redirectUri = "http://localhost:3000/"; // 등록한 리디렉션 URI

axios
  .post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        redirect_uri: redirectUri,
      },
    }
  )
  .then((response) => {
    const accessToken = response.data.access_token;
    console.log("Access Token:", accessToken);
  })
  .catch((error) => {
    console.error("Error getting access token:", error);
  });
