interface BarChartProps {
  data: {
    label: string;
    value: number;
  }[];
  width?: number;
  height?: number;
}

export function BarChart({ data, width = 400, height = 200 }: BarChartProps) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => d.value)) * 1.1;

  const barWidth = (chartWidth / data.length) * 0.6;
  const gap = (chartWidth / data.length) * 0.4;

  const getY = (value: number) => padding.top + chartHeight - (value / maxValue) * chartHeight;

  const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#eb2f96'];

  return (
    <svg width={width} height={height}>
      {/* Y轴网格线 */}
      {[0, 25, 50, 75, 100].map((value) => {
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
            />
            <text
              x={padding.left - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="11"
              fill="#999"
            >
              {Math.round((maxValue * value) / 100)}
            </text>
          </g>
        );
      })}

      {/* 柱状图 */}
      {data.map((item, i) => {
        const x = padding.left + i * (barWidth + gap) + gap / 2;
        const barHeight = (item.value / maxValue) * chartHeight;
        const y = padding.top + chartHeight - barHeight;
        const color = colors[i % colors.length];

        return (
          <g key={`bar-${i}`}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx="4"
            />
            <text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
              fontWeight="600"
            >
              {item.value}%
            </text>
            <text
              x={x + barWidth / 2}
              y={height - 15}
              textAnchor="middle"
              fontSize="11"
              fill="#666"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
