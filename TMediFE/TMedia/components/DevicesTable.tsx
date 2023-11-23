// DevicesTable.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import DeviceFilter from './deviceFilter';
import DeviceItem from './deviceItem';

interface Device {
  id: number;
  name: string;
  model: string;
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
        const response = await axios.get<Device[]>(`${API_BASE_URL}/Devices`);
        setDevices(response.data);
        setFilteredDevices(response.data);
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
      <DeviceFilter
        onlineCount={onlineDevicesCount}
        offlineCount={offlineDevicesCount}
        onFilterChange={filterDevices}
        isOnlineFilterActive={isOnlineFilterActive}
      />

      <div className="search-container">
        <input type="text" placeholder="Quick Search..." className="search-input"/>
      </div>

      {filteredDevices.map((device) => (
        <DeviceItem
          key={device.id}
          device={device}
          isSelected={selectedDeviceId === device.id}
          onClick={handleDeviceClick}
        />
      ))}

      <div className="device-list-info">
        Showing {filteredDevices.length > 0 ? 1 : 0} - {filteredDevices.length} of {devices.length} devices
      </div>
    </div>
  );
};

export default DevicesTable;
