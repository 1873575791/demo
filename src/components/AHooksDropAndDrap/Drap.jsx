import React, { useRef } from 'react';
import { useDrag } from 'ahooks';

export default function Drap({ data }) {
    const dragRef = useRef(null);
    useDrag(data, dragRef, {
        onDragStart: () => {
            console.log('123');
        },
        onDragEnd: () => {
            console.log('456');
        },
    });
    return <div>
        <div ref={dragRef}
            style={{
                border: '1px solid #e8e8e8',
                padding: 16,
                width: 80,
                textAlign: 'center',
                marginRight: 16,
            }}>拖拽原{data.value}</div>
    </div>
}