import React from "react";
import styled from 'styled-components/macro';
import { motion } from "framer-motion";
import { getX, getY } from './AnimationRing.helpers'

const RING_COLOR = {
	primary: 'var(--color-primary)',
	secondary: 'var(--color-secondary)',
	tertiary: 'var(--color-tertiary)'
}

const SIZE = {
	big: {
		length: 410,
		cx: 205,
		cy: 205,
		r: 170 - 5.5,
		stroke: 11
	},
	small: {
		length: 270,
		cx: 135,
		cy: 135,
		r: 124,
		stroke: 8
	}
}

const AnimationRing = ({
	color = 'secondary',
	size = 'big',
	animationState,
	// onUpdate,
	onComplete,
	control
}) => {
	const { cx, cy, r, stroke, length } = SIZE[size]
	const xEndPoint = getX(cx, r, 359.99)  // cannot draw full circle with svg arc
	const yEndPoint = getY(cy, r, 359.99)

  return (
    <>
        <Ring
        	xmlns="http://www.w3.org/2000/svg"
        	width={length}
        	height={length}
        	style={{
        		'--opacity': animationState === 'start' ? 0 : 1,
        	}}
        >
          <motion.path
            d={`M${cx} ${cy - r} A ${r} ${r} 0 1 1 ${xEndPoint} ${yEndPoint}`}
            fill="transparent"
            strokeWidth={stroke}
            stroke={RING_COLOR[color]}
            strokeLinecap="round"
            initial={{ pathLength: 1 }}
            animate={control}
            onAnimationComplete={onComplete}
          />
        </Ring>
    </>
  	
  );
}

const Ring = styled.svg`
	opacity: var(--opacity);
`

export default AnimationRing;
