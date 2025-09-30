import { addMonths } from 'date-fns'
import {
  Loader2,
  PiggyBank,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

import { useCreateTransaction } from '@/api/hooks/transaction'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCreateTransactionForm } from '@/forms/hooks/transaction'

import NumericInput from './NumericInput'
import { Button } from './ui/button'
import DatePicker from './ui/datePicker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const AddTransactionBtn = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const [ísDialoogOpen, setIsDialogOpen] = useState(false)

  const { mutateAsync, isPending } = useCreateTransaction(
    from ? from : new Date(),
    to ? to : addMonths(new Date(), 1)
  )
  const form = useCreateTransactionForm()

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data, {
        onSuccess: () => {
          setIsDialogOpen(false)
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Dialog open={ísDialoogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            {' '}
            <PlusIcon /> Nova Transação
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o valor da transação"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor:</FormLabel>
                    <FormControl>
                      <NumericInput
                        {...field}
                        placeholder="R$ 0,00"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        allowNegative={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data:</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo:</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          variant={
                            field.value === 'EARNING' ? 'secondary' : 'outline'
                          }
                          type="button"
                          onClick={() => field.onChange('EARNING')}
                        >
                          <TrendingUpIcon className="text-primary-green" />
                          Ganho
                        </Button>
                        <Button
                          variant={
                            field.value === 'EXPENSE' ? 'secondary' : 'outline'
                          }
                          type="button"
                          onClick={() => field.onChange('EXPENSE')}
                        >
                          <TrendingDownIcon className="text-primary-red" />
                          Gasto
                        </Button>
                        <Button
                          variant={
                            field.value === 'INVESTMENT'
                              ? 'secondary'
                              : 'outline'
                          }
                          type="button"
                          onClick={() => field.onChange('INVESTMENT')}
                        >
                          <PiggyBank className="text-primary-blue" />
                          Investimento
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className={'sm:space-x-4'}>
                <DialogClose asChild>
                  <Button
                    type="reset"
                    variant="secondary"
                    className="w-full"
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Adicionar'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddTransactionBtn
