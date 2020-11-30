import React, { useState } from 'react';
import styles from './Carousel.module.css';

function Carousel(props) {
  const {
    width = 600, height = 600, infinite = true, slides = 1,
  } = props.settings;
  const [isDown, setIsDown] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [animationIsActive, setAnimationIsActive] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [left, setLeft] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const content = (!infinite || slides === 1)
    ? [...props.content] : [...props.content, ...props.content, ...props.content];
  const [positionMultiplier, setPositionMultiplier] = useState(
    (content.length !== slides)
      ? [...content.map((el, index) => index - Math.floor(content.length / 3))]
      : [...content.map((el, index) => index)],
  );

  function animationDelay(...args) {
    setLeft(args[0]);
    setTimeout(() => {
      setAnimationIsActive(false);
      setAnimation(false);
      if (infinite) {
        setLeft(0);
        const arr = [...positionMultiplier];
        const arr2 = arr.splice(args[1], args[2]);
        setPositionMultiplier(args[3] ? [...arr, ...arr2] : [...arr2, ...arr]);
      } else {
        setLeft(0);
        args[3]
          ? setPositionMultiplier((value) => [...value.map((el) => el + args[2])])
          : setPositionMultiplier((value) => [...value.map((el) => el - args[2])]);
      }
    }, 300);
  }

  function swipe(str, position, index, quantity, boolean) {
    setAnimationIsActive(true);
    setAnimation(true);

    if (str === 'left') {
      if (infinite) {
        animationDelay(position, index, quantity, boolean);
      } else if (Math.abs(positionMultiplier[0] * (width / slides)) > width) {
        animationDelay(position, index, quantity, boolean);
      } else {
        const i = positionMultiplier.findIndex((el) => el === 0);
        animationDelay((width / slides) * i, 0, i, boolean);
      }
    }
    if (str === 'right') {
      if (infinite) {
        animationDelay(position, index, quantity, boolean);
      } else if (Math.abs(positionMultiplier[content.length - slides] * (width / slides)) > width) {
        animationDelay(position, index, quantity, boolean);
      } else {
        const i = positionMultiplier.findIndex((el) => el === 0);
        animationDelay(
          -(width / slides) * (content.length - i - slides),
          i + 1,
          content.length - i - slides,
          boolean,
        );
      }
    }
  }

  function goTo(index) {
    const i = positionMultiplier.findIndex((el) => el === 0);
    if (!positionMultiplier[index]) return;
    if (index < i) {
      swipe('left', -positionMultiplier[index] * width, 0, i - index, true);
    } else {
      swipe('right', -positionMultiplier[index] * width, content.length + i - index, index - i, false);
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
      if (clickX > clientX) {
        if (infinite) {
          setLeft(clientX - clickX + startLeft);
        } else if (
          Math.abs(positionMultiplier[content.length - slides] * (width / slides)) > width
        ) {
          setLeft(clientX - clickX + startLeft);
        } else {
          const i = positionMultiplier.findIndex((el) => el === 0);
          if (clickX - clientX < (content.length - i - slides) * (width / slides)) {
            setLeft(clientX - clickX);
          } else {
            setLeft((content.length - i - slides) * (-width / slides));
          }
        }
      }
      if (clickX < clientX) {
        if (infinite) {
          setLeft(clientX - clickX + startLeft);
        } else if (Math.abs(positionMultiplier[0] * (width / slides)) > width) {
          setLeft(clientX - clickX + startLeft);
        } else {
          const i = positionMultiplier.findIndex((el) => el === 0);
          if (clientX - clickX < i * (width / slides)) {
            setLeft(clientX - clickX);
          } else {
            setLeft(i * (width / slides));
          }
        }
      }
    }
  }

  function onEnd(event) {
    if (!isDown) return;
    setAnimationIsActive(true);
    setTimeout(() => {
      setAnimationIsActive(false);
    }, 300);
    const clientX = event.clientX || event.changedTouches[0].clientX;
    setIsDown((value) => !value);
    if ((clickX - clientX >= width / 3) && (Math.abs(clickX - clientX) >= width / 3)) {
      infinite || (slides === 1)
        ? swipe('right', -width, positionMultiplier.length - slides, slides, false)
        : swipe('right', -width, slides, slides, false);
    } else if ((clickX - clientX <= width / 3) && (Math.abs(clickX - clientX) >= width / 3)) {
      infinite || (slides === 1)
        ? swipe('left', width, 0, slides, true)
        : swipe('left', width, 0, slides, true);
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
        <button className={styles.btnGoLeft} onClick={() => (animationIsActive ? null : swipe('left', width, 0, slides, true))} />
        {slides === 1 ? content.map((el, index) => (
          <button
            key={index}
            className={`${styles.btn} ${(positionMultiplier[index] === 0) ? styles.currentBtn : ''}`}
            onClick={() => goTo(index)}
          />
        )) : null}
        <button className={styles.btnGoRight} onClick={() => (animationIsActive ? null : swipe('right', -width, positionMultiplier.length - slides, slides, false))} />
      </div>
    </>
  );
}

export default Carousel;
