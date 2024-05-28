import axios from 'axios';

function App() {
  
    axios.get('http://localhost:3000/set-cookie')
      .then(response => {
        const cookieHeader = response.headers['set-cookie'];
        document.cookie = cookieHeader; // 쿠키를 설정
        console.log('Cookie is set');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
 }

export default App;