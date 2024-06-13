import { IComponentBaseProps, IControllableComponentProps } from "@/shared";

export interface IMarkdownEditorProps
  extends IControllableComponentProps<string>,
    IComponentBaseProps {}

export interface IMarkdownViewerProps extends IComponentBaseProps {
  value: string;
}
