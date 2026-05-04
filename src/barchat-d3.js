import React, { useMemo, useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const ResponsiveBarChart = () => {
    const data = [
        { label: "Nigeria", val1: 15, val2: 35, val3: 25 },
        { label: "Kenya",   val1: 10, val2: 25, val3: 20 },
        { label: "Ghana",   val1: 20, val2: 15, val3: 30 },
        { label: "Egypt",   val1: 25, val2: 20, val3: 15 },
        { label: "S. Africa", val1: 12, val2: 30, val3: 28 },
        { label: "Ethiopia", val1: 8,  val2: 18, val3: 12 },
        { label: "Morocco",  val1: 18, val2: 22, val3: 10 },
        { label: "Uganda",   val1: 5,  val2: 15, val3: 15 },
        { label: "Senegal",  val1: 14, val2: 10, val3: 20 }
      ];
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 325 });

  // making it responsive here 
  useEffect(() => {
    const observeTarget = containerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions((prev) => ({
          ...prev,
          width: entry.contentRect.width,
        }));
      });
    });

    resizeObserver.observe(observeTarget);
    return () => resizeObserver.disconnect();
  }, []);

  const { width, height } = dimensions;
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const chartConfig = useMemo(() => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0, 100]) 
      .range([innerHeight, 0]);

    return { xScale, yScale, innerWidth, innerHeight };
  }, [data, width, height]);


  return (
    <div ref={containerRef} style={{ width: "652px", height: "325px", background: "#fff" }}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          
          {/* i am hanling the grid Lines here*/}
          {chartConfig.yScale.ticks(5).map(tick => (
            <g key={tick} transform={`translate(0, ${chartConfig.yScale(tick)})`}>
              <line 
                x2={chartConfig.innerWidth} 
                stroke="#E1E4ED" 
                strokeDasharray="4 7" 
              />
              <text 
                x="-10" 
                dy="0.32em" 
                fill="#475569" 
                textAnchor="end" 
                style={{ fontSize: "12px" }}
              >
                {tick}
              </text>
            </g>
          ))}

        
          {data.map((d) => {
            const xPos = chartConfig.xScale(d.label);
            const barWidth = chartConfig.xScale.bandwidth();
            
            // Calculating heights 
            const h1 = chartConfig.innerHeight - chartConfig.yScale(d.val1);
            const h2 = chartConfig.innerHeight - chartConfig.yScale(d.val2);
            const h3 = chartConfig.innerHeight - chartConfig.yScale(d.val3);

            return (
              <g key={d.label} transform={`translate(${xPos}, 0)`}>
                <rect 
                  y={chartConfig.yScale(d.val1)} 
                  width={barWidth} 
                  height={h1} 
                  fill="#FF9A62" 
                />
                <rect 
                  y={chartConfig.yScale(d.val1 + d.val2)} 
                  width={barWidth} 
                  height={h2} 
                  fill="#86B6FF" 
                />
                <rect 
                  y={chartConfig.yScale(d.val1 + d.val2 + d.val3)} 
                  width={barWidth} 
                  height={h3} 
                  fill="#23A998" 
                />
               <text 
                  y={chartConfig.innerHeight + 20} 
                  x={barWidth / 2} 
                  textAnchor="middle" 
                  fill="#475569"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  {d.label}
                </text>
              </g>
            );
          })}

          {/* Bottom Baseline */}
          <line 
            y1={chartConfig.innerHeight} 
            y2={chartConfig.innerHeight} 
            x2={chartConfig.innerWidth} 
            stroke="#94A3B8" 
          />
        </g>
      </svg>
    </div>
  );
};

export default ResponsiveBarChart;