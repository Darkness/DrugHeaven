const CheckMark = ({ width, height, color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 47.915 30.627"
		>
			<g id="check-mark-svgrepo-com" transform="translate(0 -5.814)">
				<g
					id="Group_9"
					data-name="Group 9"
					transform="translate(0 5.814)"
				>
					<path
						id="Path_1"
						data-name="Path 1"
						d="M21.689,35.044a6.239,6.239,0,0,1-7.869,0L1.629,24.592a4.305,4.305,0,0,1,0-6.745,6.239,6.239,0,0,1,7.869,0l7.264,6.227a1.58,1.58,0,0,0,1.988,0L38.417,7.211a6.239,6.239,0,0,1,7.869,0,4.454,4.454,0,0,1,1.629,3.373,4.454,4.454,0,0,1-1.629,3.373Z"
						transform="translate(0 -5.814)"
						fill={color}
					/>
				</g>
			</g>
		</svg>
	);
};

export default CheckMark;
