import React, { useContext, useState } from "react";
import styles from "../Balance/Balance.module.css"
import Modal1 from "../Modal/Modal1";
import { context } from "../Main/Main";
const Balance = ()=>{
   const [state,setState] = useState(false);
   const {balance,setBalance,totalExpense} = useContext(context);
   const handle = ()=>{
    setState(prev=>!prev)
   }
    return(
        <div className={styles.balance}>
          <p className={styles.showtxt}>Wallet Balance:<span id={styles.showrate}> &#x20B9;{balance}</span></p>
          <button className={styles.incomeBtn} onClick={()=>handle()}>+Add Income</button>
          {state && <Modal1 handle={handle} balance={balance} setBalance={setBalance} totalExpense={totalExpense}/>}
        </div>
    )

}
export default Balance;