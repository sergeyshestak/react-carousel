import React from 'react';
import Carousel from '../Carousel/Carousel';
import styles from './App.module.css';

const content = [
  <div>
    <div className={styles.element} style={{ backgroundColor: 'black' }} />
    <div className={styles.element} style={{ backgroundColor: 'black' }} />
  </div>,
  <div className={styles.element} style={{ backgroundColor: 'red' }} />,
  <div className={styles.element} style={{ backgroundColor: 'green' }} />,
  <div className={styles.element} style={{ backgroundColor: 'pink' }} />,
  <div className={styles.element} style={{ backgroundColor: 'blue' }} />,
];

const imageContent = [
  <img className={styles.imageElement} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2FylvyN1V.jpg&f=1&nofb=1" alt="" />,
  <img className={styles.imageElement} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F7WCbIjqjHM4%2Fmaxresdefault.jpg&f=1&nofb=1" alt="" />,
  <img className={styles.imageElement} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbeautifulcoolwallpapers.files.wordpress.com%2F2011%2F08%2Fnaturewallpaper.jpg&f=1&nofb=1" alt="" />,
  <img className={styles.imageElement} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcroatia.hr%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fimage_full_width%2Fpublic%2F2017-08%2F02_01_slide_nature.jpg%3Fitok%3DItAHmLlp&f=1&nofb=1" alt="" />,
];

function App() {
  return (
    <>
      <Carousel content={content} width={600} height={600} />
      <Carousel content={imageContent} width={600} height={600} />
    </>
  );
}

export default App;
