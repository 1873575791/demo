import React, { useRef, useState } from 'react';
import { useDrop, useDrag } from 'ahooks';
import Drap from './Drap';
import Drop from './Drop';

export default function AHooksDropAndDrap() {
    const [list, setList] = useState([{ value: 1 }]);
    const [dropL, setDropL] = useState([]);

    // 拖拽结束
    const onDragEnd = (data) => {
        setDropL([...dropL, data]);
    }
    return <div>
        {
            list.map((it) => <Drap key={it.value} data={it} />)
        }
        <Drop onDragEnd={onDragEnd} data={dropL} />
    </div>
};