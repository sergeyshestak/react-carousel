import React, { useState } from 'react';
import styles from './Carousel.module.css';

const LEFT_DIRECTION = 'left';
const RIGHT_DIRECTION = 'right';
const ANIMATION_DURATION = 300;

function Carousel(props) {
  const { settings, content: contentProp } = props;

  const {
    width = 600, height = 600, infinite = true, slides = 1,
  } = settings;
  const content = (!infinite || slides === 1)
    ? [...contentProp] : [...contentProp, ...contentProp, ...contentProp];

  const [isDown, setIsDown] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [animationIsActive, setAnimationIsActive] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [left, setLeft] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [positionMultiplier, setPositionMultiplier] = useState(
    (content.length !== slides)
      ? [...content.map((el, index) => index - Math.floor(content.length / 3))]
      : [...content.map((el, index) => index)],
  );

  function getPositionMultiplierIndex() {
    return positionMultiplier.findIndex((el) => el === 0);
  }

  function animationDelay(position, index, quantity, isSwipeLeft) {
    setLeft(position);

    setTimeout(() => {
      setAnimationIsActive(false);
      setAnimation(false);
      setLeft(0);

      if (infinite) {
        const positionMultiplierCopy = [...positionMultiplier];
        const elementsToMove = positionMultiplierCopy.splice(index, quantity);

        setPositionMultiplier(
          isSwipeLeft
            ? [...positionMultiplierCopy, ...elementsToMove]
            : [...elementsToMove, ...positionMultiplierCopy],
        );
      } else {
        setPositionMultiplier(
          [...positionMultiplier.map((el) => (isSwipeLeft ? el + quantity : el - quantity))],
        );
      }
    }, ANIMATION_DURATION);
  }

  function swipe(str, position, index, quantity, isSwipeLeft) {
    setAnimationIsActive(true);
    setAnimation(true);

    let rangeToMove;
    let animationDelayParams;
    const positionMultiplierIndex = getPositionMultiplierIndex();

    if (str === LEFT_DIRECTION) {
      rangeToMove = 0;
      animationDelayParams = [
        (width / slides) * positionMultiplierIndex,
        0,
        positionMultiplierIndex,
        isSwipeLeft,
      ];
    } else {
      rangeToMove = content.length - slides;
      animationDelayParams = [
        -(width / slides) * (content.length - positionMultiplierIndex - slides),
        positionMultiplierIndex + 1,
        content.length - positionMultiplierIndex - slides,
        isSwipeLeft,
      ];
    }

    if (infinite
      || (Math.abs(positionMultiplier[rangeToMove] * (width / slides)) > width)
    ) {
      animationDelay(position, index, quantity, isSwipeLeft);
    } else {
      animationDelay(...animationDelayParams);
    }
  }

  function goTo(index) {
    if (!positionMultiplier[index]) return;

    const positionMultiplierIndex = getPositionMultiplierIndex();
    let swipeParams;

    if (index < positionMultiplierIndex) {
      swipeParams = [
        LEFT_DIRECTION,
        -positionMultiplier[index] * width,
        0,
        positionMultiplierIndex - index,
        true,
      ];
    } else {
      swipeParams = [
        RIGHT_DIRECTION,
        -positionMultiplier[index] * width,
        content.length + positionMultiplierIndex - index,
        index - positionMultiplierIndex,
        false,
      ];
    }

    swipe(...swipeParams);
  }

  function onStart(event) {
    const clientX = event.clientX || event.changedTouches[0].clientX;

    setIsDown((value) => !value);
    setAnimation(false);
    setClickX(clientX);
    setStartLeft(left);
  }

  function onMove(event) {
    if (!isDown) return;

    const clientX = event.clientX || event.changedTouches[0].clientX;
    const positionMultiplierIndex = getPositionMultiplierIndex();
    let position;
    let rangeToMove;
    let restElementsWidth;

    if (clickX > clientX) {
      rangeToMove = content.length - slides;
      position = (content.length - positionMultiplierIndex - slides) * (-width / slides);
      restElementsWidth = (content.length - positionMultiplierIndex - slides) * (width / slides);
    } else {
      rangeToMove = 0;
      position = positionMultiplierIndex * (width / slides);
      restElementsWidth = positionMultiplierIndex * (width / slides);
    }

    if (infinite
      || Math.abs(positionMultiplier[rangeToMove] * (width / slides)) > width
    ) {
      setLeft(clientX - clickX + startLeft);
    } else if (Math.abs(clickX - clientX) < restElementsWidth) {
      setLeft(clientX - clickX);
    } else {
      setLeft(position);
    }
  }

  function onEnd(event) {
    if (!isDown) return;

    const clientX = event.clientX || event.changedTouches[0].clientX;
    const isNeededToSwipe = (Math.abs(clickX - clientX) >= width / 3);

    setAnimationIsActive(true);
    setIsDown((value) => !value);
    setAnimation(true);
    setTimeout(() => {
      setAnimationIsActive(false);
    }, ANIMATION_DURATION);

    if ((clickX - clientX >= width / 3) && isNeededToSwipe) {
      swipe(
        RIGHT_DIRECTION,
        -width,
        infinite || (slides === 1) ? positionMultiplier.length - slides : slides,
        slides,
        false,
      );
    } else if ((clickX - clientX <= width / 3) && isNeededToSwipe) {
      swipe(LEFT_DIRECTION, width, 0, slides, true);
    } else {
      setLeft(startLeft);
    }
  }

  function handleSideButtonsClick(str, position, index, quantity, isSwipeLeft) {
    if (animationIsActive) return;

    swipe(str, position, index, quantity, isSwipeLeft);
  }

  function createButton(className, onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => onClick()}
      >
        {}
      </button>
    );
  }

  return (
    <>
      <div
        className={styles.container}
        style={{ height }}
      >
        <div
          style={{ width, height }}
          className={styles.corouselContainer}
          onMouseDown={(e) => (animationIsActive ? null : onStart(e))}
          onTouchStart={(e) => (animationIsActive ? null : onStart(e))}
          onMouseMove={(e) => onMove(e)}
          onTouchMove={(e) => onMove(e)}
          onTouchEnd={(e) => onEnd(e)}
          onMouseUp={(e) => onEnd(e)}
          onMouseLeave={(e) => onEnd(e)}
          onTouchCancel={(e) => onEnd(e)}
        >
          {content.map((el, index) => (
            <div
              key={index}
              className={`${styles.elementContainer} ${animation ? styles.transition : ''}`}
              style={{
                left: `${positionMultiplier[index] * (width / slides) + left}px`, minWidth: `${width / slides}px`, maxWidth: `${width / slides}px`, height,
              }}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.btnGroup}>
        {
          createButton(
            styles.btnGoLeft,
            () => handleSideButtonsClick(
              LEFT_DIRECTION,
              width,
              0,
              slides,
              true,
            ),
          )
        }
        <ul className={styles.btnGoToGroup}>
          {slides === 1 ? content.map((el, index) => (
            <li key={index} className={styles.btnContainer}>
              <button
                type="button"
                className={`${styles.btn} ${(positionMultiplier[index] === 0) ? styles.currentBtn : ''}`}
                onClick={() => goTo(index)}
              >
                {}
              </button>
            </li>
          )) : null}
        </ul>
        {
          createButton(
            styles.btnGoRight,
            () => handleSideButtonsClick(
              RIGHT_DIRECTION,
              -width,
              positionMultiplier.length - slides,
              slides,
              false,
            ),
          )
        }
      </div>
    </>
  );
}

export default Carousel;
