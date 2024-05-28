import React, { useRef, useState } from 'react';
import { useDrop, useDrag } from 'ahooks';
import Drap from './Drap';

export default function Drop({ onDragEnd, data }) {
    const dropRef = useRef(null);
    const [fileD, setFileD] = useState(null);
    useDrop(dropRef, {
        onDragEnter: (e) => {
            console.log('拖拽进入', e);
        },
        onDragOver: () => {
            console.log('拖拽中');
        },
        onDom: (d, e) => {
            onDragEnd(d);
        },
        onFiles: (f, e) => {
            console.log('拖拽文件', f);
        }
    });

    const fileClick = (e) => {
        console.log(123, e.files);
        // let input = document.createElement('input');
        // input.type = 'file';
        // input.click();
        // input.onchange = () => {
        //     let file = input.files[0];
        //     setFileD(file);
        //     console.log(file);
        // }
    }

    return <div>
        <div ref={dropRef}
        // onClick={fileClick}
            style={{
                border: '1px solid #e8e8e8',
                padding: 16,
                width: 80,
                textAlign: 'center',
                marginRight: 16,
            }}>
                <input type="file" style={{ display: 'none' }} onChange={fileClick} />
            {
                data.map((it) => <Drap key={it.value} data={it} />)
            }
        </div>
    </div>
}