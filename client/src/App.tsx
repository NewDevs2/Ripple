import axios from 'axios';
import './App.css';
import logo from './logo.svg';
function App() {
  axios.get('https://www.googleapis.com/youtube/v3/playlists', {
  params: {
    key: 'api key 였던 것',
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
