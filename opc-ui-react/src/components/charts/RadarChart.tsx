import { memo } from 'react';

interface RadarChartProps {
  data: {
    label: string;
    values: number[];
  }[];
  categories: string[];
  width?: number;
  height?: number;
}

export const RadarChart = memo<RadarChartProps>(({ data, categories, width = 300, height = 300 }) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;
  const angleStep = (Math.PI * 2) / categories.length;

  // 计算点的位置
  const getPoint = (value: number, index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
    };
  };

  // 生成背景网格点
  const gridLevels = [20, 40, 60, 80, 100];
  const gridPoints = gridLevels.map((level) =>
    categories.map((_, i) => getPoint(level, i))
  );

  const colors = ['#1677ff', '#52c41a', '#ff4d4f'];

  return (
    <svg width={width} height={height} style={{ margin: '0 auto' }}>
      {/* 背景网格 */}
      {gridPoints.map((level, levelIndex) => (
        <polygon
          key={`grid-${levelIndex}`}
          points={level.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#e8ebf0"
          strokeWidth="1"
        />
      ))}

      {/* 轴线 */}
      {categories.map((_, i) => {
        const point = getPoint(100, i);
        return (
          <line
            key={`axis-${i}`}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="#e8ebf0"
            strokeWidth="1"
          />
        );
      })}

      {/* 数据区域 */}
      {data.map((dataset, datasetIndex) => (
        <polygon
          key={`data-${datasetIndex}`}
          points={dataset.values.map((v, i) => {
            const p = getPoint(v, i);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill={colors[datasetIndex]}
          fillOpacity="0.2"
          stroke={colors[datasetIndex]}
          strokeWidth="2"
        />
      ))}

      {/* 数据点 */}
      {data.map((dataset, datasetIndex) =>
        dataset.values.map((value, i) => {
          const point = getPoint(value, i);
          return (
            <circle
              key={`point-${datasetIndex}-${i}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={colors[datasetIndex]}
            />
          );
        })
      )}

      {/* 标签 */}
      {categories.map((category, i) => {
        const point = getPoint(115, i);
        return (
          <text
            key={`label-${i}`}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fill="#666"
          >
            {category}
          </text>
        );
      })}
    </svg>
  );
});
