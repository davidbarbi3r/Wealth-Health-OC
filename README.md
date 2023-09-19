# gnarly-date-picker

[![npm version](https://img.shields.io/npm/v/gnarly-date-picker.svg)](https://www.npmjs.com/package/gnarly-date-picker)
[![GitHub repo](https://img.shields.io/badge/GitHub-Repo-blue.svg)](https://github.com/your-github-username/gnarly-date-picker)
[![Node.js version](https://img.shields.io/badge/Node.js-16.14.2-green.svg)](https://nodejs.org/)

A customizable date picker component for React.

The `gnarly-date-picker` component is a versatile date picker that can be integrated into your React applications. It provides a flexible and user-friendly solution for selecting dates.

## Prerequisites

Before using this component, ensure that you have React and React DOM installed in your project.

```bash
npm install react react-dom
```

## Installation

You can install the package using npm, pnpm, or yarn:

```bash
npm install gnarly-date-picker
pnpm install gnarly-date-picker
yarn add gnarly-date-picker
```

## Usage

```jsx
import GnarlyDatePicker from "gnarly-date-picker";

// ...

function MyComponent() {
    const [date, setDate] = useState(null);
    
    return (
    <form>
        <GnarlyDatePicker
            date={date} 
            setDate={setDate}
        />
    </form>
    );
    }

    export default MyComponent;
```

## Props

### The GnarlyDatePicker component accepts the following props:

**date** (required): The selected date value (controlled component).
**setDate** (required): A function to update the selected date (controlled component).

### Additional Props

name (optional): The name attribute for the input field.
label (optional): A label for the date picker.
displayDateText (optional): A boolean to control the display of the selected date.
wrapperHeight (optional): The height of the date picker wrapper.
wrapperWidth (optional): The width of the date picker wrapper.
showColumnIndex (optional): A boolean to control the display of column indices.
inputClassName (optional): CSS class for styling the input element.

Feel free to customize the component's appearance and behavior further based on your application's needs.

### Links

[npm package](https://www.npmjs.com/package/gnarly-date-picker)
[GitHub repository](https://github.com/davidbarbi3r/gnarly-date-picker)