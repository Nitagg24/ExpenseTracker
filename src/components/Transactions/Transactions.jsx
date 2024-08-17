import React, { useContext, useEffect, useId, useState } from "react";
import styles from "../Transactions/Transactions.module.css"
import EachList from "../EachList/EachList";
import { context } from "../Main/Main";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight} from "react-icons/fa6";
const Transactions = ()=>{
    const {allData,setAllData,setTotalExpense,setBalance} = useContext(context);
    const [listId,setListId] = useState('');
    const [currentPage,setCurrentPage] = useState(1)
    const itemsPerPage = 3;
    const totalPages = Math.ceil(allData.length/itemsPerPage);
    const startIdx = (currentPage-1)*itemsPerPage;
    const endIdx = startIdx+itemsPerPage;
    const currentItems = allData.slice(startIdx,endIdx);
    const handleRight = ()=>{
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1)
        }
    }


    const handleLeft = ()=>{
     if(currentPage > 1){
            setCurrentPage(currentPage-1)
        }
    }
    //  let filteredArr = allData.filter((ele)=>{
    //         return ele.id !== listId;
    //  })
    useEffect(()=>{
        let filteredArr = allData.filter(ele=>{
            return ele.id !== listId;
        })
        setAllData([...filteredArr]);

        let foundData = allData.find((ele)=>{
            return ele.id === listId;
        })
        if(foundData){
            setBalance(prev=>prev+Number(foundData.price));
            setTotalExpense(prev=>prev-foundData.price);
        }
    },[listId]);
   
    return(
    
        <div className={styles.transactions}>
            <h2 id={styles.heading}>Recent Expenses</h2>
            <div className={styles.wrap}>
            <div className={styles.expenseList}>
           
             { 
              currentItems.map((ele)=>(
                    <EachList  ele={ele} setListId={setListId} />
                ))
             }
            </div>
            { allData.length > 3?
                <div className={styles.pagination}>
                   <button id={styles.left} onClick={handleLeft}><FaArrowLeft /></button><span id={styles.page}>{currentPage}</span><button id={styles.right} onClick={handleRight}><FaArrowRight /></button>
                </div>:""
            }
            </div>

        </div>
        
        
    )

}
export default Transactions;