import {
  IContainer,
  IText,
  ITab,
  IButton,
  IButtonGroup,
  ISwitchItem,
  ICheckbox,
  ISelectItem,
  IOptionGroup,
  IInputItem,
  ICanvas,
  ISliderItem,
  ISubHeader,
  IHeader,
  ILoading,
  ILink,
  IImage,
  ITextarea,
  IUploadItem,
  IIFstructContainer,
  ICode,
  IColorPicker,
} from './type'
import { genStruct } from './helper'

/**
The components object mounts a representation of the components supported by the extension interface, for details see: [Extension Components](https://doc.iofod.com/#/en/9/03.md).
*/
export const components = {
  /**
 *Container

Container component for organizing the structure of expanded interface components.

Property descriptions.

| Properties | Default | Description                                                       |
| ---------- | ------- | ----------------------------------------------------------------- |
| style      | { }     | The CSS style configuration for the container.                    |
| hoverStyle | { }     | The CSS style configuration for the container in the hover state. |
| children   | [ ]     | The list of child elements of the container.                      |

Event:

| event | description                            |
| ----- | -------------------------------------- |
| click | The click event of the target element. |

Example:

```js
const { Text, Container } = PLUS.components

export async function main() {
  await PLUS.init({
    state: {
      name: 'Mike',
    }
  })

  await PLUS.render([
    Text('$name'),
    Container(
      children: [
        Text('Hello'),
        Text('World')
      ]
    )
  ])
}
```
*/
  Container(config: IContainer, hook?: string) {
    config.children = config.children || []

    return genStruct('Container', config, hook)
  },

  /**
Text component, used to expand the display of common text in the interface.

Parameter:

| Properties | Default | Description                                    |
| ---------- | ------- | ---------------------------------------------- |
| value      | -       | The text content.                              |
| style      | { }     | The CSS style configuration for the text.      |
| hoverStyle | { }     | The CSS style for the text in the hover state. |

Event:

The Text component does not support binding events.

Example:

```js
const { Text } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      msg: "Hello",
      name: "Mike",
    },
  });

  await PLUS.render([
    Text("$msg"),
    Text("World"),
    Text({
      value: '# "by" + $name',
      style: {
        fontSize: "24px",
        color: "#ccc",
        opacity: 1,
        transition: "all 0.3s ease",
      },
      hoverStyle: {
        opacity: 0.8,
      },
    }),
  ]);
}
```
*/
  Text(config: IText, hook?: string) {
    return genStruct('Text', config, hook)
  },

  /**
Tab menu component for switching and displaying components.

Parameter:

| Properties | Default | Description                                                                                                              |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| value      | -       | The value of the active Tab item.                                                                                        |
| list       | { }     | The configuration of the sub-Tab item.                                                                                   |
| sticky     | false   | Controls the start of the [sticky layout](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky_positioning). |

Description of the **list** object.

The key-name of this Key-Value object indicates the identity of the Tab item, and the key-value indicates the text display of the Tab item in the Tab menu.

Event:

| Event  | Description                |
| ------ | -------------------------- |
| change | The Tab item change event. |

Example:

```js
const { Tabs } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      tabType: "tab1",
    },
  });

  await PLUS.render([
    Tabs(
      {
        value: "$tabType",
        list: {
          tab1: "tab1",
          tab2: "tab2",
          tab3: "tab3",
          tab4: "tab4",
        },
        sticky: false,
      },
      "changeTab"
    ),
  ]);
}

export async function changeTab(e) {
  console.log(e);
}
```
*/
  Tabs(config: ITab, hook?: string) {
    return genStruct('Tabs', config, hook)
  },

  /**
The button component.

Parameter:

| Properties | Default                                                                                     | Description                                |
| ---------- | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| value      | -                                                                                           | The display text content of the button.    |
| color      | -                                                                                           | The color of the button.                   |
| disabled   | false                                                                                       | Controls the disabled state of the button. |
| icon       | - the icon content of the button, supports [Material Icon](https://fonts.google.com/icons). |

Event:

| event | description                     |
| ----- | ------------------------------- |
| click | The target element click event. |

Example:

```js
const { Button } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {},
  });

  await PLUS.render([
    Button("well"),
    Button(
      {
        icon: "grade",
        color: "#000000",
        value: "done"
      },
      "click"
    ),
  ]);
}

export async function click(e) {
  console.log(e);
}
```
*/
  Button(config: IButton, hook?: string) {
    return genStruct('Button', config, hook)
  },

  /**
Button container component.

Parameter:

| Properties | Default | Description                                                                 |
| ---------- | ------- | --------------------------------------------------------------------------- |
| style      | { }     | The CSS style configuration for the button container.                       |
| group      | [ ]     | The configured content of the sub-button, same as the **Button** component. |

Event:

| event | description                                   |
| ----- | --------------------------------------------- |
| click | The click event of the target button element. |

Example:

```js
const { ButtonGroup } = PLUS.components

export async function main() {
  await PLUS.init({
    state: {
    }
  })

  await PLUS.render([
    ButtonGroup(
      {
        style: {
          display: 'flex',
          justifyContent: 'center'
        },
        group: [
          {
            value: '23567',
            color: 'none'
          },
          {
            icon: 'grade',
            value: '666',
            color: '#4caf50'
          },
          {
            value: 'Cancel'
          }
        ]
      },
      'clickButtonGroup'
    ),
  ])
}

export async function clickButtonGroup(e) {
  console.log(e)
}
```
*/
  ButtonGroup(config: IButtonGroup, hook?: string) {
    return genStruct('ButtonGroup', config, hook)
  },

  /**
Switch component.

Parameter:

| Attribute | Default | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| value     | -       | The value of the target component.                   |
| name      | -       | The title of the target component.                   |
| disabled  | false   | Controls the disabled state of the target component. |

Event:

| event  | description                                   |
| ------ | --------------------------------------------- |
| change | The value change event of the target element. |

Example:

```js
const { SwitchItem } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      isOpen: false,
    },
  });

  await PLUS.render([
    SwitchItem(
      {
        value: "$isOpen",
        name: "Switch",
      },
      "change"
    ),
  ]);
}

export async function change(e) {
  console.log(e);
}
```
*/
  SwitchItem(config: ISwitchItem, hook?: string) {
    return genStruct('SwitchItem', config, hook)
  },

  /**
Single-select component.

Parameter:

| Properties | Default | Description                                          |
| ---------- | ------- | ---------------------------------------------------- |
| value      | -       | The value of the target component.                   |
| name       | -       | The title of the target component.                   |
| disabled   | false   | Controls the disabled state of the target component. |

Event:

| event  | description                                   |
| ------ | --------------------------------------------- |
| change | The value change event of the target element. |

Example:

```js
const { Checkbox } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      isHold: false,
    },
  });

  await PLUS.render([
    Checkbox(
      {
        value: "$isHold",
        name: "Check",
      },
      "change"
    ),
  ]);
}

export async function change(e) {
  console.log(e);
}
```
*/
  Checkbox(config: ICheckbox, hook?: string) {
    return genStruct('Checkbox', config, hook)
  },

  /**
Dropdown selection component.

Parameter:

| Property   | Default | Description                                                             |
| ---------- | ------- | ----------------------------------------------------------------------- |
| value      | -       | The value of the target element.                                        |
| name       | -       | The title of the target element.                                        |
| options    | [ ]     | The configuration of the drop-down options, see the **options** object. |
| filterable | false   | Controls the filtering of the options.                                  |
| changeable | false   | Controls support for custom options.                                    |

Description of the **options** object.

| properties | default | description                                       |
| ---------- | ------- | ------------------------------------------------- |
| value      | -       | The value of the option.                          |
| label      | -       | The description text of the option.               |
| disabled   | false   | Controls the disabled state of the target option. |

Event:

| event  | description                                   |
| ------ | --------------------------------------------- |
| change | The value change event of the target element. |

Example:

```js
const { SelectItem } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      select1: "",
    },
  });

  await PLUS.render([
    SelectItem(
      {
        name: "Form",
        value: "$select1",
        filterable: false,
        changeable: false,
        options: [
          {
            value: "op1",
            label: "op1",
          },
          {
            value: "op2",
            label: "op2",
            disabled: true,
          },
          {
            value: "op3",
            label: "op3",
          },
        ],
      },
      "changeSelect"
    ),
  ]);
}

export async function changeSelect(e) {
  console.log(e);
}
```
*/
  SelectItem(config: ISelectItem, hook?: string) {
    return genStruct('SelectItem', config, hook)
  },
  /**
Option group component.

Parameter:

| Property | Default | Description                                                   |
| -------- | ------- | ------------------------------------------------------------- |
| value    | -       | The value of the target element.                              |
| name     | -       | The title of the target element.                              |
| options  | [ ]     | The configuration of the options, see the **options** object. |

Description of the **options** object.

| properties | default | description                                                                                            |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------ |
| value      | -       | The value of the option.                                                                               |
| label      | -       | The description text of the option.                                                                    |
| disabled   | false   | Controls the disabled state of the target option.                                                      |
| icon       | -       | Configure the value of the vector path to display the icon, just as you would with the icon component. |
| viewBox    | -       | If the option is of type icon, the viewBox property can be configured as if it were an SVG.            |
| tip        | -       | Hover tips for options.                                                                                |
| style      | { }     | The CSS style configuration for the options.                                                           |

Event:

| event  | description                                   |
| ------ | --------------------------------------------- |
| change | The value change event of the target element. |

Example:

```js
const { OptionGroup } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      select1: "",
    },
  });

  await PLUS.render([
    OptionGroup(
      {
        name: 'Shape',
        value: '$select1',
        options: [
          {
            value: 0,
            label: 's1',
          },
          {
            value: 2,
            label: 's2',
          },
          {
            value: 3,
            label: 's3',
          },
          {
            value: 1,
            label: 's4',
            viewBox: '0 0 145 24',
            icon: 'M0 2H22V21C22 21.5523 22.4477 22 23 22H121C121.552 22 122 21.5523 122 21V2H145',
          },
        ],
      },
      "changeSelect"
    ),
  ]);
}

export async function changeSelect(e) {
  console.log(e);
}
```
*/
  OptionGroup(config: IOptionGroup, hook?: string) {
    return genStruct('OptionGroup', config, hook)
  },

  /**
The input box component.

Parameter:

| Properties  | Default                           | Description                                                     |
| ----------- | --------------------------------- | --------------------------------------------------------------- |
| value       | -                                 | The value of the input box.                                     |
| type        | -                                 | The form type of the input box.                                 |
| name        | -                                 | The title of the input box.                                     |
| placeholder | - - The prompt for the input box. |
| disabled    | false                             | Controls the disabled state of the input box.                   |
| readonly    | false                             | Controls the read-only state of the input box.                  |
| useHelper   | false                             | Controls the display state of the filler tool in the input box. |
| maxlength   | -                                 | The maximum length of the input field.                          |

Event:

| event  | description                                               |
| ------ | --------------------------------------------------------- |
| focus  | The event to get the input focus of the target input box. |
| blur   | The event of losing focus of the target input box.        |
| input  | The keyboard input event of the target input box.         |
| change | The value change event of the target input box.           |

Example:

```js
const { InputItem } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      input1: "Customer",
      input2: "",
    },
  });

  await PLUS.render([
    InputItem(
      {
        name: "ID",
        value: "$input1",
        useHelper: true,
      },
      "changeInput"
    ),
    InputItem(
      {
        name: "PW",
        value: "$input2",
        useHelper: false,
        readonly: false,
        type: "password",
        maxlength: 14,
      },
      "changeInput"
    ),
  ]);
}

export async function changeInput(e) {
  console.log(e);
}
```
*/
  InputItem(config: IInputItem, hook?: string) {
    return genStruct('InputItem', config, hook)
  },

  /**
Canvas component.

Parameter:

| Properties | Default | Description                                |
| ---------- | ------- | ------------------------------------------ |
| width      | 300     | The drawing width of the canvas.           |
| height     | 200     | The height of the canvas to draw.          |
| style      | { }     | The CSS style configuration of the canvas. |

Event:

| event      | description                                                                                                                |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| transfer   | The canvas initialization event, used to transfer the canvas control of the expanded interface to the expanded processing. |
| mouseenter | The mouseenter event of the target element.                                                                                |
| mouseleave | The mouse leave event of the target element.                                                                               |
| mousedown  | The mouse down event of the target element.                                                                                |
| mouseup    | The mouseup event of the target element.                                                                                   |
| mousemove  | The mouseover event of the target element.                                                                                 |
| mousewheel | The mouse wheel scroll event of the target element.                                                                        |

Example:

```js
const { Canvas } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {},
  });

  await PLUS.render([
    Canvas(
      {
        width: 100,
        height: 100,
        style: {
          position: "absolute",
          top: "120px",
          left: "50px",
          backgroundColor: "#fff",
        },
      },
      "initCanvas"
    ),
  ]);
}

, initCanvas(e) {
  if (e.type == "transfer") {
    let cxt = e.transfer.getContext("2d");
    cxt.fillStyle = "#FF0000";
    cxt.fillRect(50, 0, 150, 75);
  }
}
```
*/
  Canvas(config: ICanvas, hook?: string) {
    return genStruct('Canvas', config, hook)
  },

  /**
Slider component.

Parameter:

| Attribute | Default | Description                                  |
| --------- | ------- | -------------------------------------------- |
| value     | -       | The value of the target component.           |
| name      | -       | The title of the target component.           |
| step      | 1       | The step length of the slider.               |
| hideTip   | true    | Control the display of the slider value tip. |
| min       | 0       | The minimum value of the slider.             |
| max       | 100     | The maximum value of the slider.             |

Event:

| event  | description                                                   |
| ------ | ------------------------------------------------------------- |
| input  | The event to change the value of the slider during sliding.   |
| change | The event to change the value after the slider stops sliding. |

Example:

```js
const { SliderItem } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      s1: 0,
    },
  });

  await PLUS.render([
    SliderItem(
      {
        name: "Slider",
        value: "$s1",
        hideTip: false,
        min: -100,
        max: 100,
        step: 2,
      },
      "changeSlider"
    ),
  ]);
}

export async function changeSlider(e) {
  console.log(e);
}
```
*/
  SliderItem(config: ISliderItem, hook?: string) {
    return genStruct('SliderItem', config, hook)
  },

  /**
  Divider component.

  Parameter:

  The Divider component has no properties to configure.

  Event:

  The Divider component does not support binding events.

  Example:

  ```js
  const { Text, Divider } = PLUS.components;

  export async function main() {
    await PLUS.init({
      state: {},
    });

    await PLUS.render([Text("Hello"), Divider(), Text("World")]);
  }
  ```
*/
  Divider() {
    return genStruct('Divider', '')
  },

  /**
The subheader component.

Parameter:

| Attribute | Default | Description       |
| --------- | ------- | ----------------- |
| value     | -       | The text content. |

Event:

The SubHeader component does not support binding events.

Example:

```js
const { SubHeader } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      msg: "Hello World",
    },
  });

  await PLUS.render([SubHeader("$msg")]);
}
```
*/
  SubHeader(config: ISubHeader, hook?: string) {
    return genStruct('SubHeader', config, hook)
  },

  /**
Header component.

Attribute Description.

| Attribute | Default | Description       |
| --------- | ------- | ----------------- |
| value     | -       | The text content. |

Event:

The Header component does not support binding events.

Example:

```js
const { Header } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      msg: "Hello World",
    },
  });

  await PLUS.render([Header("$msg")]);
}
```
*/
  Header(config: IHeader, hook?: string) {
    return genStruct('Header', config, hook)
  },

  /**
Loads the status component.

Parameter:

| Attribute | Default | Description       |
| --------- | ------- | ----------------- |
| value     | -       | The text content. |

Event:

The SubHeader component does not support binding events.

Example:

```js
const { Loading } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      useLoading: true,
    },
  });

  await PLUS.render([
    Loading({
      render: "$useLoading",
    }),
  ]);

  setTimeout(() => {
    PLUS.setState({
      useLoading: false,
    });
  }, 2000);
}
```
*/
  Loading(config: ILoading, hook?: string) {
    return genStruct('Loading', config, hook)
  },

  /**
Hyperlink component.

Parameter:

| Attribute | Default | Description                        |
| --------- | ------- | ---------------------------------- |
| value     | -       | The URL value of the hyperlink.    |
| name      | -       | The display text of the hyperlink. |

Event:

The Link component does not support binding events.

Example:

```js
const { Link } = PLUS.components

export async function main() {
  await PLUS.init({
    state: {
      name: 'Google',
    }
  })

  await PLUS.render([
    Link({
      name: '$name'
      value: 'https://www.google.com'
    })
  ])
}
```
*/
  Link(config: ILink, hook?: string) {
    return genStruct('Link', config, hook)
  },

  /**
Image component for rendering image resources in the expansion interface.

Parameter:

| Properties    | Default                        | Description                                                                                                              |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| value         | -                              | The URL link to the image resource.                                                                                      |
| style         | { }                            | The CSS style configuration for the image.                                                                               |
| hoverStyle    | { }                            | The CSS style of the image in the hover state.                                                                           |
| dragAndDrop   | false                          | Configure the response to user drag-and-drop events.                                                                     |
| droppableType | ['level', 'container', 'unit'] | The type of the component that is allowed to be dropped in iofod during the dragging of the image component.             |
| payload       | { }                            | The data that is passed to the dropped component after the drop event is triggered in response to a drag-and-drop event. |

Event:

| event | description                            |
| ----- | -------------------------------------- |
| drop  | The drop event of the target element.  |
| click | The click event of the target element. |

Example:

```js
const { Image } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      src: "https://yourlink",
    },
  });

  await PLUS.render([
    Image("https://yourlink"),
    Image(
      {
        dragAndDrop: true,
        droppableType: ["level", "container"],
        style: {
          width: "36px",
          cursor: "alias",
          opacity: "0.6",
          transition: "all 0.2s ease",
        },
        hoverStyle: {
          opacity: "1",
        },
        payload: { foo: "bar" },
        value: "$src",
      },
      "dragend"
    ),
  ]);
}

export async function dragend(e) {
  console.log(e);
}
```
*/
  Image(config: IImage, hook?: string) {
    return genStruct('Image', config, hook)
  },

  /**
Text field component.

Parameter:

| Attribute   | Default | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| value       | -       | The value of the text field.                    |
| name        | -       | The title of the text field.                    |
| placeholder | -       | The prompt for the text field.                  |
| disabled    | false   | Controls the disabled state of the text field.  |
| readonly    | false   | Controls the read-only state of the text field. |

Event:

| event  | description                                                     |
| ------ | --------------------------------------------------------------- |
| focus  | The get input focus event of the target element.                |
| blur   | The event that the target element loses the focus of the input. |
| change | The value change event of the target element.                   |

Example:

```js
const { Textarea } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      input1: "",
    },
  });

  await PLUS.render([
    Textarea(
      {
        name: "ID",
        value: "$input1",
      },
      "change"
    ),
  ]);
}

export async function change(e) {
  console.log(e);
}
```
*/
  Textarea(config: ITextarea, hook?: string) {
    return genStruct('Textarea', config, hook)
  },

  /**
Upload component.

Parameter:

| Properties | Default | Description                                         |
| ---------- | ------- | --------------------------------------------------- |
| value      | -       | The value of the target component.                  |
| multiple   | false   | Controls multiple file uploads.                     |
| accept     | \*      | Controls the supported file formats for the upload. |

Event descriptions.

| event  | description                          |
| ------ | ------------------------------------ |
| drop   | The drag-and-drop file upload event. |
| change | Click to upload the file event.      |

Example:

```js
const { UploadItem } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      file2: "",
    },
  });

  await PLUS.render([
    UploadItem(
      {
        value: "$file2",
        multiple: true,
      },
      "changeUpload"
    ),
  ]);
}

export async function changeUpload(e) {
  console.log(e);
}
```
*/
  UploadItem(config: IUploadItem, hook?: string) {
    return genStruct('UploadItem', config, hook)
  },

  /**
IFstruct container component for parsing IFstruct into regular components. The configuration allows the structural data of the IFstruct container component to be added to the target drag and drop object in response to a user drag and drop event.

Parameter:

| Properties         | Default | Description                                                                                                                                                  |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value              | -       | IFstruct structure content.                                                                                                                                  |
| style              | { }     | CSS style configuration for components.                                                                                                                      |
| hoverStyle         | { }     | The CSS style configuration for a component in the mouse hover state.                                                                                        |
| subStyle           | { }     | This attribute is used to override the style attribute of the top-level element of the IFstruct structure.                                                   |
| dragAndDrop        | false   | Configure the response to user drag-and-drop events.                                                                                                         |
| proxyCurrentTarget | false   | Used to directly preview the object currently selected by the user to avoid performance loss. When switched on, the configured dragAndDrop will be disabled. |
| payload            | { }     | Allows data to be passed back to the component when the addComponent event is fired in response to a drag and drop event.                                    |

Event:

| Event        | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| addComponent | The event after a component has been added to the target element. |

Example:

```js
const { IFstructContainer } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {},
  });

  await PLUS.render([
    IFstructContainer(
      {
        dragAndDrop: true,
        payload: {
          type: "custom-icon",
        },
        style: {
          padding: "4px 8px",
        },
        value: {
          u692644537uw: {
            name: "ic_stars",
            type: "unit",
            lock: false,
            parent: null,
            children: [],
            content: "base/icon",
            remarks: "",
            status: [
              {
                name: "default",
                id: "default",
                active: true,
                props: {
                  option: {},
                  style: {
                    color: "rgb(253, 157, 157)",
                    fill: "rgb(253, 157, 157)",
                  },
                  d: 0,
                  x: 0,
                  y: 0,
                },
              },
            ],
            model: {
              viewBox: {
                value: "0 0 48 48",
                subscribe: "",
                ZI: 0,
              },
              d: {
                value:
                  "M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zm8.47 32L24 30.9 15.54 36l2.24-9.62-7.46-6.47 9.84-.84L24 10l3.84 9.07 9.84.84-7.46 6.47L32.46 36z",
                subscribe: "",
                ZI: 0,
              },
            },
            events: [],
          },
        },
      },
      "dragend"
    ),
  ]);
}

export async function dragend(e) {
  console.log(e);
}
```
*/
  IFstructContainer(config: IIFstructContainer, hook?: string) {
    return genStruct('IFstructContainer', config, hook)
  },

  /**
Code component for highlighting code, supporting highlighting of `HTML`, `CSS`, `Javascript` and `JSON` code.

Parameter:

| Properties  | Default    | Description                                                             |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| value       | -          | Code content                                                            |
| lang        | javascript | Language format of the code, supporting html, css, javascript and json. |
| style       | { }        | CSS style configuration for components.                                 |
| hoverStyle  | { }        | The CSS style configuration for a component in the mouse hover state.   |
| hideCopyBtn | false      | Configure whether to display the code copy button.                      |

Event:

| Event    | Description                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------- |
| copyCode | If the Show Copy button is set, then the result of the copy will be called back via this event. |

Example:

```js
const { Code } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      currentJSON: "{}",
    },
  });

  await PLUS.render([
    Code(
      {
        lang: "json",
        hideCopyBtn: false,
        value: "$currentJSON",
        style: {
          opacity: 0.8,
        },
        hoverStyle: {
          opacity: 1,
        },
      },
      "listenCopy"
    ),
  ]);
}

export async function listenCopy(e) {
  console.log(e);
}
```
*/
  Code(config: ICode, hook?: string) {
    return genStruct('Code', config, hook)
  },
  /**
Colour picker component.

Parameter:

| Property | Default | Description                      |
| -------- | ------- | -------------------------------- |
| value    | -       | The value of the target element. |
| name     | -       | The title of the target element. |

Event:

| Event | Description                               |
| ----- | ----------------------------------------- |
| input | Triggers an event when the color changes. |

Example:

```js
const { ColorPicker } = PLUS.components;

export async function main() {
  await PLUS.init({
    state: {
      color: "#ffffff",
    },
  });

  await PLUS.render([
    ColorPicker(
      {
        name: 'Color',
        value: '$color',
      },
      "changeColor"
    ),
  ]);
}

export async function changeColor(e) {
  console.log(e);
}
```
*/
  ColorPicker(config: IColorPicker, hook?: string) {
    return genStruct('ColorPicker', config, hook)
  },
}
