'use client'

import { createSignature } from '@/actions/signature'
import FormError from '@/components/form-error'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CreateSignatureSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Staff } from '@prisma/client'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type Props = {
  letterSignatureRequestId: string
  staff: Staff[]
}

export default function CreateSignatureForm({
  letterSignatureRequestId,
  staff,
}: Props) {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof CreateSignatureSchema>>({
    resolver: zodResolver(CreateSignatureSchema),
  })

  function onSubmit(values: z.infer<typeof CreateSignatureSchema>) {
    setError('')

    startTransition(() => {
      createSignature(letterSignatureRequestId, values)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>Tambah Penanda Tangan</CardTitle>
        <CardDescription>
          Isi detail untuk menambah penanda tangan baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="staffId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={isPending}>
                          <SelectValue placeholder="Pilih staff" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {staff.map((staffMember) => (
                          <SelectItem
                            key={staffMember.id}
                            value={staffMember.id}
                          >
                            {staffMember.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />

            <Button type="submit" disabled={isPending} className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
