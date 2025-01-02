import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  const handleClick = async () => {
    const randomId = getRandomInt(10); 
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${randomId}`);
      const userName = response.data?.name;
      const userId = response.data?.id; 

      const obj = { id: userId, name: userName }; 
      setUsers((prevState) => [...prevState, obj]); 
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
    }
  };

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Add User</button>
      <div className="list-container">
        {users.map((item) => (
          <div className="list-item" key={item.id}>
            <span>
              <strong>Name:</strong> {item.name}
            </span>
            <button className="delete-button" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
