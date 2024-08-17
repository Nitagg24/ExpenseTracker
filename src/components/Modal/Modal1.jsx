import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSnackbar } from "notistack"
import styles from "../Modal/Modal1.module.css";
import Input from "../Input/Input";

const Modal1 = ({handle,setBalance,totalExpense})=>{
    let [ipBalance,setIpBalance] = useState('');
    const {enqueueSnackbar} = useSnackbar();
    
    useEffect(()=>{
        document.body.style.scrollY = "none";
        return ()=>{                                   //side effects of previous render cleaned before running the side effect for current render
            document.body.style.scrollY = "scroll";
        }
    },[]);



    const addIncome = (e)=>{
        e.preventDefault();
        let income = Number(e.target.elements["balance"].value);
        // console.log(typeof income);
        if(income>0 && income > totalExpense){
            setBalance(income); 
        }else if(income < totalExpense){
            enqueueSnackbar("Wallet balance is less than expense",{varient:"Alert"})
        }else{
            enqueueSnackbar("Please enter valid amount (+ve value)",{varient:"Alert"})
        }
        handle()   
    }

    return createPortal(
        <>
        <div className={styles.modalWrapper} onClick={handle}></div>
            <div className={styles.modalContainer}>
                <h1>Add Balance</h1>
                <form className={styles.form} onSubmit={(e)=>addIncome(e)}>
                <input className={styles.ip} type="number" name="balance" id="balance" value={ipBalance} onChange={(e)=>setIpBalance(e.target.value)} placeholder="Add balance"/>
                  <div className={styles.btns}>
                    <button className={styles.addBtn} type="submit">Add Balance</button> 
                    <button className={styles.cancel} onClick={()=>handle()}>Cancel</button>
                 </div>
                </form>  
            </div></>
       ,document.querySelector(".portal")
    )

}

export default Modal1;