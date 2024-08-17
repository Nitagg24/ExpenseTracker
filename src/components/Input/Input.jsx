import React from "react";
import styles from "../Input/Input.module.css"
const Input = ({placeholder,type="text",inputs,setInputs,id,name})=>{
    return <input id={id} className={styles.ip} name={name} type={type} value={inputs[name]} onChange={(e)=>{
        let data = {...inputs};
        data[name] = e.target.value;
        setInputs(data)}}
        
       placeholder={placeholder}/>

}
export default Input;