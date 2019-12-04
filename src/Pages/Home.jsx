import React from 'react'
import {ulid} from 'ulid';
import styles from "./Home.module.css";
import {getItemsByTag, getMostPopularItems} from "../Proxy/Data";

const itemsChristmas = getItemsByTag("Christmas");
const popular = getMostPopularItems();

const handleClick = (id) => {
    window.location.href = `/detail/${id}`;
}

const itemsByTag = () =>{
    let result = [];
    
    if(itemsChristmas.length>=4){
    for (let i = 1; i < 4; i++){
        let v = itemsChristmas[i];
        result.push(<div className={styles.gri} tabIndex="0" onKeyPress={(e)=>{e.key === 'Enter' && handleClick(v.id)}} onClick={(e)=>{handleClick(v.id)}} key={ulid()}>
            <img className={styles.image} src={v.imageURL} alt={v.title}/>
            <div className={styles.word}>{v.title}</div>
        </div>);
    }
    return result;}
    else{
        itemsChristmas.forEach((v) => {
            result.push(<div className={styles.gri} tabIndex="0" onKeyPress={(e)=>{e.key === 'Enter' && handleClick(v.id)}} onClick={(e)=>{handleClick(v.id)}} key={ulid()}>
                <img className={styles.image} src={v.imageURL} alt={v.title}/>
                <div className={styles.word}>{v.title}</div>
            </div>    )
        })
        return result; 
    }
}

const popularItems = () =>{
    let picks = [];
    

    popular.forEach((v) => {
        picks.push(<div className={styles.gri} tabIndex="0" onKeyPress={(e)=>{e.key === 'Enter' && handleClick(v.id)}} onClick={(e)=>{handleClick(v.id)}} key={ulid()}>
            <img className={styles.image} src={v.imageURL} alt={v.title}/>
            <div className={styles.word}>{v.title}</div>
        </div>    )
    })
    return picks;
}




const Home = () => {

    return (
        <div className={styles.container}>

            <div className={styles.text} tabIndex="0" onKeyPress={(e)=>{e.key === 'Enter' && handleClick(itemsChristmas[0].id)}} onClick={(e)=>{handleClick(itemsChristmas[0].id)}}>
                <img className={styles.pic}src={itemsChristmas[0].imageURL} alt={itemsChristmas[0].title} />
                <div className={styles.txt}>
                    <div className={styles.title}>Must try Duck Recipe for Christmas</div>
                </div>
            </div>
            
            <div className={styles.text}>
                <h1 className={styles.just}>Feastival Special</h1>
                <div className={styles.grid}>
                    {itemsByTag()}
                </div>
            </div>
            
            
            
            
            
            
            
            
            
             <div className={styles.text}>
                <h1 className={styles.just}>Popular Picks</h1>
                <div className={styles.grid}>
                    {popularItems()}
                     
                </div>
            </div> 
              
        </div>
    )
}

export default Home
