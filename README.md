# Html to Canvas Library

A library that converts html dom to canvas - using svg foreignObject
<br><br>


# Installation

```
npm i html-canvas-ts
```

# Usage

```

const cb = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    console.log(ctx, width, number)
}

htmlToCanvas({
    refId: document.getElementById('print-ticket'),
    printStyle: '<style> You can set up your default style inside your div.print-ticket </style>',
    opts: { // those are optional
        downloadAsImage: true,
        name: 'download-date.png'
    },
    cb
});

```
<br>

Clone the seed app with
```
git clone git@github.com:BeratS/html-to-canvas.git
```

<br>

# Browsers
It's tested on latest Chrome(102) and Firefox(100), Safari(15), Cog Browser there are performing significantly better on big DOM trees, possibly due to it's more performant SVG support.

Internet Explorer is not (and will not be) supported, as it does not support SVG <foreignObject> tag

<br>

# You can find me on:

```
https://twitter.com/BeratSdev
https://linkedin.com/in/berat-sulimani
```

<br>

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/beratsdev)

<br>
<br>

# TODO
Create an issue of what are your needs of this library.
<br>
Feel free to chat with me.

<!-- # License

# Migration -->
