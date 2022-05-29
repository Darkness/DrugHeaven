const PlusIcon = ({ width, height, color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 21.358 17.661"
		>
			<g
				id="Group_18"
				data-name="Group 18"
				transform="translate(-117 -77.411)"
			>
				<path
					id="Path_4"
					data-name="Path 4"
					d="M88.29,17.661H81.683a.46.46,0,0,1-.5-.411V.411a.46.46,0,0,1,.5-.411H88.29a.46.46,0,0,1,.5.411V17.25A.459.459,0,0,1,88.29,17.661Z"
					transform="translate(42.692 77.411)"
					fill="#e4e4e4"
				/>
				<path
					id="Path_5"
					data-name="Path 5"
					d="M21.358,81.6v5.463a.46.46,0,0,1-.5.411H.5a.459.459,0,0,1-.5-.41V81.6a.46.46,0,0,1,.5-.411H20.862A.46.46,0,0,1,21.358,81.6Z"
					transform="translate(117 1.913)"
					fill={color}
				/>
			</g>
		</svg>
	);
};

export default PlusIcon;
