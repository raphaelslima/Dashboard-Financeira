import { zodResolver } from '@hookform/resolvers/zod'
import {
  PiggyBank,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

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

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O campo é obrigatório.',
  }),
  amount: z.number({
    required_error: 'O campo é obrigatório',
  }),
  date: z.date({
    required_error: 'O campo é obrigatório',
  }),
  type: z.enum(['EARNING', 'INVESTMENT', 'EXPENSE'], {
    message: 'O campo é obrigatório',
  }),
})

const AddTransactionBtn = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })

  function onSubmit(data) {
    console.log(data)
  }
  return (
    <>
      <Dialog>
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
                  <Button type="reset" variant="secondary" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full">
                  Adcionar
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
