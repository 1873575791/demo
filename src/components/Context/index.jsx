import { useState, useContext, memo } from 'react';
import { ContextN } from '@/contexts/index.js';
import SvgIcon from '@/icon/icon.jsx';

export default function Context() {
    const [num, setNum] = useState(0);
    const [num2, setNum2] = useState(0);

    const add = () => {
        setNum(num + 1);
    }

    const sub = () => {
        setNum(num - 1)
    }
    return <div>
        <ContextN.Provider value={num}>
            <Test />
        </ContextN.Provider>
        <Test2 num={num} />
        <div>{num2}</div>
        <button onClick={() => setNum2(num2 + 1)}>num2+</button>
        <button onClick={add}>+</button>
        <button onClick={sub}>-</button>
        <SvgIcon />
    </div>
}

const Test = () => {
    const num = useContext(ContextN);
    return <div>{num}</div>
}

const Test2 = memo((props) => {
    console.log(props)
    return <div>{props.num}
    </div>
})