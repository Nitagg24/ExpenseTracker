import React from "react";
import styles from "../Bottom/Bottom.module.css"
import Topexpenses from "../Topexpenses/Topexpenses";
import Transactions from "../Transactions/Transactions";

const Bottom = ()=>{
    return(
        <div className={styles.bottom}>
            <Transactions/>
            <Topexpenses/>
        </div>
    )
}
export default Bottom;