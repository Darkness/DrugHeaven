const LitecoinIcon = ({ width, height, color }) => {
	return (
		<svg
			id="litecoin-ltc-logo"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fil={color}
			viewBox="0 0 82.6 82.6"
		>
			<circle
				id="Ellipse_48"
				data-name="Ellipse 48"
				cx="36.83"
				cy="36.83"
				r="36.83"
				transform="translate(4.47 4.47)"
				fill="#fff"
			/>
			<path
				id="Path_208"
				data-name="Path 208"
				fill={color}
				d="M41.3,0A41.3,41.3,0,1,0,82.6,41.3h0A41.18,41.18,0,0,0,41.54,0ZM42,42.7,37.7,57.2h23a1.16,1.16,0,0,1,1.2,1.12v.38l-2,6.9a1.49,1.49,0,0,1-1.5,1.1H23.2l5.9-20.1-6.6,2L24,44l6.6-2,8.3-28.2a1.51,1.51,0,0,1,1.5-1.1h8.9a1.16,1.16,0,0,1,1.2,1.12v.38L43.5,38l6.6-2-1.4,4.8Z"
			/>
		</svg>
	);
};

export default LitecoinIcon;
