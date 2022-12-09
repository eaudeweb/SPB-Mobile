import * as React from "react"
import Svg, { Path } from "react-native-svg"

function OrangeStrokeSvg(props) {
  return (
    <Svg
      width={120}
      height={14}
      viewBox="0 0 120 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M119.999 1.852c.02.74-.514 2.179-2.155 2.222-21.113.56-33.59 1.549-58.773 3.35C33.84 9.227 21.25 11.44 3.282 13.316a2.97 2.97 0 01-3.266-2.638 2.965 2.965 0 012.647-3.256c18.061-1.886 29.12-2.778 54.38-4.584C82.35 1.029 96.684.56 117.843 0c1.641-.043 2.14 1.267 2.155 1.85z"
        fill="#F15A38"
      />
    </Svg>
  )
}

export default OrangeStrokeSvg
