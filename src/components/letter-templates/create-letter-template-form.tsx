'use client'

import { createLetterTemplate } from '@/actions/letter-template'
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
import { CreateLetterTemplateSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function CreateLetterTemplateForm() {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof CreateLetterTemplateSchema>>({
    resolver: zodResolver(CreateLetterTemplateSchema),
    defaultValues: {
      title: '',
    },
  })

  function onSubmit(values: z.infer<typeof CreateLetterTemplateSchema>) {
    setError('')

    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('file', values.file[0])

    startTransition(() => {
      createLetterTemplate(formData)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  const fileRef = form.register('file')

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>Tambah template surat</CardTitle>
        <CardDescription>
          Isi detail untuk menambah template surat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Judul surat"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="file"
                          placeholder="letter"
                          {...fileRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
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
