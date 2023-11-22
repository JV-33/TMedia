import axios from 'axios';
import { useEffect, useState } from 'react';

// Definējiet tipus jūsu ierīču datiem atbilstoši jūsu API atbildei
interface Device {
  id: number;
  name: string;
  model: string;
  description: string;
  connectionPercentage: number;
  messagesOverLastDays: number;
  totalPossibleMessages: number;
  isOnline: boolean;
  createdAt: string;
}

const DevicesTable = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [isOnlineFilterActive, setIsOnlineFilterActive] = useState(true);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get<Device[]>('http://localhost:5062/api/Devices');
        setDevices(response.data);
        setFilteredDevices(response.data); // Sākotnēji iestatiet filtrētos ierīču datus
      } catch (error) {
        console.error('There was an error fetching the devices:', error);
        setError('Kļūda iegūstot datus. Lūdzu, mēģiniet vēlāk.');
      }
    };

    fetchDevices();
  }, []);

  const onlineDevicesCount = devices.filter(device => device.isOnline).length;
  const offlineDevicesCount = devices.length - onlineDevicesCount;

  const filterDevices = (isOnline: boolean) => {
    const filtered = devices.filter(device => device.isOnline === isOnline);
    setFilteredDevices(filtered);
    setIsOnlineFilterActive(isOnline);
  };

  const handleDeviceClick = (deviceId: number) => {
    setSelectedDeviceId(deviceId === selectedDeviceId ? null : deviceId);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="device-container my-8 p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="buttons-wrapper">
        <div className="button-container-group">
          <div className={`button-container ${isOnlineFilterActive ? 'online' : ''}`}>
            <button className="button-style button-style-small" onClick={() => filterDevices(true)}>
              Online
            </button>
            <div className="count-container">{onlineDevicesCount}</div>
          </div>
          <div className={`button-container ${!isOnlineFilterActive ? 'offline' : ''}`}>
            <button className="button-style button-style-small" onClick={() => filterDevices(false)}>
              Offline
            </button>
            <div className="count-container">{offlineDevicesCount}</div>
          </div>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Quick Search..."
            className="search-input"/>
        </div>
      </div>

      {filteredDevices.map((device) => (
        <div key={device.id} className="device-data-container" onClick={() => handleDeviceClick(device.id)}>
           <div className="status-dot"></div>
          <div className="data-field">
            <div>{device.name}</div>
            <div className="connection-percentage">connection: {`${device.connectionPercentage}%`}</div>
          </div>
          <div className="data-field">
            <div className="data-title">Model</div>
            <div>{device.model}</div>
          </div>
          <div className="data-field">
            <div className="data-title">Con-stat</div>
            <div>{`${device.messagesOverLastDays}/${device.totalPossibleMessages} messages over 28 days`}</div>
          </div>
          {selectedDeviceId === device.id && (
            <div className="button-group">
              <button className="details-button">Settings</button>
              <button className="details-button">Control</button>
            </div>
          )}
          <button className="details-button">&gt;</button>
        </div>
      ))}
            <div className="device-list-info">
        Showing {filteredDevices.length > 0 ? 1 : 0} - {filteredDevices.length} of {devices.length} devices
      </div>
    </div>
  );
};

export default DevicesTable;
