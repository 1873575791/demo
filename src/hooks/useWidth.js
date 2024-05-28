import { useEffect, useState } from "react";

export function useWindowWidth() {
    const [ width, setWidth] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
        return () => {
            window.removeEventListener('resize', () => {
                setWidth(window.innerWidth);
            });
        }
    }, []);

    return { width };
}