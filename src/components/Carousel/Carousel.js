import React, { useState } from 'react';
import styles from './Carousel.module.css';

function Carousel(props) {
  const { width } = props;
  const { height } = props;
  const [isDown, setIsDown] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [animationIsActive, setAnimationIsActive] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [left, setLeft] = useState(-width);
  const [startLeft, setStartLeft] = useState(0);
  const { content } = props;

  function animationDelay(...args) {
    setLeft(args[0]);
    setTimeout(() => {
      setAnimationIsActive(false);
      setAnimation(false);
      setLeft(args[1]);
    }, 500);
  }

  function onBtnClick(str) {
    setAnimation(true);
    setAnimationIsActive(true);
    setTimeout(() => {
      setAnimationIsActive(false);
    }, 500);
    if (str === 'left') {
      if (left === -width) {
        animationDelay(0, -width * content.length);
      } else {
        setLeft((value) => value + width);
      }
    }
    if (str === 'right') {
      if (left === -width * content.length) {
        animationDelay(left - width, -width);
      } else {
        setLeft((value) => value - width);
      }
    }
  }

  function infiniteSwipe(str) {
    if (str === 'right') {
      if (startLeft === -width * content.length) {
        animationDelay(startLeft - width, -width);
      } else {
        setLeft(startLeft - width);
      }
    }

    if (str === 'left') {
      if (startLeft === -width) {
        animationDelay(0, -width * content.length);
      } else {
        setLeft(startLeft + width);
      }
    }
  }

  function onStart(event) {
    setAnimation(false);
    const clientX = event.clientX || event.changedTouches[0].clientX;
    setIsDown((value) => !value);
    setClickX(clientX);
    setStartLeft(left);
  }

  function onMove(event) {
    if (isDown) {
      const clientX = event.clientX || event.changedTouches[0].clientX;
      setLeft(clientX - clickX + startLeft);
    }
  }

  function onEnd(event) {
    if (!isDown) return;
    setAnimationIsActive(true);
    setTimeout(() => {
      setAnimationIsActive(false);
    }, 500);
    const clientX = event.clientX || event.changedTouches[0].clientX;
    setIsDown((value) => !value);
    if ((clickX - clientX >= width / 3) && (Math.abs(clickX - clientX) >= width / 3)) {
      infiniteSwipe('right');
    } else if ((clickX - clientX <= width / 3) && (Math.abs(clickX - clientX) >= width / 3)) {
      infiniteSwipe('left');
    } else {
      setLeft(startLeft);
    }
    setAnimation(true);
  }

  return (
    <>
      <div
        className={styles.container}
        style={{ height }}
        onMouseDown={(e) => (animationIsActive ? null : onStart(e))}
        onTouchStart={(e) => (animationIsActive ? null : onStart(e))}
        onMouseMove={(e) => onMove(e)}
        onTouchMove={(e) => onMove(e)}
        onTouchEnd={(e) => onEnd(e)}
        onMouseUp={(e) => onEnd(e)}
        onMouseLeave={(e) => onEnd(e)}
        onTouchCancel={(e) => onEnd(e)}
      >
        <div
          style={{ width, height }}
          className={styles.corouselContainer}
        >
          <div className={`${styles.elementContainer} ${animation ? styles.transition : null}`} style={{ left: `${left}px` }}>
            {content[content.length - 1]}
          </div>
          {content.map((el, index) => (
            <div key={index} className={`${styles.elementContainer} ${animation ? styles.transition : null}`} style={{ left: `${left}px` }}>
              {el}
            </div>
          ))}
          <div className={`${styles.elementContainer} ${animation ? styles.transition : null}`} style={{ left: `${left}px` }}>
            {content[0]}
          </div>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <div className={styles.btnGoLeft} onClick={() => (animationIsActive ? null : onBtnClick('left'))} />
        {content.map((el, index) => (
          <div
            key={index}
            className={`${styles.btn} ${((-index - 1) * width === left) ? styles.currentBtn : null}`}
            onClick={() => { setAnimation(true); setLeft((-index - 1) * width); }}
          />
        ))}
        <div className={styles.btnGoRight} onClick={() => (animationIsActive ? null : onBtnClick('right'))} />
      </div>
    </>
  );
}

export default Carousel;
