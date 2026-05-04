import logo from './logo.svg';
import './App.css';
import PlotTest from './map-raw-svg';
import ResponsiveMap from './map-d3';
import PlotTest2 from './barchat-d3';

function App() {
  return (
    <div className="App">
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100vw"}}>
   
      <ResponsiveMap/>
      <PlotTest/>
      <PlotTest2/>
      </div>
    </div>
  );
}

export default App;
