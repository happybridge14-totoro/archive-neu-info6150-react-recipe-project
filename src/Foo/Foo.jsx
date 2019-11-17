import React from 'react'
import styles from "./Foo.module.css";


const Foo = () => {
    return (
        <div className={`${styles.a} striking-color`}>
            The foo page
        </div>
    )
}

export default Foo
