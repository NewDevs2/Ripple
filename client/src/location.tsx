const Location = ():JSX.Element => {
     function getLocation() {
      if ("geolocation" in navigator) {
        // 위치 정보를 지원하는 경우
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // 위치 정보를 받아온 경우
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const timestamp = new Date(position.timestamp).toLocaleTimeString();

            // 받아온 위치 정보를 화면에 표시
            console.log(latitude, longitude, timestamp);
          },
          function (error) {
            // 위치 정보를 받아오지 못한 경우 또는 오류가 발생한 경우
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        // 위치 정보를 지원하지 않는 경우
        console.error("Geolocation is not supported in this browser.");
      }
    }

    // 페이지가 로드되면 3분마다 위치 정보를 받아오도록 설정
    setInterval(getLocation, 3 * 60 * 1000);
    
    return (
        <>하잉?</>
    )
}
export default Location;