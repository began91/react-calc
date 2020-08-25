import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleKey } from '../features/calcSlice';
import './Keys.css'

const Key = props => {
    const dispatch = useDispatch()
    return (
    <button key={props.value} className={`${props.type}-key ${ + props.isActive ? '  activeOperator' : ''}`} id={`${props.type}-key-${props.value}`} onClick={() => dispatch(handleKey([props.type, props.value]))}>{props.value}</button>
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
            NumKeys.unshift(
                <Key type="equal" value="=" key="=" />
            )
        }
    }
    return (
        <div id="num-keys">
            {NumKeys}
        </div>
    )
}

const operators = ['+','-','*','/'];

const Operators = props => {
    const activeOperator = useSelector(state => state.calc.secondOperator || state.calc.firstOperator);
    return (
        <div id="operator-keys">
            {operators.map(operator => {
                const isActive = activeOperator === operator;
                return (<Key type="operator" value={operator} key={operator} isActive={isActive}/>)
            })}
        </div>
    )
}

const ClearKeys = props => {
    return (
        <div id="clear-keys">
            <Key type="clear" value="C" key="C" />
            <Key type="clear" value="CE" key="CE" />
            <Key type="neg" value={"\u00B1"} key="neg" />
        </div>
    );
}

const Keys = () => {
    const dispatch = useDispatch()
    document.addEventListener('keydown', e => {
        let type, key;
        if (Number.isInteger(Number(e.key))) {
            type='num';
            key=e.key;
        } else if (e.key.match(/\./)) {
            type='decimal';
            key='.';
        } else if (e.key.match(/[+*/-]/)) {
            type='operator';
            key=e.key;
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            type='clear';
            key='CE';
        } else if (e.key === 'Escape') {
            type='clear';
            key='C';
        } else if (e.key === 'Enter' || e.key === '=') {
            type='equal';
            key='=';
        } else if (e.key === 'm') {
            type='neg'
            key="\u00B1"
        }
        if (type && key) {
            e.preventDefault();
        }
        // console.log(type, key)
        dispatch(handleKey([type, key]));
    })
    return (
    <div id="keys">
        <NumKeyPad />
        <Operators />
        <ClearKeys />
    </div>
    )
}

export default Keys;