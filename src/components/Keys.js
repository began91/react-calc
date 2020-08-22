import React from 'react';
import { useDispatch } from 'react-redux';
import { handleKey } from '../features/calcSlice';
import './keys.css'

const Key = props => {
    const dispatch = useDispatch()
    return (
    <button key={props.value} className={`${props.type}-key`} id={`${props.type}-key-${props.value}`} onClick={() => dispatch(handleKey(props.type, props.value))}>{props.value}</button>
    )
}

const NumKeyPad = () => {
    
    let NumKeys = [];

    for (let i=0; i < 10; i++) {
        NumKeys.unshift(
            <Key type="num" value={i} key={i}/>
        )
        if (i===0) {
            NumKeys.unshift(
            <Key type="decimal" value="." key="." />
            )
        }
    }

    return (
        <div id="num-keys">
            {NumKeys}
        </div>
    )
}

const Keys = () => {
    return (
    <div id="keys">
        <NumKeyPad/>
    </div>
    )
}

export default Keys;