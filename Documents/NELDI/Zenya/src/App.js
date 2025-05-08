import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RoomListPage from './pages/RoomListPage';
import RoomPage from './pages/RoomPage';

const App = () => {
  const [rooms, setRooms] = useState([
    {
      name: 'Living Room',
      appliances: [
        { name: 'Smart TV', status: 'On' },
        { name: 'Air Conditioner', status: 'Off' },
        { name: 'Lights', status: 'On' },
      ],
    },
    {
      name: 'Kitchen',
      appliances: [
        { name: 'Refrigerator', status: 'On' },
        { name: 'Microwave', status: 'Off' },
        { name: 'Dishwasher', status: 'Off' },
      ],
    },
    {
      name: 'Bedroom',
      appliances: [
        { name: 'Ceiling Fan', status: 'On' },
        { name: 'Table Lamp', status: 'Off' },
        { name: 'Heater', status: 'Off' },
      ],
    },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard rooms={rooms} setRooms={setRooms} />} />
        <Route path="/rooms" element={<RoomListPage rooms={rooms} />} />
        <Route path="/rooms/:roomName" element={<RoomPage rooms={rooms} setRooms={setRooms} />} />
      </Routes>
    </Router>
  );
};

export default App;
