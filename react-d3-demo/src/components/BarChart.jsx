// /components/BarChart.jsx
import { useEffect } from "react";
import * as d3 from "d3";

const marginTop = 30;
const marginBottom = 70;
const marginLeft = 50;
const marginRight = 25;
const oneMillion = 1_000_000;

const BarChart = ({ width, height, data }) => {
  const chartBottomY = height - marginBottom;

  // Create the horizontal scale and its axis generator.
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  // Create the vertical scale and its axis generator.
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.population / oneMillion)])
    .nice()
    .range([chartBottomY, marginTop]);

  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    d3.select(".x-axis")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px")
      // Rotate the labels to make them easier to read.
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
    d3.select(".y-axis")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px");
  }, [xAxis, yAxis]);

  return (
    <div className="container">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="viz"
      >
        <g className="bars">
          {data.map((d) => (
            <rect
              key={d.country}
              x={xScale(d.country)}
              y={yScale(d.population / oneMillion)}
              height={chartBottomY - yScale(d.population / oneMillion)}
              width={xScale.bandwidth()}
              fill="#6baed6"
            />
          ))}
        </g>

        <g className="labels">
                {data.map((d) => (
                    <text
                        key={d.country}
                        x={xScale(d.country) + xScale.bandwidth() / 2}
                        y={yScale(d.population / oneMillion) - 5}
                        textAnchor="middle"
                        fontSize={14}
                        >
                        {Number((d.population / oneMillion).toFixed(1)).toLocaleString()}
                    </text>
                ))}
            </g>

        <g className="x-axis" transform={`translate(0,${chartBottomY})`}></g>
        <g className="y-axis" transform={`translate(${marginLeft},0)`}></g>
      </svg>
    </div>
  );
};

export default BarChart;