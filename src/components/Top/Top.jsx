import React from "react";
import styles from "../Top/Top.module.css"
import Expense from "../Expense/Expense";
import Balance from "../Balance/Balance";
import Piechart from "../Piechart/Piechart";
const Top = ()=>{
    return(
        <div className={styles.top}>
            {/* <h1 >top</h1> */}
            <div className={styles.child1}>
              
               <Balance/>
               <Expense/>
            </div>
            <div className={styles.child2}>
                <Piechart/>
            </div>
            
        </div> 
    )
}
export default Top;