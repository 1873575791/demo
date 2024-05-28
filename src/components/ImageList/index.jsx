import { useState, useRef, useEffect } from 'react'
import { Tabs, Swiper } from 'antd-mobile'

import Dom from './Dom'

import './index.scss'

export default function ImageList() {
  const swiper = useRef(null);
  const dom = useRef(null);
  const data = [
    {
      name: 'Espresso',
      colors: ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac', '#c6c5f6', '#fbcfe8', '#e9bcff']
    },
    {
      name: 'Coffee Latte',
      colors: ['#ffcfac', '#c6c5f6', '#fbcfe8']
    },
    {
      name: 'Cappuccino',
      colors: ['#e4fabd', '#ffcfac']
    },
    {
      name: 'Americano',
      colors: ['#bcffbd']
    },
    {
      name: 'Flat White',
      colors: ['#ffcfac', '#c6c5f6', '#fbcfe8', '#e9bcff', '#ace0ff', '#bcffbd']
    },
    {
      name: 'Caramel Macchiato',
      colors: ['#c6c5f6', '#fbcfe8', '#e9bcff', '#ace0ff', '#bcffbd']
    },
    {
      name: 'Cafe Mocha',
      colors: ['#fbcfe8', '#e9bcff', '#e4fabd', '#ffcfac', '#c6c5f6']
    }
  ]
  const [index, setIndex] = useState(0);
  const [swiperData, setSwiperData] = useState([]);

  const items = swiperData.map((it) => (
    <Swiper.Item key={it.key}>
      <div
        className="content"
        style={{ background: it.color }}
      >
        {it.title}
      </div>
    </Swiper.Item>
  ));

  const onChange = (key) => {
    if (key === index) {
      return;
    }
    setIndex(key);
    let n = 0;
    for(let i = key - 1; i >= 0; i--) {
      n += data[i].colors.length;
    }
    swiper.current.swipeTo(n);
  }

  const onIndexChange = (index) => {
    const { key } = swiperData[index];
    setIndex(key);
  }

  useEffect(() => {
   const l = [];
   data.forEach((item, index) => {
     item.colors.forEach((sub, i) => {
       l.push({
        key: index + '',
        color: sub,
        title: item.name + '[' + (i + 1)  + ']' + ' - ' + sub
       });
     })
   })
   setSwiperData(l);
  }, [])

  return (
    <div className='image-list'>
      <Tabs activeKey={index} onChange={onChange}>
        {
          data.map((it, index) => (
            <Tabs.Tab title={`${it.name} - ${it.colors.length}`} key={index} />
          ))
        }
      </Tabs>
      <Swiper ref={swiper} indicator={() => null} onIndexChange={onIndexChange}>{items}</Swiper>
      <Dom ref={dom} />
    </div>
  )
};