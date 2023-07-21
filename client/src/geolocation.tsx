const GeolocationModule = ():JSX.Element => {
  if (navigator.geolocation) {
    // Geolocation API를 지원하는 경우 위치 정보를 요청
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 위치 정보를 가져오는 데 성공한 경우
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("위도: ", latitude);
        console.log("경도: ", longitude);
      },
      (error) => {
        console.error("오류 발생: ", error.message);
      }
    );
  } else {
    console.error("Geolocation API를 지원하지 않는 브라우저입니다.");
  }
  return (
    <>테스트</>
  )
};
export default GeolocationModule;