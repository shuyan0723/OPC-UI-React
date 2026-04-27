interface PieChartProps {
  data: {
    label: string;
    value: number;
  }[];
  width?: number;
  height?: number;
}

export function PieChart({ data, width = 300, height = 300 }: PieChartProps) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#eb2f96', '#13c2c2', '#f759ab'];

  let currentAngle = -Math.PI / 2;

  const slices = data.map((item, index) => {
    const sliceAngle = (item.value / total) * Math.PI * 2;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const x1 = centerX + Math.cos(startAngle) * radius;
    const y1 = centerY + Math.sin(startAngle) * radius;
    const x2 = centerX + Math.cos(endAngle) * radius;
    const y2 = centerY + Math.sin(endAngle) * radius;

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    currentAngle += sliceAngle;

    return {
      ...item,
      index,
      startAngle,
      endAngle,
      path: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      color: colors[index % colors.length],
    };
  });

  // 图例位置
  const legendX = width + 10;

  return (
    <svg width={width + 140} height={height}>
      {/* 饼图 */}
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {slices.map((slice) => {
          const startAngle = slice.startAngle;
          const endAngle = slice.endAngle;
          const sliceAngle = endAngle - startAngle;
          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

          const x1 = Math.cos(startAngle) * radius;
          const y1 = Math.sin(startAngle) * radius;
          const x2 = Math.cos(endAngle) * radius;
          const y2 = Math.sin(endAngle) * radius;

          return (
            <g key={`slice-${slice.index}`}>
              <path
                d={`M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={slice.color}
                stroke="#fff"
                strokeWidth="2"
                style={{ transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              />
              {/* 百分比标签 */}
              {slice.value / total > 0.05 && (
                <text
                  x={Math.cos((startAngle + endAngle) / 2) * (radius * 0.65)}
                  y={Math.sin((startAngle + endAngle) / 2) * (radius * 0.65)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#fff"
                  fontWeight="600"
                >
                  {Math.round((slice.value / total) * 100)}%
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* 图例 - 放在饼图右侧 */}
      <g transform={`translate(${width + 15}, 20)`}>
        {slices.map((slice) => (
          <g key={`legend-${slice.index}`} transform={`translate(0, ${slice.index * 24})`}>
            <rect width="14" height="14" fill={slice.color} rx="2" />
            <text x="20" y="11" fontSize="12" fill="#666">
              {slice.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
