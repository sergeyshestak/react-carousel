import React from 'react';
import Carousel from '../Carousel/Carousel';
import styles from './App.module.css';

const imageContent = [
  <img className={styles.imageElement} src="https://eco-business.imgix.net/ebmedia/fileuploads/Feature_RightsofNature_inline2.jpg?fit=crop&h=801&ixlib=django-1.2.0&q=85&w=1200" alt="" />,
  <img className={styles.imageElement} src="https://oecdenvironmentfocusblog.files.wordpress.com/2020/06/wed-blog-shutterstock_1703194387_low_nwm.jpg?w=640" alt="" />,
  <img className={styles.imageElement} src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*" alt="" />,
  <img className={styles.imageElement} src="https://i.pinimg.com/originals/a4/47/30/a44730c584b5c70d38fa61c87db3eca3.jpg" alt="" />,
  <img className={styles.imageElement} src="https://miro.medium.com/max/10836/1*5lpiSFo6j5dhrr6Z6RFd8Q.jpeg" alt="" />,
];

function App() {
  return (
    <>
      <Carousel
        content={imageContent}
        settings={{
          width: 600,
          height: 600,
          infinite: true,
          slides: 3,
        }}
      />
      <Carousel
        content={imageContent}
        settings={{
          width: 600,
          height: 600,
          infinite: false,
          slides: 1,
        }}
      />
    </>
  );
}

export default App;
