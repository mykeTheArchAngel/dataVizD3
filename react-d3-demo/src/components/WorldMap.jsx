import * as d3 from "d3";

import Legend from "./Legend";

const WorldMap = ({ width, height, data }) => {
  const worldPopulation = data.worldPopulation;
  const topography = data.topography;

  // Map and projection
  const path = d3.geoPath();
  const projection = d3
    .geoMercator()
    .scale(85)
    .center([0, 30])
    .translate([width / 2, height / 2]);

  const pathGenerator = path.projection(projection);

  // Color scale
  const colorScale = d3
    .scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeBlues[7]);

  return (
    <div className="container">
      <svg
        className="viz"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g className="topography">
          {topography.features.map((d) => (
            <path
              key={d.id}
              d={pathGenerator(d)}
              fill={colorScale(worldPopulation[d.id] || 0)}
              stroke="#FFFFFF"
              strokeWidth={0.3}
            />
          ))}
        </g>

        {/* Legend */}
        <g className="legend" transform="translate(10,10)">
          <Legend
            color={colorScale}
            width={height / 1.25}
            tickFormat={d3.format("~s")}
          />
        </g>
      </svg>
    </div>
  );
};

export default WorldMap;