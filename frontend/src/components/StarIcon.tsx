const StarIcon = ({ size = 20, color = "#facc15", className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="10,2 12,7 17,7 13,10 15,15 10,12 5,15 7,10 3,7 8,7" />
  </svg>
);

export default StarIcon;
