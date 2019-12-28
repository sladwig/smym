import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

interface IProps {}

const percent = (value: number) => (value * 100) / window.innerWidth;

export const MovingEye = ({}: IProps) => {
    const logoRef = useRef<HTMLDivElement>(((<div></div>) as unknown) as HTMLDivElement);
    const [{ x, y }, set] = useSpring(() => ({
        x: 100,
        y: 50,
    }));

    // cx="21.5" cy="19.5"
    const cx = x.interpolate({
        range: [0, percent(logoRef.current.offsetLeft || 50), 100],
        // output: [16.5, 19, 21.5],
        output: [17.5, 19, 20.5],
    });
    const cy = y.interpolate({
        range: [0, percent(logoRef.current.offsetTop || 50), 100],
        // output: [18.5, 19.5, 21.5],
        output: [19, 19.5, 21],
    });

    useEffect(() => {
        const handeMouseMove = ({ clientX: x, clientY: y }: MouseEvent) => {
            set({ x: percent(x), y: percent(y) });
        };
        document.addEventListener('mousemove', handeMouseMove);
        return () => document.removeEventListener('mousemove', handeMouseMove);
    }, []);
    return (
        <div className="logo" ref={logoRef}>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38">
                <g fill="none" fill-rule="evenodd">
                    <circle cx="19" cy="19" r="19" fill="#262F5E" />
                    <path
                        fill="#FFF"
                        d="M19,26 C23.418278,26 27.418278,23.8333333 31,19.5 C27.418278,15.1666667 23.418278,13 19,13 C14.581722,13 10.581722,15.1666667 7,19.5 C10.581722,23.8333333 14.581722,26 19,26 Z"
                    />
                    <animated.circle cx={cx} cy={cy} r="4.5" fill="#262F5E" />
                </g>
            </svg>
        </div>
    );
};
