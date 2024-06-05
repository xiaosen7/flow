"use client";

import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps, IControllableComponentProps } from "@/types";
import { EThemeMode, useTheme } from "@modules/theme";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";

export interface IExplanationEditorProps
  extends IComponentBaseProps,
    IControllableComponentProps<string> {
  onBlur: () => void;
}

export const ExplanationEditor: React.FC<IExplanationEditorProps> = (props) => {
  const ref = useRef<Editor>(null);
  const {
    defaultValue: initialValue,
    onChange: onEditorChange,
    ...restProps
  } = props;
  const { mode } = useTheme();

  return mergeClassAndStyleProps(
    props,
    <Editor
      ref={ref}
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
      initialValue={initialValue}
      init={{
        height: 350,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "codesample",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "wordcount",
        ],
        toolbar:
          "undo redo | " +
          "codesample | bold italic forecolor | alignleft aligncenter |" +
          "alignright alignjustify | bullist numlist outdent indent",
        content_style: "body { font-family:Inter; font-size:16px }",
        skin: mode === EThemeMode.Dark ? "oxide-dark" : "oxide",
        content_css: mode === EThemeMode.Dark ? "dark" : "light",
      }}
      onEditorChange={onEditorChange}
      {...restProps}
    />
  );
};
