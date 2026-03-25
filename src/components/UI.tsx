import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'green' | 'orange' | 'red';
  onClick?: () => void;
  key?: React.Key;
}

export function NeonCard({ children, className, glowColor = 'cyan', onClick }: NeonCardProps) {
  const glowClasses = {
    cyan: 'shadow-[0_0_30px_rgba(0,245,255,0.15)] border-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-[0_0_40px_rgba(0,245,255,0.25)]',
    purple: 'shadow-[0_0_30px_rgba(191,0,255,0.15)] border-neon-purple/20 hover:border-neon-purple/50 hover:shadow-[0_0_40px_rgba(191,0,255,0.25)]',
    green: 'shadow-[0_0_30px_rgba(0,255,136,0.15)] border-neon-green/20 hover:border-neon-green/50 hover:shadow-[0_0_40px_rgba(0,255,136,0.25)]',
    orange: 'shadow-[0_0_30px_rgba(255,107,0,0.15)] border-neon-orange/20 hover:border-neon-orange/50 hover:shadow-[0_0_40px_rgba(255,107,0,0.25)]',
    red: 'shadow-[0_0_30px_rgba(255,45,85,0.15)] border-neon-red/20 hover:border-neon-red/50 hover:shadow-[0_0_40px_rgba(255,45,85,0.25)]',
  };

  return (
    <motion.div 
      whileHover={onClick ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden bg-bg-card/40 backdrop-blur-2xl border rounded-[2.5rem] p-6 transition-all duration-500',
        glowClasses[glowColor],
        onClick && 'cursor-pointer group',
        className
      )}
    >
      {/* Subtle Inner Glow */}
      <div className={cn(
        'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-br',
        glowColor === 'cyan' && 'from-neon-cyan/20 to-transparent',
        glowColor === 'purple' && 'from-neon-purple/20 to-transparent',
        glowColor === 'green' && 'from-neon-green/20 to-transparent',
        glowColor === 'orange' && 'from-neon-orange/20 to-transparent',
        glowColor === 'red' && 'from-neon-red/20 to-transparent'
      )} />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'cyan' | 'purple' | 'green' | 'red' | 'orange' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function NeonButton({ children, onClick, className, variant = 'cyan', disabled = false, type = 'button' }: NeonButtonProps) {
  const variants = {
    cyan: 'bg-neon-cyan text-bg-deep shadow-[0_0_25px_rgba(0,245,255,0.5)] hover:shadow-[0_0_45px_rgba(0,245,255,0.7)]',
    purple: 'bg-neon-purple text-white shadow-[0_0_25px_rgba(191,0,255,0.5)] hover:shadow-[0_0_45px_rgba(191,0,255,0.7)]',
    green: 'bg-neon-green text-bg-deep shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:shadow-[0_0_45px_rgba(0,255,136,0.7)]',
    red: 'bg-neon-red text-white shadow-[0_0_25px_rgba(255,45,85,0.5)] hover:shadow-[0_0_45px_rgba(255,45,85,0.7)]',
    orange: 'bg-neon-orange text-white shadow-[0_0_25px_rgba(255,107,0,0.5)] hover:shadow-[0_0_45px_rgba(255,107,0,0.7)]',
    outline: 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/50',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        'relative px-10 py-5 rounded-[1.5rem] font-display font-bold uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none text-xs overflow-hidden',
        variants[variant],
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
      
      {/* Shimmer Effect on Hover */}
      {!disabled && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
      )}
    </motion.button>
  );
}

export function CircularGauge({ value, size = 180, strokeWidth = 8, color = '#00F5FF', label, unit }: { value: number, size?: number, strokeWidth?: number, color?: string, label?: string, unit?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-display font-bold" style={{ color }}>{Math.round(value)}</span>
          {unit && <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{unit}</span>}
        </div>
        {label && <span className="text-[10px] uppercase tracking-widest text-white/50">{label}</span>}
      </div>
    </div>
  );
}

export function ProgressBar({ value, color = '#00F5FF', height = 6 }: { value: number, color?: string, height?: number }) {
  return (
    <div className="w-full bg-white/5 rounded-full overflow-hidden" style={{ height }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="h-full relative"
        style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}88` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </motion.div>
    </div>
  );
}

export function StatusBadge({ label, color = 'cyan' }: { label: string, color?: 'cyan' | 'green' | 'red' | 'purple' | 'orange' }) {
  const colors = {
    cyan: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
    green: 'bg-neon-green/10 text-neon-green border-neon-green/30',
    red: 'bg-neon-red/10 text-neon-red border-neon-red/30',
    purple: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
    orange: 'bg-neon-orange/10 text-neon-orange border-neon-orange/30',
  };

  return (
    <div className={cn('px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border', colors[color])}>
      {label}
    </div>
  );
}
