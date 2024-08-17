import React, { useContext, useState } from "react";
import styles from "../EachList/EachList.module.css";
import { PiPizza } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { LiaGiftsSolid } from "react-icons/lia";
import { MdOutlineTravelExplore } from "react-icons/md";
import Modal from "../Modal/Modal";
import { context } from "../Main/Main";
const EachList = ({ele,setListId,setAllData})=>{
    const {setItemId} = useContext(context);
    const [state,setState] = useState(false);
    
    // const [icon,setIcon] = useState('')
    let icon;
    if(ele.category === 'travel'){
       icon=<MdOutlineTravelExplore size={30} />
    }else if(ele.category === 'food'){
        icon=<PiPizza size={30}/>
    }else{
        icon = <LiaGiftsSolid size={30}/>
    }
    const handle = (id)=>{
        if(!state){
            setItemId(id)
        }
        setState(prev=>!prev);
    }
    
    const handleDelete = (id)=>{
        setListId(id);
    }
    return(
        <>
        <div className={styles.childContainer} id={ele.id}>
            <div className={styles.child1}>
                <div className={styles.icon}>
                    {icon}  
                </div>
                <div className={styles.info}>
                    <span>{ele.title}</span>
                    <span style={{color:"#9B9B9B"}}>{ele.date}</span>
                </div>
            </div>
            <div className={styles.child2}>
                <div className={styles.spent}>
                &#x20B9;{ele.price}
                </div>
                <div className={styles.edit} onClick={()=>handle(ele.id)}>
                    <FiEdit2 size={35} style={{color:"whitesmoke"}}/>
                </div>
                <div className={styles.delete} onClick={()=>handleDelete(ele.id)}> 
                   <TiDelete size={35} style={{color:"whitesmoke"}} />
                </div>
            </div>
        </div>
        <hr />
        {state&&<Modal handle={handle} itemId={ele.id} headline="Edit Expenses" />}
        </>
    )
}
export default EachList;