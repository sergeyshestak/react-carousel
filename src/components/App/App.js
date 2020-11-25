import React from "react";
import Carousel from "../Carousel/Carousel";
import styles from "./App.module.css";

const content = [
	<div>
		<div className={styles.element} style={{backgroundColor: "black"}}></div><div className={styles.element} style={{backgroundColor: "black"}}></div>
	</div>,
	<div className={styles.element} style={{backgroundColor: "red"}}></div>,
	<div className={styles.element} style={{backgroundColor: "green"}}></div>,
	<div className={styles.element} style={{backgroundColor: "pink"}}></div>,
	<div className={styles.element} style={{backgroundColor: "blue"}}></div>
];

function App() {
	return (
		<Carousel content={content} width={600} height={600}/>
	);
}

export default App;