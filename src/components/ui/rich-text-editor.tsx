"use client";
import { Controller } from "react-hook-form";
import type { Control, Path, FieldValues } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuButtonEditLink,
  MenuButtonCode,
  RichTextEditorProvider,
  RichTextField,
} from "mui-tiptap";
import { useState } from "react";

export default function RichTextEditor<T extends FieldValues>({
  name,
  control,
  defaultValue,
}: {
  name: string;
  control: Control<T, object>;
  defaultValue?: string;
}) {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Editor
          value={value}
          onChange={onChange}
          defaultValue={defaultValue ?? ""}
        />
      )}
    />
  );
}

function Editor({
  value,
  defaultValue,
  error,
  onChange,
}: {
  value: string;
  defaultValue: string;
  error?: { message: string };
  onChange: (...event: unknown[]) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl",
      },
    },
    content: value||defaultValue,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <>
      <RichTextEditorProvider editor={editor}>
        <RichTextField
          controls={
            <MenuControlsContainer>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
              <MenuButtonEditLink />
              <MenuButtonCode />
            </MenuControlsContainer>
          }
        />
      </RichTextEditorProvider>

      {error && (
        <p style={{ color: "red", marginTop: "4px", fontSize: "0.75rem" }}>
          {error.message}
        </p>
      )}
    </>
  );
}
