import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/auth'

import DatePickerWithRanger from './DatePickerWithRanger'

const formatDate = (date) => format(date, 'yyyy-MM-dd')

const getInitialDateState = (searchParams) => {
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const defaultDates = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }

  if (!from || !to) return defaultDates

  const dateAreInvalid = !isValid(new Date(from)) || !isValid(new Date(from))
  if (dateAreInvalid) return defaultDates

  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  }
}

const DateSeletor = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [date, setDate] = useState(getInitialDateState(searchParams))

  useEffect(() => {
    if (!date.from || !date.to) return

    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDate(date.from))
    queryParams.set('to', formatDate(date.to))

    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      queryKey: [
        'balance',
        user.id,
        formatDate(date.from),
        formatDate(date.to),
      ],
    })
  }, [navigate, date, user, queryClient])

  return <DatePickerWithRanger value={date} onChange={setDate} />
}

export default DateSeletor
