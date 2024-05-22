'use client'

import { updateStaff } from '@/actions/staff'
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
import { Input } from '@/components/ui/input'
import { UpdateStaffSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Staff } from '@prisma/client'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type Props = {
  staff: Staff
}

export default function EditStaffForm({ staff }: Props) {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof UpdateStaffSchema>>({
    resolver: zodResolver(UpdateStaffSchema),
    defaultValues: {
      name: staff.name,
      position: staff.position,
    },
  })

  function onSubmit(values: z.infer<typeof UpdateStaffSchema>) {
    setError('')

    startTransition(() => {
      updateStaff(staff.id, values)
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
        <CardTitle>Edit staff</CardTitle>
        <CardDescription>Isi detail untuk mengubah staff</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="ahmad"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Kepala Jurusan Ilmu Komputer Universitas Lampung"
                        type="text"
                      />
                    </FormControl>
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
