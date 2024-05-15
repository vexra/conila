'use client'

import { createLetterSignatureRequest } from '@/actions/letter-signature-request'
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
import { CreateLetterSignatureRequestSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function CreateLetterSignatureRequestForm() {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof CreateLetterSignatureRequestSchema>>({
    resolver: zodResolver(CreateLetterSignatureRequestSchema),
    defaultValues: {
      subject: '',
    },
  })

  function onSubmit(
    values: z.infer<typeof CreateLetterSignatureRequestSchema>,
  ) {
    setError('')

    const formData = new FormData()
    formData.append('subject', values.subject)
    formData.append('file', values.file[0])

    startTransition(() => {
      createLetterSignatureRequest(formData)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }
        })
        .catch((e) => console.error(e))
    })
  }

  const fileRef = form.register('file')

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>Upload surat</CardTitle>
        <CardDescription>Isi detail untuk membuat tanda tangan</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Subject"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
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
