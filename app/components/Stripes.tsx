interface StripesProps {
  color?: string;
  className?: string;
  inverted?: boolean;
  bgColor?: string;
}

export default function Stripes({ color, className = "", inverted = false, bgColor }: StripesProps) {
  if (inverted && bgColor) {
    // For inverted mode with background color, create dark stripes with colored gaps
    return (
      <div className={`${className}`} style={{ backgroundColor: bgColor }} aria-hidden="true">
        <div className="relative">
          {Array.from({ length: 24 }, (_, index) => {
            // Thicker dark bands at bottom with less spacing
            // spacing (colored gaps) increases as bands get thinner
            const reverseIndex = 23 - index;
            const height = Math.max(1, reverseIndex * 0.8);
            const marginTop = index * 0.5 + (index * index * 0.08);
            
            return (
              <div
                key={index}
                style={{ 
                  marginTop: `${marginTop}px`, 
                  height: `${height}px`,
                  backgroundColor: '#1c1c1c'
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Original stripe behavior
  return (
    <div className={`mt-20 pb-40 lg:pb-64 bg-inverse ${className}`} aria-hidden="true">
      <div style={{ marginTop: "-23px" }}>
        {Array.from({ length: 24 }, (_, index) => (
          <div
            key={index}
            className={!color ? "bg-primary" : ""}
            style={{ 
              marginTop: `${index}px`, 
              height: `${23 - index}px`,
              ...(color && { backgroundColor: color })
            }}
          />
        ))}
      </div>
    </div>
  );
}
