import React from "react";
import MetaBalls from "./metal-ball";

const Preloader: React.FC = () => {
  return (
    <div className="preloader fixed inset-0 z-50 flex justify-center items-center bg-black">
      <div className="loader"></div>
      <MetaBalls
        color="#ffffff"
        cursorBallColor="#ffffff"
        cursorBallSize={2}
        ballCount={15}
        animationSize={50}
        enableMouseInteraction={true}
        enableTransparency={true}
        hoverSmoothness={0.05}
        clumpFactor={1}
        speed={0.9}
      />
    </div>
  );
};

export default Preloader;
