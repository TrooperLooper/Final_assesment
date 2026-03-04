import React from "react";

interface GameImageProps {
  src: string;
  alt: string;
}

export const GameImage: React.FC<GameImageProps> = ({ src, alt }) => {
  return (
    <div
      className="overflow-hidden rounded-lg border-4 border-white mb-8 mt-2 flex items-center justify-center bg-black"
      style={{ width: "133px", height: "133px" }}
    >
      <img src={src} alt={alt} className="object-cover w-full h-full mx-auto" />
    </div>
  );
};
