//WORLD MAP
import { useEffect, useState } from "react";
import * as d3 from "d3";

import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import WorldMap from "./components/WorldMap";

const pieChartData = [
  { name: "Christians", value: 2_173_180_000 },
  { name: "Muslims", value: 1_598_510_000 },
  { name: "None", value: 1_126_500_000 },
  { name: "Hindus", value: 1_033_080_000 },
  { name: "Buddhists", value: 487_540_000 },
  { name: "Folk Religionists", value: 405_120_000 },
  { name: "Other Religions", value: 58_110_000 },
  { name: "Jews", value: 13_850_000 },
];

function App() {
  const [worldPopulation, setWorldPopulation] = useState(null);
  const [topography, setTopography] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      let populationData = {};
      await Promise.all([
        d3.json(
          "https://res.cloudinary.com/tropicolx/raw/upload/v1/Building%20Interactive%20Data%20Visualizations%20with%20D3.js%20and%20React/world.geojson"
        ),
        d3.csv(
          "https://res.cloudinary.com/tropicolx/raw/upload/v1/Building%20Interactive%20Data%20Visualizations%20with%20D3.js%20and%20React/world_population.csv",
          (d) => {
            populationData = {
              ...populationData,
              [d.code]: +d.population,
            };
          }
        ),
      ]).then((fetchedData) => {
        const topographyData = fetchedData[0];
        const barChartData = topographyData.features
                    .map((d) => ({
                        country: d.properties.name,
                        population: populationData[d.id] || 0,
                    }))
                    .sort((a, b) => b.population - a.population)
                    .slice(0, 12);
                setBarChartData(barChartData);
      });

      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <WorldMap width={550} height={450} data={{ worldPopulation, topography }} />
  );
}

export default App;



//COUNTER

/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Get moving <code>This is a code html tag </code> Michael
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/

// TABLE

/*
import { useEffect, useState } from "react";
import * as d3 from "d3";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch JSON data using d3.json
      await d3
        .json(
          "https://js.devexpress.com/React/Demos/WidgetsGallery/JSDemos/data/simpleJSON.json",
        )
        .then((data) => {
          setData(data);
        });
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <table id="salesTable">
      <thead>
        <tr>
          {Object.keys(data[0]).map((d) => (
            <th key={d}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.day}>
            <td>{d.day}</td>
            <td>{d.sales}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
*/

//BARCHART
/*
import BarChart from "./components/BarChart";


const data = [
  { country: "India", population: 1_417_173_173 },
  { country: "China", population: 1_412_175_000 },
  { country: "United States", population: 333_287_557 },
  { country: "Indonesia", population: 275_501_339 },
  { country: "Pakistan", population: 235_824_862 },
  { country: "Nigeria", population: 218_541_212 },
  { country: "Brazil", population: 215_313_498 },
  { country: "Bangladesh", population: 171_186_372 },
  { country: "Russia", population: 144_236_933 },
  { country: "Mexico", population: 127_504_125 },
  { country: "Japan", population: 125_124_989 },
  { country: "Ethiopia", population: 123_379_924 },
];

function App() {
  return <BarChart width={700} height={500} data={data} />;
}

export default App;
*/

//PIECHART
/*
import PieChart from "./components/PieChart";

const pieChartData = [
  { name: "Christians", value: 2_173_180_000 },
  { name: "Muslims", value: 1_598_510_000 },
  { name: "None", value: 1_126_500_000 },
  { name: "Hindus", value: 1_033_080_000 },
  { name: "Buddhists", value: 487_540_000 },
  { name: "Folk Religionists", value: 405_120_000 },
  { name: "Other Religions", value: 58_110_000 },
  { name: "Jews", value: 13_850_000 },
];

function App() {
  return <PieChart width={750} height={450} data={pieChartData} />;
}

export default App;
*/