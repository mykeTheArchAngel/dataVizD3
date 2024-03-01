import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Legend = ({
  color,
  tickSize = 6,
  width = 320,
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues,
} = {}) => {
  const svgRef = useRef(null);

  // Threshold
  const thresholds = color.thresholds
    ? color.thresholds() // scaleQuantize
    : color.quantiles
      ? color.quantiles() // scaleQuantile
      : color.domain(); // scaleThreshold

  const thresholdFormat =
    tickFormat === undefined
      ? (d) => d
      : typeof tickFormat === "string"
        ? d3.format(tickFormat)
        : tickFormat;

  const x = d3
    .scaleLinear()
    .domain([-1, color.range().length - 1])
    .rangeRound([marginLeft, width - marginRight]);

  tickValues = d3.range(thresholds.length);
  tickFormat = (i) => thresholdFormat(thresholds[i], i);

  useEffect(() => {
    let tickAdjust = (g) =>
      g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);

    d3.select(".ticks")
      .call(
        d3
          .axisBottom(x)
          .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
          .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
          .tickSize(tickSize)
          .tickValues(tickValues),
      )
      .call(tickAdjust)
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll("text").attr("font-size", "14px"));
  }, []);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g>
        {color.range().map((d, i) => (
          <rect
            key={d}
            x={x(i - 1)}
            y={marginTop}
            width={x(i) - x(i - 1)}
            height={height - marginTop - marginBottom}
            fill={d}
          />
        ))}
      </g>
      <g
        className="ticks"
        transform={`translate(0, ${height - marginBottom})`}
      ></g>
    </svg>
  );
};

export default Legend;