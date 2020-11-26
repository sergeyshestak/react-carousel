import React, { useState, useEffect } from "react";
import styles from './Carousel.module.css';

function Carousel(props) {
	const [isDown, setIsDown] = useState(false);
	const [animation, setAnimation] = useState(true);
	const [animationIsActive, setAnimationIsActive] = useState(false);
	const [clickX, setClickX] = useState(0);
	const [left, setLeft] = useState(-props.width);
	const [startLeft, setStartLeft] = useState(0);
	const content = [props.content[props.content.length - 1], ...props.content, props.content[0]];

	function onBtnClick(str){
		setAnimation(true);
		setAnimationIsActive(true);
		setTimeout(() => {
			setAnimationIsActive(false);
		}, 500);
		if (str === "left") {
			(left === -props.width)?animationDelay(0, -props.width * (content.length - 2)):setLeft(value => value + props.width);
		}
		if (str ==="right") {
			(left === -props.width * (content.length - 2))?animationDelay(left - props.width, -props.width):setLeft(value => value - props.width);
		}
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
			setAnimationIsActive(false);
			setAnimation(false);
			setLeft(args[1]);
		}, 500);
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
		setAnimationIsActive(true);
		setTimeout(() => {
			setAnimationIsActive(false);
		}, 500);
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
		setAnimation(true);
	}

	return(<>
		<div className={styles.container}
			style={{height: props.height}}
			onMouseDown={e => animationIsActive?null:onStart(e)} 
			onTouchStart={e => animationIsActive?null:onStart(e)} 
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
			<div className={styles.btnGoLeft} onClick={(e) => animationIsActive?null:onBtnClick("left")}></div>
				{props.content.map((el, index) =>
					<div key={index} 
						className={`${styles.btn} ${((-index - 1) * props.width === left)?styles.currentBtn:null}`} 
						onClick={(e) => {setAnimation(true); setLeft((-index - 1) * props.width)}}></div>
					)}
			<div className={styles.btnGoRight} onClick={(e) => animationIsActive?null:onBtnClick("right")}></div>
		</div>
	</>)
}

export default Carousel;