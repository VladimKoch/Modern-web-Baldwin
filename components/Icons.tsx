import React from "react";

export function RoyalCrestIcon({
  className = "w-8 h-8",
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crown Top */}
      <path
        d="M9 7L11.5 10L16 6L20.5 10L23 7L22 12H10L9 7Z"
        fill="#D4AF37"
        stroke="#F3D079"
        strokeWidth="0.8"
      />
      {/* Shield Body */}
      <path
        d="M8 12C8 12 7.5 21 16 27C24.5 21 24 12 24 12H8Z"
        fill="#1A1713"
        stroke="#D4AF37"
        strokeWidth="1.2"
      />
      {/* Inner Chevron / Jerusalem Cross Heraldry */}
      <path
        d="M16 14V23M12.5 18H19.5"
        stroke="#F3D079"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="18" r="1" fill="#FFF0B8" />
      <circle cx="13" cy="15.5" r="0.75" fill="#D4AF37" />
      <circle cx="19" cy="15.5" r="0.75" fill="#D4AF37" />
      <circle cx="13" cy="20.5" r="0.75" fill="#D4AF37" />
      <circle cx="19" cy="20.5" r="0.75" fill="#D4AF37" />
    </svg>
  );
}

export function ThroneIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* High Throne Backrest */}
      <path
        d="M6 3L12 1L18 3V12H6V3Z"
        stroke="#D4AF37"
        strokeWidth="1.4"
        fill="#1C1813"
      />
      {/* Throne Seat & Cushion */}
      <path
        d="M4 12H20V16H4V12Z"
        stroke="#F3D079"
        strokeWidth="1.4"
        fill="#2A2218"
      />
      {/* Armrests */}
      <path
        d="M4 10V16M20 10V16"
        stroke="#D4AF37"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Throne Legs */}
      <path
        d="M5 16V22M19 16V22"
        stroke="#AA822B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandPointerIcon({
  className = "w-6 h-6",
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Radial ripple arches above finger */}
      <path
        d="M9 3C11 2 13 2 15 3"
        stroke="#F5D97E"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M7.5 5.5C10.5 4 13.5 4 16.5 5.5"
        stroke="#F5D97E"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Hand pointing up */}
      <path
        d="M12 7V13.5C12 14.3 11.3 15 10.5 15C9.7 15 9 14.3 9 13.5V11L7.8 12.2C7.3 12.7 6.5 12.7 6 12.2C5.5 11.7 5.5 10.9 6 10.4L9.5 6.9C10.2 6.2 11.1 5.8 12 5.8C12 5.8 12 6.5 12 7Z"
        fill="#FFE8A3"
        opacity="0.2"
      />
      <path
        d="M12 7V13M12 13C12 14.5 13 16 14.5 16H15.5C17.5 16 19 14.5 19 12.5V11C19 10.2 18.3 9.5 17.5 9.5C17 9.5 16.5 9.8 16.2 10.2C15.9 9.8 15.4 9.5 14.8 9.5C14.4 9.5 14 9.7 13.7 10C13.4 9.5 12.8 9.2 12.2 9.2C12.1 9.2 12 9.2 12 9.2"
        stroke="#FFF"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12 7V13C12 14.7 10.7 16 9 16C8.2 16 7.5 15.7 7 15.2L5.5 13.7C5 13.2 5 12.4 5.5 11.9C6 11.4 6.8 11.4 7.3 11.9L8.5 13.1V7C8.5 5.9 9.4 5 10.5 5C11.6 5 12.5 5.9 12.5 7V11"
        stroke="#F5D97E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon({
  className = "w-4 h-4",
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 4.5V19.5L19 12L7 4.5Z"
        fill="#D4AF37"
        stroke="#E5C158"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScrollIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 17C17.3 17 16 18.3 16 20C16 20.6 16.4 21 17 21H19C20.7 21 22 19.7 22 18V6C22 4.3 20.7 3 19 3H7C4.8 3 3 4.8 3 7V17C3 19.2 4.8 21 7 21H17"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M7 3C5.3 3 4 4.3 4 6C4 7.7 5.3 9 7 9H19"
        stroke="#F3D079"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M7 13H15M7 16H13"
        stroke="#AA822B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SwordIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 17.5L3 6V3H6L17.5 14.5"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13 19L19 13M16 16L21 21M19.5 22.5L22.5 19.5"
        stroke="#F3D079"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShieldCheckIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z"
        stroke="#D4AF37"
        strokeWidth="1.4"
        fill="#1A1815"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="#F3D079"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MapPinIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C16 16.5 19 13.5 19 9.5C19 5.6 15.9 2.5 12 2.5C8.1 2.5 5 5.6 5 9.5C5 13.5 8 16.5 12 21Z"
        stroke="#D4AF37"
        strokeWidth="1.4"
        fill="#1A1713"
      />
      <circle cx="12" cy="9.5" r="3" fill="#F3D079" />
    </svg>
  );
}

export function VolumeIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="#D4AF37" strokeWidth="1.4" fill="#1C1A17" />
      <path d="M15.5 8.5C16.8 9.8 17.5 11.5 17.5 13.5C17.5 15.5 16.8 17.2 15.5 18.5" stroke="#F3D079" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19 5C21 7.2 22 10 22 13.5C22 17 21 19.8 19 22" stroke="#AA822B" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function VolumeMuteIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="#A8A29E" strokeWidth="1.4" fill="#1C1A17" />
      <line x1="22" y1="9" x2="16" y2="15" stroke="#E55353" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="16" y1="9" x2="22" y2="15" stroke="#E55353" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6L6 18M6 6L18 18" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 12L10 17L20 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({
  className = "w-4 h-4",
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: `${size}px`, maxHeight: `${size}px`, flexShrink: 0 }}
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
