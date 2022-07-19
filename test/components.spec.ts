/* eslint-disable @typescript-eslint/no-unused-vars */
import { components } from '../src/components'

const {
  Container,
  Text,
  Tabs,
  Button,
  ButtonGroup,
  SwitchItem,
  Checkbox,
  SelectItem,
  InputItem,
  Canvas,
  SliderItem,
  Divider,
  SubHeader,
  Header,
  Loading,
  Link,
  Image,
  Textarea,
  UploadItem,
  IFstructContainer,
  Code,
} = components

describe('event', () => {
  it('Container', () => {
    expect(Container({ children: [] }).tag).toEqual('Container')
    expect(Container({}).tag).toEqual('Container')
    expect(
      Container({
        children: [
          Text('Text'),
          Container(
            {
              render: false,
              style: {
                width: '100px',
              },
              hoverStyle: {
                width: '120px',
              },
              children: [Header('Inner')],
            },
            'click'
          ),
        ],
      }).tag
    ).toEqual('Container')
  })
  it('Text', () => {
    expect(Text('Text').tag).toEqual('Text')

    expect(
      Text({
        value: '# "by" + $name',
        style: {
          fontSize: '24px',
          color: '#ccc',
          opacity: 1,
          transition: 'all 0.3s ease',
        },
        hoverStyle: {
          opacity: 0.8,
        },
      }).tag
    ).toEqual('Text')
  })
  it('Tabs', () => {
    expect(Tabs('Tabs').tag).toEqual('Tabs')

    expect(
      Tabs(
        {
          value: '$tabType',
          list: {
            tab1: 'tab1',
            tab2: 'tab2',
            tab3: 'tab3',
            tab4: 'tab4',
          },
          sticky: false,
        },
        'changeTab'
      ).tag
    ).toEqual('Tabs')
  })
  it('Button', () => {
    expect(Button('Button').tag).toEqual('Button')

    expect(
      Button(
        {
          icon: 'grade',
          color: '#000000',
          value: 'done',
        },
        'click'
      ).tag
    ).toEqual('Button')
  })
  it('ButtonGroup', () => {
    expect(
      ButtonGroup({
        style: {
          display: 'flex',
          justifyContent: 'center',
        },
        group: [
          {
            value: '23567',
            color: 'none',
          },
        ],
      }).tag
    ).toEqual('ButtonGroup')
  })
  it('SwitchItem', () => {
    expect(
      SwitchItem({
        value: false,
        name: 'name',
      }).tag
    ).toEqual('SwitchItem')
  })
  it('Checkbox', () => {
    expect(
      Checkbox({
        value: false,
        name: 'name',
      }).tag
    ).toEqual('Checkbox')
  })
  it('SelectItem', () => {
    expect(
      SelectItem(
        {
          name: 'Form',
          value: '$select1',
          filterable: false,
          changeable: false,
          options: [
            {
              value: 'op1',
              label: 'op1',
            },
            {
              value: 'op2',
              label: 'op2',
              disabled: true,
            },
            {
              value: 'op3',
              label: 'op3',
            },
          ],
        },
        'changeSelect'
      ).tag
    ).toEqual('SelectItem')
  })
  it('InputItem', () => {
    expect(
      InputItem({
        value: false,
        name: 'InputItem',
      }).tag
    ).toEqual('InputItem')

    expect(
      InputItem(
        {
          name: 'PW',
          value: '$input2',
          useHelper: false,
          readonly: false,
          type: 'password',
          maxlength: 14,
        },
        'changeInput'
      ).tag
    ).toEqual('InputItem')
  })
  it('Canvas', () => {
    expect(
      Canvas(
        {
          width: 100,
          height: 100,
          style: {
            position: 'absolute',
            top: '120px',
            left: '50px',
            backgroundColor: '#fff',
          },
        },
        'initCanvas'
      ).tag
    ).toEqual('Canvas')
  })
  it('SliderItem', () => {
    expect(
      SliderItem({
        value: 0,
        name: 'SliderItem',
      }).tag
    ).toEqual('SliderItem')

    expect(
      SliderItem(
        {
          name: 'Slider',
          value: '$s1',
          hideTip: false,
          min: -100,
          max: 100,
          step: 2,
        },
        'changeSlider'
      ).tag
    ).toEqual('SliderItem')
  })
  it('Divider', () => {
    expect(Divider().tag).toEqual('Divider')
  })
  it('SubHeader', () => {
    expect(
      SubHeader({
        value: 'SubHeader',
      }).tag
    ).toEqual('SubHeader')
  })
  it('Header', () => {
    expect(
      Header({
        value: 'Header',
      }).tag
    ).toEqual('Header')
  })
  it('Loading', () => {
    expect(
      Loading({
        render: '$useLoading',
        value: 'Loading',
      }).tag
    ).toEqual('Loading')
  })
  it('Link', () => {
    expect(
      Link({
        name: 'Link',
        value: 'https://www.google.com',
      }).tag
    ).toEqual('Link')
  })
  it('Image', () => {
    expect(
      Image({
        value: 'https://www.google.com/logo.png',
      }).tag
    ).toEqual('Image')

    expect(
      Image(
        {
          dragAndDrop: true,
          droppableType: ['level', 'container'],
          style: {
            width: '36px',
            cursor: 'alias',
            opacity: '0.6',
            transition: 'all 0.2s ease',
          },
          hoverStyle: {
            opacity: '1',
          },
          payload: { foo: 'bar' },
          value: '$src',
        },
        'dragend'
      ).tag
    ).toEqual('Image')
  })
  it('Textarea', () => {
    expect(
      Textarea(
        {
          value: 'Textarea',
          name: 'Textarea',
        },
        'change'
      ).tag
    ).toEqual('Textarea')
  })
  it('UploadItem', () => {
    expect(
      UploadItem({
        value: 'UploadItem',
        multiple: false,
      }).tag
    ).toEqual('UploadItem')
  })
  it('IFstructContainer', () => {
    expect(
      IFstructContainer({
        dragAndDrop: true,
        payload: {
          type: 'custom-icon',
        },
        style: {
          padding: '4px 8px',
        },
        value: {},
      }).tag
    ).toEqual('IFstructContainer')

    expect(
      IFstructContainer({
        dragAndDrop: true,
        value: '$currentTree',
        style: {
          transform: 'scale(0.8)',
          transformOrigin: 'left top',
          minHeight: '50px',
          margin: '4px 0',
        },
      }).tag
    ).toEqual('IFstructContainer')
  })
  it('Code', () => {
    expect(
      Code({
        value: {},
      }).tag
    ).toEqual('Code')
    expect(
      Code(
        {
          lang: 'json',
          hideCopyBtn: false,
          value: '$currentJSON',
          style: {
            opacity: 0.8,
          },
          hoverStyle: {
            opacity: 1,
          },
        },
        'listenCopy'
      ).tag
    ).toEqual('Code')
  })
})
