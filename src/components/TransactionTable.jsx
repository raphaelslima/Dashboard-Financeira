import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useSearchParams } from 'react-router'

import { useGetAllTransactions } from '@/api/hooks/transaction'
import { formatToMoneyBR } from '@/helpers/amount'

import TransactionTypeIcon from './transactionTypeIcon'
import { DataTable } from './ui/dataTable'

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeIcon variant={transaction.type.toLowerCase()} />
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) =>
      formatToMoneyBR(transaction.amount),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
]

const TransactionTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetAllTransactions({ from, to })
  if (!transactions) return null
  return <DataTable columns={columns} data={transactions} />
}

export default TransactionTable
