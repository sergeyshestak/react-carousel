import React, { useState } from "react";
import styles from './Carousel.module.css';

function Carousel(props) {
	const [isDown, setIsDown] = useState(false);
	const [clickX, setClickX] = useState(0);
	const [left, setLeft] = useState(-props.width);
	const [startLeft, setStartLeft] = useState(0);
	const content = [props.content[props.content.length - 1], ...props.content, props.content[0]];

	function onStart(event){
		let clientX = event.clientX || event.changedTouches[0].clientX;
		setIsDown(value => !value);
		setClickX(clientX);
		setStartLeft(left)
	}

	function onMove(event) {
		let clientX = event.clientX || event.changedTouches[0].clientX;
		if (isDown) {
			setLeft(clientX - clickX + startLeft);
		}
	}

	function onEnd(event) {
		let clientX = event.clientX || event.changedTouches[0].clientX;
		setIsDown(value => !value);
		if ((clickX - clientX >= props.width / 3) && (Math.abs(clickX - clientX) >= props.width / 3)) {
			(startLeft === -props.width * (content.length - 2))?setLeft(-props.width):setLeft(startLeft - props.width);
		} else {
			if ((clickX - clientX <= props.width / 3) && (Math.abs(clickX - clientX) >= props.width / 3)) {
				(startLeft === -props.width)?setLeft(-props.width * (content.length - 2)):setLeft(startLeft + props.width);
			} else {
				setLeft(startLeft);
			}
		}
	}

	return(
		<div className={styles.container}
			style={{height: props.height}}
			onMouseDown={e => onStart(e)} 
			onTouchStart={e => onStart(e)} 
			onTouchEnd={e => onEnd(e)}
			onMouseUp={e => onEnd(e)}
			onMouseMove={e => onMove(e)}
			onTouchMove={e => onMove(e)}>
			<div 
				style={{width: props.width, height: props.height}}
				className={styles.corouselContainer}>
				{content.map((el, index) => 
					<div key={index} className={styles.elementContainer} style={{left: `${left}px`}}>
						{el}
					</div>
				)}
			</div>
		</div>
	)
}

export default Carousel;