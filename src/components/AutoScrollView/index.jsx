import { useEffect, useState, useMemo, useRef, useCallback } from "react";

import './index.scss';

export default function AutoScrollView() {
    const expendCount = 5; // 多渲染数量
    const screenHeight = 300; // 渲染屏幕高度
    const renderItemHeight = 41.4; // 每条数据的固定高度
    const scrollBoxRef = useRef(null); // 滚动容器
    const WraperRef = useRef(null);
    const [list, setList] = useState(new Array(1000).fill(0).map((_, index) => {
        const n = Math.random(1);
        if (n < 0.2) {
            return `${index} - 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊`
        } else if (n < 0.6) {
            return `${index} - 你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好`
        } else {
            return `${index} - 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈`
        }
    }));
    const [scrollTop, setScrollTop] = useState(0);
    // 开始，结束渲染索引
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(20);
    const [positionCache, setPositionCache] = useState(function () {
        const positList = [];
        list.forEach((_, i) => {
            positList[i] = {
                index: i,
                height: renderItemHeight,
                top: i * renderItemHeight,
                bottom: (i + 1) * renderItemHeight,
            }
        })
        return positList;
    });

    const getStartIndex = (scrollTop) => {
        let idx = bin(
            positionCache,
            scrollTop,
            (currentV, targetV) => {
                const v = currentV.bottom;
                if (v === targetV) return 1;
                if (v < targetV) return 2;
                return 3;
            }
        );
        const targetItem = positionCache[idx];
        if (targetItem.bottom < scrollTop) {
            idx += 1
        }
        return idx;
    };

    const bin = (l, v, fn) => {
        let start = 0, end = l.length - 1, tempIndex = null;
        while (start <= end) {
            tempIndex = Math.floor((start + end) / 2);
            const minIndex = l[tempIndex];
            const compres = fn(minIndex, v);
            if (compres === 1) {
                return tempIndex;
            } else if (compres === 2) {
                start = tempIndex + 1
            } else if (compres === 3 ) {
                end = tempIndex - 1
            }
        }
        return tempIndex;
    }

    const limit = useMemo(function () {
        let sum = 0
        let i = 0
        for (; i < positionCache.length; i++) {
          sum += positionCache[i].height;
          if (sum >= 350) {
            break
          }
        }
        return i;
      }, [positionCache]);


    const getTransform = useCallback(function () {
        return `translateY(${startIndex >= 1 ? positionCache[startIndex - 1].bottom : 0}px)`
    }, [startIndex]);

    const wraperHeight = useMemo(function () {
        let len = positionCache.length;
        if (len !== 0) {
            return positionCache[len - 1].bottom
        }
        return list.length * renderItemHeight;
    }, [list, positionCache, renderItemHeight]);

    // 渲染列表
    const renderList = useMemo(
        () => list.slice(startIndex, endIndex),
        [startIndex, endIndex]
    );

    const positionData = () => {
        const nodeList = WraperRef.current.childNodes;
        const positList = [...positionCache]
        let needUpdate = false;
        nodeList.forEach((node, i) => {
            let newHeight = node.getBoundingClientRect().height;
            const nodeID = Number(node.id.split("-")[1]);
            const oldHeight = positionCache[nodeID]?.height;
            const dValue = oldHeight - newHeight;
            if (dValue) {
                needUpdate = true;
                positList[nodeID].height = node.getBoundingClientRect().height;
                positList[nodeID].bottom = nodeID > 0 ? (positList[nodeID - 1].bottom + positList[nodeID].height) : positList[nodeID].height;
                positList[nodeID].top = nodeID > 0 ? positList[nodeID - 1].bottom : 0;
                for (let j = nodeID + 1, len = positList.length; j < len; j++) {
                    positList[j].top = positList[j - 1].bottom;
                    positList[j].bottom += dValue;
                }
            }

        })
        if (needUpdate) {
            setPositionCache(positList)
          }
    };


    useEffect(() => {
        positionData();
    }, []);

    const handleSrcoll = () => {
        const scrollDistance = scrollBoxRef.current.scrollTop;
        const startIndexNO = getStartIndex(scrollDistance);
        const endIndexNew = startIndex + limit + expendCount;
        console.log(startIndexNO, endIndexNew);
        setStartIndex(startIndexNO);
        setEndIndex(endIndexNew);
        positionData();
    }
    return <div>
        <div className="vListContainer" ref={scrollBoxRef} onScroll={handleSrcoll}>
            <div className="vListBox" style={{ height: wraperHeight + "px", position: 'relative' }}>
                <div className="vListItem" ref={WraperRef} style={{ transform: getTransform(), position: 'absolute', top: 0 }}>
                    {
                        renderList.map((it, i) => {
                            return <div
                                className="scroll-item"
                                id={`item-${i}`}
                                key={i}
                            >
                                <span>{it}</span>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
};