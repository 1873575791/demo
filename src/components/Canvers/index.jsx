import { useEffect, useRef, useState } from "react";
import Rectangle from '@/utils/Rectangle';
import Dom from './dom.jsx';

import './index.scss';

export default function Canvers() {
    const canvas = useRef();
    const docClientW = document.documentElement.clientWidth;
    const w = 500, h = 450;
    const [data, setData] = useState([]);

    const draw = () => {
        const ctx = canvas.current.getContext('2d');
        const rect =  new Rectangle('#f00', 0, 0);
        rect.endX = 100;
        rect.endY = 100;
        rect.draw(ctx);
    };

    const handleMouseDown = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        console.log(x, y);
    }

    useEffect(() => {
        draw();
    }, []);
    return <div className="canversBox">
        <input type="color" />
        <canvas onMouseDown={handleMouseDown} className="canvers" ref={canvas}></canvas>
        <Dom />
    </div>
}