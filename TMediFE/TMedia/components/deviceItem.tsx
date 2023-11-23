import React from 'react';

interface DeviceItemProps {
  device: Device;
  isSelected: boolean;
  onClick: (deviceId: number) => void;
}

interface Device {
  id: number;
  name: string;
  model: string;
  connectionPercentage: number;
  messagesOverLastDays: number;
  totalPossibleMessages: number;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device, isSelected, onClick }) => {
  return (
    <div className="device-data-container" onClick={() => onClick(device.id)}>
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
      {isSelected && (
        <div className="button-group">
          <button className="details-button">Settings</button>
          <button className="details-button">Control</button>
        </div>
      )}
      <button className="details-button">&gt;</button>
    </div>
  );
};

export default DeviceItem;
