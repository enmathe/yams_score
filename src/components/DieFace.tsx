interface Props {
  value: 1 | 2 | 3 | 4 | 5 | 6;
  size?: number;
  color?: string;
}

// Dot positions [cx, cy] as % of die size, for each face value
const DOTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[72, 28], [28, 72]],
  3: [[72, 28], [50, 50], [28, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 22], [72, 22], [28, 50], [72, 50], [28, 78], [72, 78]],
};

export function DieFace({ value, size = 24, color = 'currentColor' }: Props) {
  const dots = DOTS[value];
  const r = size * 0.09; // dot radius proportional to die size
  const rx = size * 0.18; // corner radius

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      {/* Die face border */}
      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        rx={rx * (100 / size)}
        stroke={color}
        strokeWidth="6"
        fill="none"
        opacity="0.7"
      />
      {/* Dots */}
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={r * (100 / size)} fill={color} />
      ))}
    </svg>
  );
}
