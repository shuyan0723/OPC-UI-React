interface LineChartProps {
  data: {
    label: string;
    values: number[];
  }[];
  labels: string[];
  width?: number;
  height?: number;
}

export function LineChart({ data, labels, width = 400, height = 200 }: LineChartProps) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.flatMap((d) => d.values)) * 1.1;

  const getX = (index: number) => padding.left + (index / (labels.length - 1)) * chartWidth;
  const getY = (value: number) => padding.top + chartHeight - (value / maxValue) * chartHeight;

  const colors = ['#1677ff', '#52c41a', '#ff4d4f'];

  // 生成网格线
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <svg width={width} height={height}>
      {/* Y轴网格线 */}
      {gridLines.map((value) => {
        const y = getY((maxValue * value) / 100);
        return (
          <g key={`grid-${value}`}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="#e8ebf0"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <text
              x={padding.left - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="14"
              fill="#999"
            >
              {Math.round((maxValue * value) / 100)}
            </text>
          </g>
        );
      })}

      {/* X轴标签 */}
      {labels.map((label, i) => (
        <text
          key={`xlabel-${i}`}
          x={getX(i)}
          y={height - 10}
          textAnchor="middle"
          fontSize="14"
          fill="#666"
        >
          {label}
        </text>
      ))}

      {/* 数据线和点 */}
      {data.map((dataset, datasetIndex) => {
        const color = colors[datasetIndex % colors.length];
        const pathD = dataset.values
          .map((value, i) => {
            const x = getX(i);
            const y = getY(value);
            return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
          })
          .join(' ');

        return (
          <g key={`line-${datasetIndex}`}>
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
            {dataset.values.map((value, i) => (
              <circle
                key={`point-${datasetIndex}-${i}`}
                cx={getX(i)}
                cy={getY(value)}
                r="4"
                fill={color}
              />
            ))}
          </g>
        );
      })}

      {/* 图例 */}
      <g transform={`translate(${padding.left}, 10)`}>
        {data.map((dataset, i) => (
          <g key={`legend-${i}`} transform={`translate(${i * 80}, 0)`}>
            <rect width="12" height="12" fill={colors[i % colors.length]} rx="2" />
            <text x="18" y="10" fontSize="14" fill="#666">
              {dataset.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
