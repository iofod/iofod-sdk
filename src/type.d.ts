export interface GlobalObject {
  [key: string]: unknown
}

export interface IConf {
  state?: GlobalObject
  persisted?: boolean
  version?: string
  size?: number
}

export interface IRes {
  code: number
  data: GlobalObject
  msg: string
}

export interface IStore {
  state: GlobalObject
}

export interface IFnObject {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function
}

export interface IFnListObject {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function[]
}

export interface IBcObject {
  [key: string]: BroadcastChannel
}

export interface StringObject {
  [key: string]: string
}

export interface Irender {
  render?: string | boolean
  payload?: unknown
}

export interface IStringO extends Irender {
  value: string
}

export interface IBooleanO extends Irender {
  value: boolean
}

export interface ICSSO {
  [key: string]: string | number | undefined
}

interface ContainerConf extends Irender {
  style?: ICSSO
  hoverStyle?: ICSSO
  children?: IStruct[]
}
export type IContainer = ContainerConf

interface ITextCof extends IStringO {
  style?: ICSSO
  hoverStyle?: ICSSO
}
export type IText = string | ITextCof

interface ITabCof extends IStringO {
  list?: StringObject
  sticky?: boolean
}
export type ITab = string | ITabCof

interface IButtonCof extends IStringO {
  color?: string
  disabled?: boolean
  icon?: string
}
export type IButton = string | IButtonCof

interface IButtonGroupCof extends Irender {
  style?: ICSSO
  group: GlobalObject[]
}
export type IButtonGroup = IButtonGroupCof

interface ISwitchItemCof extends Irender {
  value: boolean | string
  name: string
  disabled?: boolean
}
export type ISwitchItem = string | boolean | ISwitchItemCof

interface ICheckboxCof extends Irender {
  value: boolean | string
  name: string
  disabled?: boolean
}
export type ICheckbox = string | boolean | ICheckboxCof

interface IOptionsCof {
  value: unknown
  label: string
  disabled?: boolean
}
interface ISelectItemCof extends Irender {
  value: unknown
  name: string
  options: IOptionsCof[]
  filterable?: boolean
  changeable?: boolean
}
export type ISelectItem = ISelectItemCof

interface IInputItemCof extends Irender {
  value: unknown
  name: string
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  useHelper?: boolean
  maxlength?: string | number
}
export type IInputItem = IInputItemCof

interface ICanvasCof extends Irender {
  width: number
  height: number
  style?: ICSSO
}
export type ICanvas = ICanvasCof

interface ISliderItemCof extends Irender {
  value: string | number
  name: string
  step?: number
  hideTip?: boolean
  min?: number
  max?: number
}
export type ISliderItem = ISliderItemCof

type ISubHeader = string | IStringO
type IHeader = string | IStringO
type ILoading = string | IStringO

interface ILinkCof extends IStringO {
  name: string
}
export type ILink = ILinkCof

interface IImageCof extends IStringO {
  style?: ICSSO
  hoverStyle?: ICSSO
  dragAndDrop?: boolean
  droppableType?: string[]
}
export type IImage = string | IImageCof

interface ITextareaCof extends IStringO {
  name: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
}
export type ITextarea = ITextareaCof

interface IUploadItemCof extends Irender {
  value: unknown
  multiple?: boolean
  accept?: string
}
export type IUploadItem = IUploadItemCof

interface IIFstructContainerCof extends Irender {
  value: GlobalObject
  style?: ICSSO
  hoverStyle?: ICSSO
  subStyle?: ICSSO
  dragAndDrop?: boolean
  proxyCurrentTarget?: boolean
  payload?: GlobalObject
}
export type IIFstructContainer = IIFstructContainerCof

interface ICodeCof extends Irender {
  value: string | GlobalObject
  lang?: string
  style?: ICSSO
  hoverStyle?: ICSSO
  hideCopyBtn?: boolean
}
export type ICode = string | ICodeCof

export type IMatchCof =
  | string
  | boolean
  | IContainer
  | IText
  | ITab
  | IButton
  | IButtonGroup
  | ISwitchItem
  | ICheckbox
  | ISelectItem
  | IInputItem
  | ICanvas
  | ISliderItem
  | ISubHeader
  | IHeader
  | ILoading
  | ILink
  | IImage
  | ITextarea
  | IUploadItem
  | IIFstructContainer
  | ICode

export interface IStruct {
  tag: string
  value?: unknown | string | number | boolean | GlobalObject | IMatchCof
  hook?: string
}
