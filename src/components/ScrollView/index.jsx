import { useEffect, useRef, useState, useMemo } from "react";

import './index.scss';

export default function ScrollView() {
    const expendCount = 5; // 多渲染数量
    const screenHeight = 300; // 渲染屏幕高度
    const renderItemHeight = 41.4; // 每条数据的固定高度
    const scrollBoxRef = useRef(null); // 滚动容器
    const [list, setList] = useState(new Array(1000).fill(0).map((_, index) => index));
    // 开始，结束渲染索引
    const [endIndex, setEndIndex] = useState(screenHeight / renderItemHeight + expendCount);
    const [startIndex, setStartIndex] = useState(0);
    // 渲染列表
    const renderList = useMemo(
        () => list.slice(startIndex, endIndex),
        [startIndex, endIndex]
    );

    // 滚动监听
    const virtualBoxScroll = () => {
        // 滑动距离
        const scrollDistance = scrollBoxRef.current.scrollTop;
        // 计算新索引
        const startIndexNO = Math.floor(scrollDistance / renderItemHeight)
        const startIndexNew = Math.max(startIndexNO - expendCount, 0);
        const endIndexNew = startIndexNO + Math.ceil(screenHeight / renderItemHeight) + expendCount; // 多渲染5条
        setStartIndex(startIndexNew);
        setEndIndex(endIndexNew);
    };
    return <div className='scroll-view'  ref={scrollBoxRef} onScroll={virtualBoxScroll}>
        <div className="box" style={{ height: `${list.length * renderItemHeight}px` }}>
            <div
                className="render-box"
                style={{
                    transform: `translateY(${startIndex * renderItemHeight}px)`,
                    // top: `${startIndex * renderItemHeight}px`,
                }}
            >
                {renderList?.map((item) => (
                    <div
                        className="scroll-item"
                        style={{ height: `${renderItemHeight}px` }}
                        key={item}
                    >
                        <span></span>
                        item：{item}
                    </div>
                ))}
            </div>
        </div>
    </div>
}