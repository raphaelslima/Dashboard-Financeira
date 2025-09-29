// components/NumericInput.jsx
import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'

import { Input } from './ui/input'

const NumericInput = forwardRef(({ onChange, ...props }, ref) => {
  return (
    <NumericFormat
      {...props}
      getInputRef={ref}
      customInput={Input}
      onValueChange={(values) => {
        onChange(values.floatValue)
      }}
    />
  )
})

NumericInput.displayName = 'NumericInput'

export default NumericInput
