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
		length: 366,
		cx: 183,
		cy: 183,
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
	// const control = useAnimation()
	// const [animationState, setAnimationState] = useState('start')
	// const [key, setKey] = useState(0)
	// const progress = useRef(0)
	const { cx, cy, r, stroke, length } = SIZE[size]
	const xEndPoint = getX(cx, r, 359.99)  // cannot draw full circle with svg arc
	const yEndPoint = getY(cy, r, 359.99)

	// const handleAnimationState = () => {
	// 	if(animationState === 'start') {
	// 		setAnimationState('playing')
	// 		control.set({
	// 			pathLength: 0
	// 		})
	// 		control.start({
	//       pathLength: 1,
	//       transition: { duration: time * (1 - progress.current), ease: "linear" },
	//     })
	// 	}
	// 	else if(animationState === 'playing') {
	// 		setAnimationState('pausing')
	// 		control.stop()
	// 	}
	// 	else if(animationState === 'pausing') {
	// 		setAnimationState('playing')
	// 		control.start({
	//       pathLength: 1,
	//       transition: { duration: time * (1 - progress.current), ease: "linear" },
	//     })			
	// 	}
	// 	else if(animationState === 'end') {
	// 		setAnimationState('playing')
	// 		control.set({
	// 			pathLength: 0
	// 		})
	// 		control.start({
	//       pathLength: 1,
	//       transition: { duration: time * (1 - progress.current), ease: "linear" },
	//     })
	// 	}
	// }

	// const onUpdate = ({ pathLength }) => {
	// 	progress.current = pathLength
	// }

	// const onComplete = () => {
	// 	// setAnimationState('end')
	// 	// setKey(key + 1)
	// 	progress.current = 0
	// }

  return (
    <>
      <Wrapper>
        <Ring
        	style={{
        		'--opacity': animationState === 'start' ? 0 : 1,
        		'border': '1px solid red'
        	}}
        	xmlns="http://www.w3.org/2000/svg"
        	width={length}
        	height={length}
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
      </Wrapper>
    </>
  	
  );
}

const Wrapper = styled.div`
	// border: 1px solid white;
	pointer-events: none;
`

const Ring = styled.svg`
	display: block;
	opacity: var(--opacity);
`

export default AnimationRing;
