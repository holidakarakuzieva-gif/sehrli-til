import { motion } from 'framer-motion';

export type HumochaMood = 'happy' | 'thinking' | 'encouraging' | 'sleeping';

interface HumochaProps {
  mood?: HumochaMood;
  feathers?: number;
  size?: number;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const FEATHER_COLORS = [
  '#FF8A3D',
  '#3BA9FF',
  '#2EC4B6',
  '#8B5CF6',
  '#FF5C8A',
  '#FFD23F',
];

export function Humocha({
  mood = 'happy',
  feathers = 4,
  size = 140,
  className = '',
  onClick,
  ariaLabel = 'Humocha',
}: HumochaProps) {
  const litPlumes = Math.min(6, Math.max(1, Math.ceil((feathers / 20) * 6)));

  const bodyContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={onClick ? undefined : true}
      className="select-none"
    >
      {/* Tail feathers — light up progressively as feathers are collected */}
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const angle = -42 + idx * 17;
        const isLit = idx < litPlumes;
        const fill = isLit ? FEATHER_COLORS[idx] : '#CBD5E1';
        return (
          <g key={idx} transform={`translate(80 118) rotate(${angle})`}>
            <path
              d="M0 0 C-7 16 -6 32 0 38 C6 32 7 16 0 0 Z"
              fill={fill}
              opacity={isLit ? 0.95 : 0.45}
            />
          </g>
        );
      })}

      {/* Left Wing */}
      <motion.path
        d={
          mood === 'encouraging'
            ? 'M42 82 C16 54 14 34 32 36 C46 38 52 58 54 78 Z'
            : 'M42 84 C20 74 18 52 34 52 C46 52 52 68 54 84 Z'
        }
        fill="#2EC4B6"
        animate={
          mood === 'encouraging'
            ? { rotate: [-4, 6, -4] }
            : { rotate: [0, 2, 0] }
        }
        transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
        style={{ transformOrigin: '50px 82px' }}
      />

      {/* Right Wing */}
      <motion.path
        d={
          mood === 'encouraging'
            ? 'M118 82 C144 54 146 34 128 36 C114 38 108 58 106 78 Z'
            : 'M118 84 C140 74 142 52 126 52 C114 52 108 68 106 84 Z'
        }
        fill="#3BA9FF"
        animate={
          mood === 'encouraging'
            ? { rotate: [4, -6, 4] }
            : { rotate: [0, -2, 0] }
        }
        transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
        style={{ transformOrigin: '110px 82px' }}
      />

      {/* Crown Crest (Humo plume) */}
      <path d="M72 34 L80 12 L88 34 L80 40 Z" fill="#FFD23F" />
      <path d="M62 38 L64 20 L74 36 Z" fill="#FF8A3D" />
      <path d="M98 38 L96 20 L86 36 Z" fill="#FF5C8A" />

      {/* Main Body */}
      <ellipse cx="80" cy="84" rx="40" ry="42" fill="#FF8A3D" />

      {/* Warm Belly */}
      <ellipse cx="80" cy="96" rx="26" ry="24" fill="#FFF3E0" />

      {/* Rosy Cheeks */}
      <circle cx="57" cy="78" r="5.5" fill="#FF5C8A" opacity="0.45" />
      <circle cx="103" cy="78" r="5.5" fill="#FF5C8A" opacity="0.45" />

      {/* Eyes based on mood */}
      {mood === 'sleeping' ? (
        <>
          <path
            d="M59 68 Q65 74 71 68"
            stroke="#2B2D42"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M89 68 Q95 74 101 68"
            stroke="#2B2D42"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <text x="115" y="42" fill="#8B5CF6" fontSize="14" fontWeight="800">
            Zzz
          </text>
        </>
      ) : mood === 'thinking' ? (
        <>
          <circle cx="65" cy="67" r="6" fill="#2B2D42" />
          <circle cx="67" cy="65" r="2" fill="#FFFFFF" />
          <circle cx="95" cy="67" r="6" fill="#2B2D42" />
          <circle cx="97" cy="64" r="2" fill="#FFFFFF" />
          <path
            d="M87 56 Q96 52 103 57"
            stroke="#2B2D42"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="122" cy="40" r="4" fill="#FFD23F" />
          <circle cx="131" cy="28" r="6" fill="#3BA9FF" opacity="0.8" />
        </>
      ) : (
        <>
          <circle cx="65" cy="68" r="6.5" fill="#2B2D42" />
          <circle cx="67.5" cy="65.5" r="2.2" fill="#FFFFFF" />
          <circle cx="95" cy="68" r="6.5" fill="#2B2D42" />
          <circle cx="97.5" cy="65.5" r="2.2" fill="#FFFFFF" />
        </>
      )}

      {/* Beak */}
      <path d="M74 75 L80 86 L86 75 Z" fill="#FFD23F" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Little feet */}
      <path d="M68 124 L64 134 M68 124 L72 134" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <path d="M92 124 L88 134 M92 124 L96 134" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`inline-flex items-center justify-center rounded-3xl cursor-pointer focus-visible:outline-none ${className}`}
      >
        {bodyContent}
      </motion.button>
    );
  }

  return <div className={`inline-flex items-center justify-center ${className}`}>{bodyContent}</div>;
}
