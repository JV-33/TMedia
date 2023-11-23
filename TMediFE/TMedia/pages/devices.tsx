import Navbar from '../app/Navbar';
import '../app/globals.css';
import DevicesTable from '../components/DevicesTable';

const OverlayComponent = () => {
  return (
    <div className="overlay">
      <DevicesTable />
    </div>
  );
};

const Devices = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="navbar-extension">
       <h4 className="small-title">Home</h4>
        <h3 className="title">Devices</h3>
      </div>
      <OverlayComponent />
    </div>
  );
};

export default Devices;