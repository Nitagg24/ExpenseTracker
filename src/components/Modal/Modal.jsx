import React, { useContext, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../Modal/Modal.module.css";
import Input from "../Input/Input";
import { context } from "../Main/Main";
const Modal = ({ handle, newData, setNewData, itemId = "", headline }) => {
  const {
    allData,
    setAllData,
    setTotalExpense,
    totalExpense,
    balance,
    setBalance,
  } = useContext(context);
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    date: "",
    category: "",
  });
  useEffect(() => {
    document.body.style.scroll = "none";
    return () => {
      //side effects of previous render cleaned before running the side effect for current render
      document.body.style.scroll = "scroll";
    };
  }, []);

  const handleInfo = (e, Id = "") => {
    e.preventDefault();
    console.log(Id);
    const formIps = ["title", "price", "category", "date"];
    let obj = {};
    for (let i = 0; i < formIps.length; i++) {
      obj[formIps[i]] = e.target.elements[formIps[i]].value;
    }
    let arr;
    let newMoney = obj.price;
    let oldMoney = 0;
    if (Id) {
      arr = allData.map((ele) => {
        if (ele.id === Id) {
          console.log(true);
          oldMoney = ele.price;
          return { ...ele, ...obj };
        }
        return ele;
      });
      let modifiedExpense = totalExpense - oldMoney + Number(newMoney);
      let modifiedBalance = balance + Number(oldMoney) - newMoney;
      setTotalExpense(modifiedExpense);
      setBalance(modifiedBalance);
      setAllData([...arr]);
      // console.log(arr);
    } else {
      setNewData({ ...inputs, id: Date.now() });
    }
    handle();
  };
  return createPortal(
    <>
      <div className={styles.modalWrapper} onClick={handle}></div>
      <div className={styles.modalContainer}>
        <h1>{headline}</h1>
        <form className={styles.form} onSubmit={(e) => handleInfo(e, itemId)}>
          <Input
            placeholder="Title"
            inputs={inputs}
            setInputs={setInputs}
            id="title"
            name="title"
          />
          <Input
            placeholder="Price"
            inputs={inputs}
            setInputs={setInputs}
            id="price"
            name="price"
            type="number"
          />

          <select
            className={styles.ipBox}
            id="category"
            value={inputs.category}
            name="category"
            onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
          >
            <option value="">select</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>
          <Input
            type="date"
            inputs={inputs}
            setInputs={setInputs}
            id="date"
            name="date"
            placeholder="dd/mm/yyyy"
          />
          <button className={styles.addBtn} type="submit">
            Add Expense
          </button>
          <button className={styles.cancel} onClick={() => handle()}>
            Cancel
          </button>
        </form>
      </div>
    </>,
    document.querySelector(".portal")
  );
};

export default Modal;
