import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getCategoryById} from "../Proxy/Data";
import styles from "./Category.module.css"
import NavigationBar from "../Widgets/NavigationBar"

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: getCategoryById(this.props.id)
    };
  }
  
  render() {
    if (this.state.category === null) {
      window.location.href = '/error';
      return;
    }
    const positions = [true, true, 1];
    return (
      <div className={styles.category}>
         <NavigationBar positions={positions}/>
        <div className={styles.picBox}>
          <img className={styles.picDessert} src="https://cdn.ruled.me/wp-content/uploads/2014/09/keto-diet-low-carb-cheat-sheet-desserts.png" alt="Dessert"/>
        </div>
        <h3 className={styles.title}>Dessert</h3>
        <div className={styles.itemBox}>
          <img className={styles.pic} src="https://lh3.googleusercontent.com/qOg0hYNes72h4ZJX4FFnF-OROasxVtIiLIBtx7goiqownKJPbs5ACrab_Q-49eua0UQ5GeuCzlpUn9ONzvId5ygOt7o4R4BJVowO6h6-LTzAggxL3xoSY2bcI64-5BljVNxuAKo7hklKzBjlG41thkiAvmD8_bzk041QNc4X2LEpKYj6shAc94DzPn9Oyl3FXHGcmv7susWZIzXE4QBcjDCOpquQNj_JnbqnRlQxIBopjGr_Se2zytC0iKr7EfF0AivkzUCDHgu9uKqqpNfLXYcwg6f3otSuGpyRmvJi-kNx1cXWGy1ghFk_bSP9JtjQCVIKgbwuV9ZasJik1Pwqpae310Z89drHscLTpZUjZIPaA_EYlFE5hOjW2JP2UvDjCldwgB2jrCSo7JGH4IhM-2z6SSAcrNwCM4N-_5q7uQr5GTHEBcmS6N_Zy-zxcrFg2i1VlVUFcrtrHqqM2lqa2xwKEdSm7mHXS5hIIhXTfoJITDC9xv3qbVZBjgN1pVwRr1q2IrJDseFtJKFmYBxpkvOvAhFAVwnQsce6gnrkOUbNpE3xyyBIWAyhOm2G76N99I1aeAi738i8ey7EAFJjAsNYaaPfBbMze4M9bfr0eMBC6vtY-1NMu9-X3QGXulNEI6z_P6aJvNmUdIwNlwb6iztNKw8T0xQUlB-aY-7BAhm9ZZq9rxesOJiZc_YOmIPNml1c8ERXyMEaNzkzbjbYFpRPYVW45tq5CZnOb9Fcdplph3M=w642-h428-no"
               alt="Pineapple – Topped New York Cheesecake"/>
          <img className={styles.playSign} src="/images/video-icon.png" alt="video"/>
          <div>
            <a className={styles.subtitle} href="/">Pineapple – Topped New York Cheesecake</a>
            <div className={styles.text}>6 Hrs 20 mins | 20 mins Prep | 6 Hrs Cook</div>
          </div>
        </div>
        <div className={styles.itemBox}>
          <img className={styles.pic} src="https://lh3.googleusercontent.com/3S3VZn34takE5jsfpA9U4J59cOc_XWpRSXRE1u1uQPJln1gRiaDxukpkVzyPtzRxrW8qUSvcxscMxz5TGYkiO36p_X8icaCAlJ84YfIg3QjTMivARRy30JkVVREdgPh7KV4gfVZDjhLV1kzYAOfh6lhAjh-youNpxUyyhUTjI57zDY1E7cB9Y8kwJ5vX9T3DWfjblnxwlrgemJEQMwm2eSmF69EwDCUOT1Xw8Y5QV-lXyr5rtWXeuI0m7z-wM9Dnn4DRdhXWActt-hfShdN4TibXOx343FJcLbdZV1u_Vsw5Qq0SkrUgOkjKmmfOtVVCtFelrI0Is73rEHkHPaR0AZtq65NBCMRmWuZ3F3YWm8vLn1dP8i4jdGNJZ3HAJY_qUkZH8_JdfP4TzpCbm4BPavnThNzE2q2WzJcyIgFUmyTwVQsHJX_vc87wj-avLr3XPWIdiENIbusISJPAzRnjc0VOzhugqkUbR7d96gc4Fc43UqTQ775AWAQtaOjDgmJaztwYzHtOIZvJg_2_mAT-h57e_fU3pOC0zj-zBQqTeyAT33kZhkHzihgcLaqtAV5h6NEe_fyoWrofkydWvoK8FIqp1qSnI0DfL951OK4V0BlmnWKqy4NEZptwuqbadvGv7nO60udYh4Fh-5pO21PIG9V6a6pN-s36vQNi78N56iTRPJx5GY3YvurL0-9sxIdmXjOfKoJqem6_IiFo88ATnY7G5_-pOA7-6NN5AJFO1SJu1eQ=w640-h428-no"
               alt="Chocolate Chip Ice Cream Sandwich"/>
          <img className={styles.playSign} src="/images/video-icon.png" alt="video"/>
          <div>
            <a className={styles.subtitle} href="/">Chocolate Chip Ice Cream Sandwich</a>
            <div className={styles.text}>2 Hrs 45 mins | 15 mins Prep | 2 Hrs 30 mins Cook</div>
          </div>
        </div>
        <div className={styles.itemBox}>
          <img className={styles.pic} src="https://lh3.googleusercontent.com/sX_WbF_TVnPOxkoqmrhg995EzY5xt5bjpJfeo7iKUkJhTuE23vz9HL5ys6duhZR3GquJ9laqu6eCAKmBu5Q1lkHLMZeq6agW1rzpklbIjwN0u7j4IkIQFFZ3SIzdEmXXQ8dA8wef0JiYOrJI3Y0NsWQuhTtwdwA8IHKeAbqjTpgkwdRstwLWXuvQhB1ArI5khAP0VPyPVqCHfC4zAmgduUnJC-yxCIEn-v5o5POTIvwO4aJ_mSZ3G5-0v39fiVl7YhPv_SGKowf_gbrsI7uG_h_9FlRJOt-iBG5Zhw5BytbERmEWwh-jvEs1xBPoRBzyyi_ZSxOfoFB1dwr6mTDNU80OF9KfAMdFCtV6g4-TiIwt7k3UF88GeVSPaN4lDbd71ocEKnw60XEftfeqWG_kwm2cieu56LCVGG5vhpgf47vGixbLhq1Cu9aiPAFLHsOdD5hnn5qvGrZi0bTZgXXYLVP5ySF5pj5WCNqfNHIwafiMEuQ818qJa0jcxU0OvMUOk2HdBkTrGUBiae2OdndSx3wHYRcvqx9KtiABGUkHNT3S7_yQOe35K4NaDg7G-iNBeaAyqU9sMuWlLZ5eKOl3Av6nRBxuMeUqQDIpU-WlQ4dWjVd5tDsyd2qC7ncTnWsmNqyIMozW133TzUqkLd5bpsUgC-DnoYyUr73kELICM17xX9OdA3XlTEOx65jOtmFd2r1Dv7VFZMnZoCspbWKwiqQ2-NZm1rdcPnVq5x5E4ZWRIjE=w642-h428-no"
               alt="Deep-Dish Layered Banana Pudding"/>
          <img className={styles.playSign} src="/images/video-icon.png" alt="video"/>
          <div>
            <a className={styles.subtitle} href="/">Deep-Dish Layered Banana Pudding</a>
            <div className={styles.text}>3 Hrs 45 mins | 30 mins Prep | 3 Hrs 15 Mins Cook</div>
          </div>
        </div>
        <div className={styles.itemBox}>
          <img className={styles.pic} src="https://lh3.googleusercontent.com/jmQI8aygL5UmZ0Ar4hvCNbY5VW2L7WjQ6Zl6_I9ySDqSe9ksW9aS3R5DhMzAjN5UTig3GR40c6S2DMfX47j8tBQwoqRXP20Taii5ulqhIMIDXTRN5g_MXXUBwUsAYkCipKdXF8Ns3S-d823m6AobjBPRt5W_K6Yfj-GSbbaIWxO05j-Xk2PwtAf1fnQt2tPoF8KqSESGs-xCexJ6y6QLV16WbTa2hpB3jio4YqdBU8QM68sUb4iBJVI1Q0tOv6KeGr1GbPtyhPwwMRplqOMfJ05tmUNbNh0RM_-_0t34HjQ08NRixzW9UZOYSB2_T7RAPzb6uP8aLjPua6lM_6F3Gi1AwptMS5Jpa4ZrJN9HQ1QNxnOqlnDqb5May-2VUpRjRi-tE36K4ImLoCZ6B8bpiF6FxvKz0NKOZyNWUPUPZG00h_Ys52sd9EHvlMWaakXTQ1MjxNhT2DeiVg4QoXu_09uAe1eDAy9XtiHWO_I8txCvJ30o2Ql64gNpv8nutoQCn68uIGOpNoKWOjxpBV7c0BMRBtnM0JIW6qkWSKrVrsU-FiGGJ7J_CWSf0_uZyoiszgEiFWrON0LYqjU7GoUx5LgFZx6iPUam1iZAI5yZqcV7IlqC-KXo6oxKp6jotp4g2mKWhaE9y5JBuSjLOE-NSKlpuxk41v3zhO2mKsIErLJawk5mphViU45peElNJd3tEv45Xwsx2E5QVJXOfy-igtb-f6prcIh32Xb08g92fdiP2Bc=w768-h512-no"
               alt="Chocolate Chip Cookies"/>
          <img className={styles.playSign} src="/images/video-icon.png" alt="video"/>
          <div>
            <a className={styles.subtitle} href="/">Chocolate Chip Cookies</a>
            <div className={styles.text}>20 mins | 10mins Prep | 10mins Cook</div>
          </div>
        </div>
        <div className={styles.itemBox}>
          <img className={styles.pic} src="https://lh3.googleusercontent.com/bK16H9HEvoFdHKt1c0o1kcik0y5VpFdULms8r1IC__P_ibhrie03uffchOCmwwmPTzphsHGk0A4bwgPI_38m0pSgLBAI3nKMEWxPINbH551BE6K80RLWnnwO4ZRt7Io74xva5yzRqD15gmSaRg9B3VLx3yU4xIkaG3RMLu4ZKLZxPeK2Ajmp65zrKjHx_sEN--F5G4VEhhA8qhCmvV9g4XncN3OpDlKKztUk4a35Ro68cxsqThd2pLxc_W6R4DWVxbQ3EHWj5czI5_wIrosFZnawLb32waLtAS-JXmsKg_Heg25jq5uEYOCse7v4p8-FNpqG5JtCLgPN2yvqSXzPJ-ozvjJpNTeoDSTEuZBPlFOL6yAq2FJC1XkR6J00taxoVKsNV1AhLo1D0fPv47Nr7VGf56M4Z8QJc6QBD-j1prVtm-kb-1aCiQHrdpaRrv4XW6xirGxwp4abHRsAw-gWnNSsEW3xgVcit5U_hBGanT1Q24sVaRTiwiKN_PduHDlkQdkdhKfQ7m6WnUoPwk_vsJzGI0Ea68VA8MgPWrxa3ocCaAemU1PnREeo1jaaLN8Zp3zgFiEVdr4W3WIAT_sOAptkL_UxMHI6XkyA28U7ik7DM0KhiH9jv1NIXqSJoSCSohuh83os08XJ7uoTiLzTFdT7WEtOyWwieFB8vQEvksMch-xRXumd2MsSgbk6zCJqA1tx7AY7i055ri6aRWBQGoGDeOGid5qGq9kLVuM6T_SPIzc=w248-h372-no"
               alt="Chocolate Brownies"/>
          <img className={styles.playSign} src="/images/video-icon.png" alt="video"/>
          <div>
            <a className={styles.subtitle} href="/">Chocolate Brownies</a>
            <div className={styles.text}>40 mins | 10 mins prep | 30 mins cook</div>
          </div>
        </div>
        
      </div>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired
};
