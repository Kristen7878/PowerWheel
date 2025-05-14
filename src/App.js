// import logo from './logo.svg';
//import './App.css';

import PowerWheel from "./PowerWheel";
function App() {
  return (
    <div
      className="powerwheel-container "
      style={{
        textAlign: "center",
        paddingTop: "40px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: "36px",
          color: "#8B7355",
          letterSpacing: "1px",
          marginBottom: "10px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Power Wheel (Demo)
      </h1>
      <PowerWheel />
    </div>
  );
}

export default App;
