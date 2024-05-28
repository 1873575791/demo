import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';

const Dom = (props, ref) => {

    const [list, setList] = useState([1, 2, 3, 4]);

    useImperativeHandle(ref,() => ({
        setData: () => list
    }));
    const handleClick = useCallback(() => {
        console.log(123);
        setList([])
    })

    const FSet = () => {
        const set = new Set([1, 1, 2, 3, 3, 4, 2,25]);
        console.log(set);
        setList([...set]);
    }

    const onClick = () => {
        handleClick();
    }

    useEffect(() => {
        FSet();
    },[])

    return <div>
        <button onClick={onClick}>123</button>
    </div>
};

export default React.forwardRef(Dom);