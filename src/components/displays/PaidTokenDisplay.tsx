import React, { useCallback } from 'react';
import './PaidTokenDisplay.css';
import { paidToken } from '../../services/tokens';
import { useSpring, animated, config } from 'react-spring';
import { display } from './display';
import { CrossSvg } from '../Icon';
import { TD } from './types';

export const PaidTokenDisplay = ({ word }: TD<paidToken>) => {
    const state = word.value.length;
    const { x } = useSpring({
        from: { x: 1 },
        x: state,
        config: { ...config.stiff, clamp: true },
    });
    const to = useCallback((output: number[]) => ({ range: [1, 4], output }), []);

    return (
        <animated.div
            className="paid-token"
            style={{
                opacity: x.interpolate(to([0.3, 1])),
                borderRadius: x.interpolate(to([0, 32])),
                fontSize: x.interpolate(to([36, 24])),
                paddingTop: x.interpolate(to([0, 14])),
                paddingBottom: x.interpolate(to([0, 14])),
                paddingLeft: x.interpolate(to([0, 19])),
                paddingRight: x.interpolate(to([0, 19])),
            }}
        >
            <>{word.characters.map(display)}</>
            {state === 4 && (
                <span style={{ marginLeft: 15 }}>
                    <CrossSvg />
                </span>
            )}
        </animated.div>
    );
};
