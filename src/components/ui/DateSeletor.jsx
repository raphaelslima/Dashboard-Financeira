import { addMonths, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import DatePickerWithRanger from './DatePickerWithRanger'

const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd')
}

const DateSeletor = () => {
  const navigate = useNavigate()
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  })

  useEffect(() => {
    if (!date.from && !date.to) return

    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDate(date.from))
    queryParams.set('to', formatDate(date.to))

    navigate(`/?${queryParams.toString()}`)
  }, [navigate, date])

  return <DatePickerWithRanger value={date} onChange={setDate} />
}

export default DateSeletor
