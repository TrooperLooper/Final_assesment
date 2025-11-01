const Star = ({ size = 40, color = "white", delay = "0s", className = "" }) => (
  <svg
    className={`star-animate ${className}`}
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill={color}
    style={{ animationDelay: delay }}
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
);

export default Star;
