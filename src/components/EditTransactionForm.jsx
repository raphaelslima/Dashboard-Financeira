import {
  ExternalLinkIcon,
  Loader2Icon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'

import { useEditTransactionForm } from '@/forms/hooks/transaction'

import NumericInput from './NumericInput'
import { Button } from './ui/button'
import DatePicker from './ui/DatePicker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const EditTransactionForm = ({ transaction }) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const { form, onSubmit } = useEditTransactionForm({ transaction })
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="invisible">
          <SheetTitle>Editar Transação</SheetTitle>
        </SheetHeader>
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
                      value={field.value ?? ''}
                      onValueChange={(values) => field.onChange(values.value)}
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
                          field.value === 'INVESTMENT' ? 'secondary' : 'outline'
                        }
                        type="button"
                        onClick={() => field.onChange('INVESTMENT')}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        Investimento
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className={'sm:space-x-4'}>
              <SheetClose asChild>
                <Button
                  type="reset"
                  variant="secondary"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                onClick={() => setSheetIsOpen(false)}
              >
                {form.formState.isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  'Editar'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionForm
