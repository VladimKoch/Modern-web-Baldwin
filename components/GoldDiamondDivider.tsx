import React from "react";

interface GoldDiamondDividerProps {
  className?: string;
  withWings?: boolean;
}

export function GoldDiamondDivider({ className = "", withWings = true }: GoldDiamondDividerProps) {
  return (
    <div className={`relative flex items-center justify-center w-full my-3 ${className}`}>
      {/* Left Hairline */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-[#D4AF37]/80" style={{ height: "1px" }} />

      {/* Central Diamond Filigree Ornament */}
      <div className="relative flex items-center justify-center mx-3 z-10 shrink-0">
        {withWings && (
          <div className="flex items-center space-x-1.5 text-[#D4AF37]/60">
            <span className="w-1.5 h-[1px] bg-[#D4AF37]/70" style={{ width: "6px", height: "1px" }} />
            <span className="w-1 h-1 rotate-45 border border-[#D4AF37]/80 bg-[#161412]" style={{ width: "4px", height: "4px" }} />
          </div>
        )}

        <div className="relative mx-1.5 shrink-0 flex items-center justify-center">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-[#D4AF37]/30 blur-sm rounded-full transform scale-150 pointer-events-none" />
          {/* Main diamond */}
          <div
            className="w-2.5 h-2.5 rotate-45 border border-[#F3D079] bg-[#0E0D0C] shadow-[0_0_8px_rgba(212,175,55,0.7)] shrink-0"
            style={{ width: "10px", height: "10px" }}
          />
        </div>

        {withWings && (
          <div className="flex items-center space-x-1.5 text-[#D4AF37]/60">
            <span className="w-1 h-1 rotate-45 border border-[#D4AF37]/80 bg-[#161412]" style={{ width: "4px", height: "4px" }} />
            <span className="w-1.5 h-[1px] bg-[#D4AF37]/70" style={{ width: "6px", height: "1px" }} />
          </div>
        )}
      </div>

      {/* Right Hairline */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-[#D4AF37]/80" style={{ height: "1px" }} />
    </div>
  );
}
