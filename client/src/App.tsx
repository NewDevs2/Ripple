import axios from 'axios';
import './App.css';
function App() {
  axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
  params: {
    playlistId :'PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe',
    key: '발급 받은 API KEY',
    part: 'snippet',
    chart: 'mostPopular',
    regionCode: 'KR',
    maxResults: 10
  }
})
.then(function (response) {
  const playlists = response.data.items;
  console.log(playlists);
})
.catch(function (error) {
  console.log(error);
});
  return (
    <div className="App">
    </div>
  );
}

export default App;
