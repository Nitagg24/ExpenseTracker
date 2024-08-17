import React, { useContext, useState } from "react";
import styles from "../Expense/Expense.module.css"
import Modal from "../Modal/Modal";
import { context } from "../Main/Main";

const Expense = ()=>{
   const [state,setState] = useState(false);
   const {newData,setNewData,totalExpense} = useContext(context);
   const handle = ()=>{
    setState(prev=>!prev);
   }
    return(
        <div className={styles.expense}>
          <p className={styles.showtxt}>Expense:<span id={styles.showrate}>&#x20B9;{totalExpense}</span></p>
          <button className={styles.expenseBtn} onClick={()=>handle()}>+ Add expense</button>
          {state&&<Modal handle={handle} newData={newData} setNewData={setNewData} headline="Add Expenses"/>}
        </div>
    )

}

export default Expense;