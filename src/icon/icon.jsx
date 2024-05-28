import { useEffect } from 'react'
import './index.scss'

export default function SvgIcon() {

    useEffect(() => {
        const p = document.querySelectorAll('.p');
        console.log(p)
        p.forEach(item => {
            const l = item.getTotalLength();
            console.log(l)
            item.style.setProperty('--l', l)
        })
    }, []);
    return <div>
       <svg className="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="583">
        <path className="p" d="M940.78474 245.426689 528.95516 7.656377c-10.618848-6.130627-23.700795-6.130627-34.31862 0L82.805938 245.426689c-10.617825 6.130627-17.159822 17.460674-17.159822 29.720905l0 475.5396c0 12.261255 6.540973 23.590278 17.159822 29.720905l411.82958 237.770312c10.618848 6.130627 23.700795 6.130627 34.31862 0l411.82958-237.770312c10.618848-6.130627 17.159822-17.460674 17.159822-29.720905L957.943538 275.147594C957.944562 262.887362 951.402565 251.557316 940.78474 245.426689zM923.624918 750.688217l-411.82958 237.770312-411.82958-237.770312L99.965759 275.147594l411.82958-237.770312 411.82958 237.770312L923.624918 750.688217z" fill='none'></path>
        <path className="p" d="M231.020584 378.531196c-4.326539 8.432043-0.997724 18.774599 7.43432 23.100114l255.628028 131.158179-0.058328 275.060613c-0.002047 9.476839 7.67889 17.160845 17.155728 17.162892 9.476839 0.002047 17.160845-7.67889 17.162892-17.155728l0.057305-273.825482 240.929258-135.048789c8.267291-4.63353 11.212366-15.09172 6.577812-23.359011-4.63353-8.267291-15.09172-11.212366-23.359011-6.577812l-239.392252 135.060045L254.121721 371.0979C245.689678 366.771361 235.347123 370.100176 231.020584 378.531196z" fill='none'></path>
        {/* <line className="p" x1="0" y1="50%" x2="100%" y2="50%" stroke="red"></line> */}
        </svg>
    </div>
}