import React, { useState, useEffect } from "react";
import styles from './Carousel.module.css';

function Carousel(props) {
	const [isDown, setIsDown] = useState(false);
	const [animation, setAnimation] = useState(true);
	const [animationIsActive, setAnimationIsActive] = useState(true);
	const [clickX, setClickX] = useState(0);
	const [left, setLeft] = useState(-props.width);
	const [startLeft, setStartLeft] = useState(0);
	const content = [props.content[props.content.length - 1], ...props.content, props.content[0]];

	function onBtnClick(str){
		setAnimation(true);
		if (str === "left") {
			(left === -props.width)?animationDelay(0, -props.width * (content.length - 2)):setLeft(value => value + props.width);
		}
		if (str ==="right") {
			(left === -props.width * (content.length - 2))?animationDelay(left - props.width, -props.width):setLeft(value => value - props.width);
		}
		setAnimation(true);
	}

	function infiniteSwipe(str) {
		if (str === "right") {
			if (startLeft === -props.width * (content.length - 2)) {
				animationDelay(startLeft - props.width, -props.width);
			} else {
				setLeft(startLeft - props.width);
			}
		}
		
		if (str === "left") {
			if (startLeft === -props.width) {
				animationDelay(0, -props.width * (content.length - 2));
			} else{
				setLeft(startLeft + props.width);
			}
		}
	}

	function animationDelay(...args) {
		setLeft(args[0]);
		setTimeout(() => {
			setAnimation(false);
			setLeft(args[1]);
		}, 500);
		setAnimation(true);

	}

	function onStart(event){
		setAnimation(false);
		let clientX = event.clientX || event.changedTouches[0].clientX;
		setIsDown(value => !value);
		setClickX(clientX);
		setStartLeft(left);

	}

	function onMove(event) {
		if (isDown) {
			let clientX = event.clientX || event.changedTouches[0].clientX;
			setLeft(clientX - clickX + startLeft);
		}
	}

	function onEnd(event) {
		if (!isDown) return;
		setAnimationIsActive(false);
		setTimeout(() => {
			setAnimationIsActive(true);
		}, 500);
		setAnimation(true);
		let clientX = event.clientX || event.changedTouches[0].clientX;
		setIsDown(value => !value);
		if ((clickX - clientX >= props.width / 3) && (Math.abs(clickX - clientX) >= props.width / 3)) {
			infiniteSwipe("right");
		} else {
			if ((clickX - clientX <= props.width / 3) && (Math.abs(clickX - clientX) >= props.width / 3)) {
				infiniteSwipe("left");
			} else {
				setLeft(startLeft);
			}
		}
	}

	return(<>
		<div className={styles.container}
			style={{height: props.height}}
			onMouseDown={e => animationIsActive?onStart(e):null} 
			onTouchStart={e => animationIsActive?onStart(e):null} 
			onMouseMove={e => onMove(e)}
			onTouchMove={e => onMove(e)}
			onTouchEnd={e => onEnd(e)}
			onMouseUp={e => onEnd(e)}
			onMouseLeave={e => onEnd(e)}
			onTouchCancel={e => onEnd(e)}>
			<div 
				style={{width: props.width, height: props.height}}
				className={styles.corouselContainer}>
				{content.map((el, index) => 
					<div key={index} className={`${styles.elementContainer} ${animation?styles.transition:null}`} style={{left: `${left}px`}}>
						{el}
					</div>
				)}
			</div>
		</div>
		<div className={styles.btnGroup}>
			<div className={styles.btnGoLeft} onClick={(e) => onBtnClick("left")}></div>
				{props.content.map((el, index) =>
					<div key={index} 
						className={`${styles.btn} ${((-index - 1) * props.width === left)?styles.currentBtn:null}`} 
						onClick={(e) => setLeft((-index - 1) * props.width)}></div>
					)}
			<div className={styles.btnGoRight} onClick={(e) => onBtnClick("right")}></div>
		</div>
	</>)
}

export default Carousel;