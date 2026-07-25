/**
 * 글 상단에 놓는 설명 도해.
 *
 * 원칙
 * - 장식이 아니라 설명이다. 글의 결론을 한 장으로 보여주지 못하면 넣지 않는다.
 * - 색은 토큰만 쓴다(ink/muted/rule/signal). 라이트·다크에서 함께 동작한다.
 * - 라벨은 모노. 도형은 최소한만.
 */

const RULE = "var(--rule)";
const MUTED = "var(--muted)";
const INK = "var(--ink)";
const SIGNAL = "var(--signal)";

const labelProps = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: 12,
  fill: MUTED,
} as const;

const titleProps = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: 11,
  letterSpacing: "0.12em",
  fill: MUTED,
} as const;

const Box = ({
  x,
  y,
  w = 120,
  h = 34,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  accent?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={3}
      fill="none"
      stroke={accent ? SIGNAL : RULE}
      strokeWidth={1}
    />
    <text
      x={x + w / 2}
      y={y + h / 2 + 4}
      textAnchor="middle"
      {...labelProps}
      fill={accent ? SIGNAL : INK}
    >
      {label}
    </text>
  </g>
);

const Arrow = ({
  x1,
  y1,
  x2,
  y2,
  accent = false,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  accent?: boolean;
  dashed?: boolean;
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke={accent ? SIGNAL : MUTED}
    strokeWidth={1}
    strokeDasharray={dashed ? "3 3" : undefined}
    markerEnd={accent ? "url(#arrow-signal)" : "url(#arrow-muted)"}
  />
);

const Defs = () => (
  <defs>
    <marker
      id="arrow-muted"
      viewBox="0 0 8 8"
      refX="7"
      refY="4"
      markerWidth="6"
      markerHeight="6"
      orient="auto"
    >
      <path d="M0,1 L7,4 L0,7" fill="none" stroke={MUTED} strokeWidth={1} />
    </marker>
    <marker
      id="arrow-signal"
      viewBox="0 0 8 8"
      refX="7"
      refY="4"
      markerWidth="6"
      markerHeight="6"
      orient="auto"
    >
      <path d="M0,1 L7,4 L0,7" fill="none" stroke={SIGNAL} strokeWidth={1} />
    </marker>
  </defs>
);

/** N+1: 루트 1건 + 연관 N건 vs fetch join 1건 */
export const JpaNPlusOneDiagram = () => (
  <svg viewBox="0 0 760 250" className="h-auto w-full" role="img">
    <Defs />
    <text x={0} y={14} {...titleProps}>
      N+1
    </text>
    <Box x={0} y={34} label="findAll()" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <Arrow x1={120} y1={51} x2={196} y2={44 + i * 40} />
        <Box x={200} y={28 + i * 40} w={150} h={26} label="select ... where id=?" />
      </g>
    ))}
    <text x={200} y={210} {...labelProps}>
      쿼리 1 + N건
    </text>

    <line x1={390} y1={20} x2={390} y2={220} stroke={RULE} strokeWidth={1} />

    <text x={420} y={14} {...titleProps}>
      FETCH JOIN
    </text>
    <Box x={420} y={34} label="join fetch" accent />
    <Arrow x1={540} y1={51} x2={596} y2={51} accent />
    <Box x={600} y={34} w={150} label="select ... join post" accent />
    <text x={420} y={210} {...labelProps} fill={SIGNAL}>
      쿼리 1건
    </text>
  </svg>
);

/** 배포 파이프라인과 되돌아갈 지점 */
export const CicdPipelineDiagram = () => {
  const stages = ["Source", "Build", "Test", "Deploy", "Verify"];
  return (
    <svg viewBox="0 0 760 180" className="h-auto w-full" role="img">
      <Defs />
      <text x={0} y={14} {...titleProps}>
        PIPELINE
      </text>
      {stages.map((s, i) => (
        <g key={s}>
          <Box x={i * 152} y={40} w={122} label={s} accent={i === stages.length - 1} />
          {i < stages.length - 1 ? (
            <Arrow x1={i * 152 + 122} y1={57} x2={i * 152 + 148} y2={57} />
          ) : null}
        </g>
      ))}
      {/* 되돌아갈 지점 */}
      <path
        d="M700,90 L700,120 L61,120 L61,80"
        fill="none"
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 3"
        markerEnd="url(#arrow-muted)"
      />
      <text x={300} y={140} {...labelProps}>
        실패하면 되돌아갈 지점을 남긴다
      </text>
    </svg>
  );
};

/** 외부 호출 앞에 세우는 방어 축 */
export const ExternalFailureDiagram = () => (
  <svg viewBox="0 0 760 200" className="h-auto w-full" role="img">
    <Defs />
    <text x={0} y={14} {...titleProps}>
      외부 호출 방어
    </text>
    <Box x={0} y={40} w={96} label="요청" />
    <Arrow x1={96} y1={57} x2={124} y2={57} />
    <Box x={128} y={40} w={116} label="타임아웃" />
    <Arrow x1={244} y1={57} x2={272} y2={57} />
    <Box x={276} y={40} w={116} label="벌크헤드" />
    <Arrow x1={392} y1={57} x2={420} y2={57} />
    <Box x={424} y={40} w={140} label="서킷 브레이커" />
    <Arrow x1={564} y1={57} x2={592} y2={57} />
    <Box x={596} y={40} w={160} label="외부 API" />

    {/* 차단 시 폴백 */}
    <path
      d="M494,74 L494,120 L300,120"
      fill="none"
      stroke={SIGNAL}
      strokeWidth={1}
      markerEnd="url(#arrow-signal)"
    />
    <Box x={140} y={104} w={156} h={30} label="캐시 / 폴백 응답" accent />
    <text x={330} y={150} {...labelProps}>
      열리면 기다리지 않고 즉시 대체 응답으로 떨어뜨린다
    </text>
  </svg>
);

/** 캐시가 어느 계층에 있는지 */
export const SpringNextCacheDiagram = () => (
  <svg viewBox="0 0 760 200" className="h-auto w-full" role="img">
    <Defs />
    <text x={0} y={14} {...titleProps}>
      캐시 계층
    </text>
    <Box x={0} y={40} w={130} label="브라우저" />
    <Arrow x1={130} y1={57} x2={158} y2={57} />
    <Box x={162} y={40} w={190} h={34} label="Next.js  fetch / ISR" />
    <Arrow x1={352} y1={57} x2={380} y2={57} />
    <Box x={384} y={40} w={200} h={34} label="Spring  @Cacheable" />
    <Arrow x1={584} y1={57} x2={612} y2={57} />
    <Box x={616} y={40} w={140} label="DB" />

    <line x1={162} y1={92} x2={352} y2={92} stroke={RULE} strokeWidth={1} />
    <text x={162} y={110} {...labelProps}>
      화면 재검증
    </text>
    <line x1={384} y1={92} x2={584} y2={92} stroke={RULE} strokeWidth={1} />
    <text x={384} y={110} {...labelProps}>
      서비스 결과 저장
    </text>
    <text x={0} y={150} {...labelProps}>
      두 계층을 따로 보지 않으면, 백엔드 캐시를 비워도 화면은 그대로다
    </text>
  </svg>
);
