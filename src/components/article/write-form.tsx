"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RichTextEditor from "../ui/rich-text-editor";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(20, "Title must be at least 20 characters long"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters long"),
  html: z.string().min(100, "Content must be at least 100 characters long"),
});

type FormData = z.infer<typeof schema>;

function WriteArticleForm() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      html: "",
    },
  });
  const mutation = api.article.createArticle.useMutation();
  function saveArticle({ title, description, html }: FormData) {
    mutation.mutate(
      { title, description, html },
      {
        onSuccess: ({ slug }) => {
          toast.success("Your article has been successfully published!", {
            richColors: true,
          });
          router.push(`/${slug}`);
        },
        onError: (error) => {
          console.error(error);
          toast.error("An error occured while publishing your article", {
            richColors: true,
          });
        },
      },
    );
  }

  return (
    <Box
      component="form"
      className="w-full space-y-6"
      onSubmit={handleSubmit(saveArticle)}
    >
      <FormControl fullWidth required>
        <TextField
          error={!!errors.title}
          helperText={errors.title?.message}
          id="title"
          type="text"
          placeholder="Your title"
          autoComplete="title"
          autoFocus
          required
          fullWidth
          variant="standard"
          color={!!errors.title ? "error" : "primary"}
          {...register("title")}
        />
      </FormControl>
      <FormControl fullWidth required>
        <TextField
          multiline
          error={!!errors.description}
          helperText={errors.description?.message}
          id="description"
          type="text"
          placeholder="Your description"
          autoComplete="description"
          autoFocus
          required
          fullWidth
          variant="standard"
          color={!!errors.description ? "error" : "primary"}
          {...register("description")}
        />
      </FormControl>
      <RichTextEditor
        name="html"
        control={control}
        defaultValue="Write your content!"
      />
      <Box className="flex justify-end">
        <Button type="submit" variant="contained">
          Publish
        </Button>
      </Box>
    </Box>
  );
}

export default WriteArticleForm;
