const RightStar = ({ size = 40, color = "white" }) => (
  <>
    <style>{`
      .right-star-animate {
        animation: twinkleRight 1s infinite ease-in-out, rotateRight 8s linear infinite;
      }
      @keyframes twinkleRight {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        70% { opacity: 1; transform: scale(1.1); }
      }
      @keyframes rotateRight {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <svg
      className="right-star-animate"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
          M50,0
          Q57,32 100,50
          Q57,68 50,100
          Q43,68 0,50
          Q43,32 50,0
          Z
        "
      />
    </svg>
  </>
);

export default RightStar;
