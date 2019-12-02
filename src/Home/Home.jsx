import React from 'react'
import Form from "../Widgets/Form";
import styles from "./Home.module.css";

const Home = () => {

    return (
        <div className={styles.container}>
        
            <div className={styles.text}>
                <img className={styles.pic}src="https://www.tasteofhome.com/wp-content/uploads/2018/01/Duck-with-Orange-Hazelnut-Stuffing_EXPS_TOHCA20_9947_E08_09_1b-696x696.jpg" alt="Duck" />
                <div className={styles.txt}>
                    <div className={styles.title}>Must try Duck Recipe for Christmas</div>
                </div>    
            </div>
            
            <div className={styles.text}>
                <h1 className={styles.just}>Just For You</h1>
                <div className={styles.grid}>
                    <div className={styles.gri}>
                        <div>
                            <img className={styles.image} src="https://lh3.googleusercontent.com/aEfm6xbSYqlH0u918dm2tuoIUkqFrMnducrf8D8pvGwrL1BbHFyI7a14iDFvVtZRFpLI7OcU4WZH_ek-n70ZSA=s640-c-rw-v1-e365" alt="avocado" />
                        </div>
                        <div className={styles.word}>
                            <a className={`clickable`} href="/AllCategories">Breakfast Scramble Stuffed Avocado</a>
                        </div>

                    </div>
                    <div className={styles.gri}>2</div>
                    <div className={styles.gri}>3</div>
                </div>    
            </div>
            <div className={styles.text}>
                <h1 className={styles.just}>Popular Picks</h1>
                <div className={styles.grid}>
                    <div className={styles.gri}>
                        <div>
                            <img className={styles.image} src="https://lh3.googleusercontent.com/Rv-SOs4izR7DltbDtoHAKuwp6ofI-GBe_5Z2sOVg7_9hL0Yfx5AR2WF2iWKPPjwhJ8YyyPYHOHQTR9VRm1JW=s640-c-rw-v1-e365" alt="pan-fired patato" />
                        </div>
                        <div className={styles.word}>
                            <a className={`clickable`} href="/AllCategories">The Best Pan-Fried Breakfast Patatoes</a>
                        </div>
                        
                    </div>
                    <div className={styles.gri}>5</div>
                    <div className={styles.gri}>6</div> 
                </div>
            </div> 
              
        </div>
    )
}

export default Home
