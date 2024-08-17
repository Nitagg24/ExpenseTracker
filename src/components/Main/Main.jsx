import React, { createContext, useEffect, useState } from "react";
import styles from "../Main/Main.module.css";
import Top from "../Top/Top";
import Bottom from "../Bottom/Bottom";
import { enqueueSnackbar } from "notistack";

let context = createContext();
export { context };

const Main = () => {
  const [newData, setNewData] = useState({});
  const [allData, setAllData] = useState([]);
  const [balance, setBalance] = useState();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [totalExpense, setTotalExpense] = useState();
  const [categories, setCategories] = useState([]);
  const [catPrice, setCatPrice] = useState([]);
  const [itemId, setItemId] = useState("");

  useEffect(() => {
    if (
      localStorage.hasOwnProperty("balance") &&
      localStorage.hasOwnProperty("expense")
    ) {
      let bal = localStorage.getItem("balance");
      setBalance(Number(bal));
      let expen = Number(localStorage.getItem("expense"));
      setTotalExpense(expen);
    } else {
      localStorage.setItem("balance", 5000);
      setBalance(5000);
      localStorage.setItem("expense", 0);
      setTotalExpense(0);
      localStorage.setItem("expenseList", JSON.stringify([]));
    }

    let getData = JSON.parse(localStorage.getItem("expenseList"));
    if (getData && Array.isArray(getData)) {
      if (getData.length > 0) {
        setAllData(getData);
      }
    } else {
      localStorage.setItem("expenseList", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (!check1) {
      localStorage.setItem("balance", localStorage.getItem("balance"));
      setCheck1(true);
    } else {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  useEffect(() => {
    if (!check2) {
      localStorage.setItem("expense", localStorage.getItem("expense"));
      setCheck2(true);
    } else {
      localStorage.setItem("expense", totalExpense);
    }
  }, [totalExpense]);

  useEffect(() => {
    if (Object.keys(newData).length !== 0) {
      if (balance >= newData.price) {
        if (itemId) {
          let arr = allData.map((ele) => {
            if (ele.id === itemId) {
              return newData;
            } else {
              return ele;
            }
          });
          setAllData(arr);
        } else {
          setAllData([...allData, newData]);
        }
        let allExpense = Number(newData.price) + totalExpense;
        setTotalExpense(allExpense);
        setBalance((prev) => prev - newData.price);
      } else {
        enqueueSnackbar("Insufficient balance", { variant: "Alert" });
      }
    }
  }, [newData]);

  useEffect(() => {
    !check3
      ? setCheck3(true)
      : localStorage.setItem("expenseList", JSON.stringify([...allData]));

    let map1 = new Map();
    let map2 = new Map();
    for (let i = 0; i < allData.length; i++) {
      if (map1.has(allData[i].category)) {
        map1.set(
          allData[i].category,
          Number(map1.get(allData[i].category)) + Number(allData[i].price)
        );
        map2.set(
          allData[i].category,
          Number(map2.get(allData[i].category)) + Number(allData[i].price)
        );
      } else {
        map1.set(allData[i].category, Number(allData[i].price));
        map2.set(allData[i].category, allData[i].price);
      }
    }

    let travelAmt = map1.get("travel") || 0;
    let foodAmt = map1.get("food") || 0;
    let entertainmentAmt = map1.get("entertainment") || 0;

    setCategories([
      { name: "Travel", value: travelAmt },
      { name: "Entertainment", value: entertainmentAmt },
      { name: "Food", value: foodAmt },
    ]);
    let tp = map2.get("travel");
    let fp = map2.get("food");
    let ep = map2.get("entertainment");
    if (tp > 0 || fp > 0 || ep > 0) {
      setCatPrice([
        { name: "Entertainment", amt: ep },
        { name: "Travel", amt: tp },
        { name: "Food", amt: fp },
      ]);
    } else {
      setCatPrice([
        { name: "Entertainment", amt: 0 },
        { name: "Travel", amt: 0 },
        { name: "Food", amt: 0 },
      ]);
    }
  }, [allData]);

  return (
    <context.Provider
      value={{
        setNewData,
        newData,
        allData,
        setAllData,
        balance,
        setBalance,
        totalExpense,
        categories,
        catPrice,
        setItemId,
        totalExpense,
        setTotalExpense,
      }}
    >
      <div className={styles.main}>
        <Top />
        <Bottom />
      </div>
    </context.Provider>
  );
};

export default Main;
