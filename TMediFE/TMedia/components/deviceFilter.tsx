import React from 'react';

interface DeviceFilterProps {
  onlineCount: number;
  offlineCount: number;
  onFilterChange: (isOnline: boolean) => void;
  isOnlineFilterActive: boolean;
}

const DeviceFilter: React.FC<DeviceFilterProps> = ({ 
  onlineCount, 
  offlineCount, 
  onFilterChange, 
  isOnlineFilterActive 
}) => {
  return (
    <div className="buttons-wrapper">
      <div className="button-container-group">
        <div className={`button-container ${isOnlineFilterActive ? 'online' : ''}`}>
          <button className="button-style button-style-small" onClick={() => onFilterChange(true)}>
            Online
          </button>
          <div className="count-container">{onlineCount}</div>
        </div>
        <div className={`button-container ${!isOnlineFilterActive ? 'offline' : ''}`}>
          <button className="button-style button-style-small" onClick={() => onFilterChange(false)}>
            Offline
          </button>
          <div className="count-container">{offlineCount}</div>
        </div>
      </div>
    </div>
  );
};

export default DeviceFilter;
