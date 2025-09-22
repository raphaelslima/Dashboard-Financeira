import { addMonths } from 'date-fns'
import { useState } from 'react'

import DatePickerWithRanger from './DatePickerWithRanger'

const DateSeletor = () => {
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  })
  return <DatePickerWithRanger value={date} onChange={setDate} />
}

export default DateSeletor
