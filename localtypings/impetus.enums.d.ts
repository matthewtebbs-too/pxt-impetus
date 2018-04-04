/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

//%
declare const enum MathOp {
    //% block="+"
    Add = 1,
    //% block="–"
    Subtract = 2,
    
    //% block="x"
    Multiply = 3,

    //% block="÷"
    Divide = 4,
}

//%
declare const enum MouseButton {
    //% block="left button"
    Left = 1,

    //% block="middle button"
    Middle = 2,

    //% block="right button"
    Right = 3,
}


//%
declare const enum SimplePalette {
    //% block="red"
    Red = 0xff0000,

    //% block="orange"
    Orange = 0xff7f00,

    //% block="yellow"
    Yellow = 0xffff00,

    //% block="green"
    Green = 0x00ff00,

    //% block="blue"
    Blue = 0x0000ff,

    //% block="indigo"
    Indigo = 0x4b0082,

    //% block="violet"
    Violet = 0x8a2be2,

    //% block="purple"
    Purple = 0xa033e5,

    //% block="aquamarine"
    Pink = 0xff007f,

    //% block="white"
    White = 0xffffff,

    //% block="black"
    Black = 0x000000
}

//%
declare const enum NaturePalette {
    //% block="sky"
    Ground = 0xffc87f,

    //% block="ground"
    Sky = 0x3284ff,
}

//%
declare const enum Palette {
    //% block="alice blue"
    AliceBlue = 0xf0f8ff,

    //% block="antique white"
    AntiqueWhite = 0xfaebd7,

    //% block="aqua"
    Aqua = 0x00ffff,

    //% block="aquamarine"
    Aquamarine = 0x7fffd4,

    //% block="azure"
    Aazure = 0xf0ffff,

    //% block="beige"
    Beige = 0xf5f5dc,

    //% block="bisque"
    Bisque = 0xffe4c4,

    //% block="black"
    Black = 0x000000,

    //% block="blanched almond"
    BlanchedAlmond = 0xffebcd,

    //% block="Blue"
    Blue = 0x0000ff,

    //% block="blue violet"
    BlueViolet = 0x8a2be2,

    //% block="brown"
    Brown = 0xa52a2a,

    //% block="burlywood"
    BurlyWood = 0xdeb887,

    //% block="cadet blue"
    CadetBlue = 0x5f9ea0,

    //% block="chartreuse"
    Chartreuse = 0x7fff00,

    //% block="chocolate"
    Chocolate = 0xd2691e,

    //% block="coral"
    Coral = 0xff7f50,

    //% block="cornflower blue"
    CornflowerBlue = 0x6495ed,

    //% block="cornsilk"
    Cornsilk = 0xfff8dc,

    //% block="crimson"
    Crimson = 0xdc143c,

    //% block="cyan"
    Cyan = 0x00ffff,

    //% block="dark blue"
    DarkBlue = 0x00008b,

    //% block="dark cyan"
    Darkcyan = 0x008b8b,

    //% block="dark goldenrod"
    DarkGoldenrod = 0xb8860b,

    //% block="dark gray"
    DarkGray = 0xa9a9a9,

    //% block="dark green"
    DarkGreen = 0x006400,

    //% block="dark khaki"
    DarkKhaki = 0xbdb76b,

    //% block="dark magenta"
    DarkMagenta = 0x8b008b,

    //% block="dark olive green"
    DarkOliveGreen = 0x556b2f,

    //% block="dark orange"
    DarkoOrange = 0xff8c00,

    //% block="dark orchid"
    DarkOrchid = 0x9932cc,

    //% block="dark red"
    DarkRed = 0x8b0000,

    //% block="dark salmon"
    DarkSalmon = 0xe9967a,

    //% block="dark sea green"
    DarkSeaGreen = 0x8fbc8f,

    //% block="dark slate blue"
    DarkSlateBlue = 0x483d8b,

    //% block="dark slate gray"
    DarkSlateGray = 0x2f4f4f,

    //% block="dark turquoise"
    DarkTurquoise = 0x00ced1,

    //% block="dark violet"
    DarkViolet = 0x9400d3,

    //% block="deep pink"
    DeepPink = 0xff1493,

    //% block="deep sky blue"
    DeepSkyBlue = 0x00bfff,

    //% block="dim gray"
    DimGray = 0x696969,

    //% block="dodger blue"
    DodgerBlue = 0x1e90ff,

    //% block="firebrick"
    Firebrick = 0xb22222,

    //% block="floral white"
    FloralWhite = 0xfffaf0,

    //% block="forest green"
    ForestGreen = 0x228b22,

    //% block="fuchsia"
    Fuchsia = 0xff00ff,

    //% block="gainsboro"
    Gainsboro = 0xdcdcdc,

    //% block="ghost white"
    GhostWhite = 0xf8f8ff,

    //% block="gold"
    Gold = 0xffd700,

    //% block="goldenrod"
    Goldenrod = 0xdaa520,

    //% block="gray"
    Gray = 0x808080,

    //% block="green"
    Green = 0x008000,

    //% block="honeydew"
    Honeydew = 0xf0fff0,

    //% block="hot pink"
    HotPink = 0xff69b4,

    //% block="indian red"
    IndianRed = 0xcd5c5c,

    //% block="indigo"
    Indigo = 0x4b0082,

    //% block="ivory"
    Ivory = 0xfffff0,

    //% block="khaki"
    Khaki = 0xf0e68c,

    //% block="lavender"
    Lavender = 0xe6e6fa,

    //% block="lavender blush"
    LavenderBlush = 0xfff0f5,

    //% block="lawn green"
    LawnGreen = 0x7cfc00,

    //% block="lemon chiffon"
    LemonChiffon = 0xfffacd,

    //% block="light blue"
    LightBlue = 0xadd8e6,

    //% block="light coral"
    LightCoral = 0xf08080,

    //% block="light cyan"
    LightCyan = 0xe0ffff,

    //% block="light goldenrod"
    LightGoldenrod = 0xfafad2,

    //% block="light gray"
    LightGray = 0xd3d3d3,

    //% block="aquamarine"
    LightGreen = 0x90ee90,

    //% block="light pink"
    LighPink = 0xffb6c1,

    //% block="light salmon"
    LightSalmon = 0xffa07a,

    //% block="light sea green"
    LightSeaGreen = 0x20b2aa,

    //% block="light sky blue"
    LightSkyBlue = 0x87cefa,

    //% block="light slate gray"
    LightSlateGray = 0x778899,

    //% block="light steel blue"
    LightSteelBlue = 0xb0c4de,

    //% block="light yellow"
    LightYellow = 0xffffe0,

    //% block="lime"
    Lime = 0x00ff00,

    //% block="lime green"
    Limegreen = 0x32cd32,

    //% block="linen"
    Linen = 0xfaf0e6,

    //% block="magenta"
    Magenta = 0xff00ff,

    //% block="maroon"
    Maroon = 0x800000,

    //% block="medium aquamarine"
    MediumAquamarine = 0x66cdaa,

    //% block="medium blue"
    MediumBlue = 0x0000cd,

    //% block="medium orchid"
    MediumOrchid = 0xba55d3,

    //% block="medium purple"
    MediumPurple = 0x9370db,

    //% block="medium sea green"
    MediumSeaGreen = 0x3cb371,

    //% block="medium slate blue"
    MediumSlateBlue = 0x7b68ee,

    //% block="medium spring green"
    MediumSpringGreen = 0x00fa9a,

    //% block="medium turquoise"
    MediumTurquoise = 0x48d1cc,

    //% block="medium violet red"
    MediumVioletRed = 0xc71585,

    //% block="midnight blue"
    MidnightBlue = 0x191970,

    //% block="mint cream"
    MintCream = 0xf5fffa,

    //% block="misty rose"
    MistyRose = 0xffe4e1,

    //% block="moccasin"
    Moccasin = 0xffe4b5,

    //% block="navajo white"
    NavajoWhite = 0xffdead,

    //% block="navy"
    Navy = 0x000080,

    //% block="oldlace"
    Oldlace = 0xfdf5e6,

    //% block="olive"
    Olive = 0x808000,

    //% block="olivedrab"
    Olivedrab = 0x6b8e23,

    //% block="orange"
    Orange = 0xffa500,

    //% block="orange red"
    OrangeRed = 0xff4500,

    //% block="orchid"
    Orchid = 0xda70d6,

    //% block="pale goldenrod"
    PaleGoldenrod = 0xeee8aa,

    //% block="pale green"
    PaleGreen = 0x98fb98,

    //% block="pale turquoise"
    PaleTurquoise = 0xafeeee,

    //% block="pale violet red"
    PaleVioletRed = 0xdb7093,

    //% block="papayawhip"
    Papayawhip = 0xffefd5,

    //% block="peach puff"
    PeachPuff = 0xffdab9,

    //% block="peru"
    Peru = 0xcd853f,

    //% block="pink"
    Pink = 0xffc0cb,

    //% block="plum"
    Plum = 0xdda0dd,

    //% block="powder blue"
    PowderBlue = 0xb0e0e6,

    //% block="purple"
    Purple = 0x800080,

    //% block="rebecca purple"
    RebeccaPurple = 0x663399,

    //% block="red"
    Red = 0xff0000,

    //% block="rosy brown"
    RosyBrown = 0xbc8f8f,

    //% block="royal blue"
    RoyalBlue = 0x4169e1,

    //% block="saddle brown"
    SaddleBrown = 0x8b4513,

    //% block="salmon"
    Salmon = 0xfa8072,

    //% block="sandy brown"
    SandyBrown = 0xf4a460,

    //% block="sea green"
    SeaGreen = 0x2e8b57,

    //% block="seashell"
    Seashell = 0xfff5ee,

    //% block="sienna"
    Sienna = 0xa0522d,

    //% block="silver"
    Silver = 0xc0c0c0,

    //% block="sky blue"
    SkyBlue = 0x87ceeb,

    //% block="slate blue"
    SlateBlue = 0x6a5acd,

    //% block="slate gray"
    SlateGray = 0x708090,

    //% block="snow"
    Snow = 0xfffafa,

    //% block="soft white"
    SoftWhite = 0x404040,

    //% block="spring green"
    SpringGreen = 0x00ff7f,

    //% block="steel blue"
    SteelBlue = 0x4682b4,

    //% block="tan"
    Tan = 0xd2b48c,

    //% block="teal"
    Teal = 0x008080,

    //% block="thistle"
    Thistle = 0xd8bfd8,

    //% block="tomato"
    Tomato = 0xff6347,

    //% block="turquoise"
    Turquoise = 0x40e0d0,

    //% block="violet"
    Violet = 0xee82ee,

    //% block="wheat"
    Wheat = 0xf5deb3,

    //% block="white"
    White = 0xffffff,

    //% block="whitesmoke"
    Whitesmoke = 0xf5f5f5,

    //% block="yellow"
    Yellow = 0xffff00,

    //% block="yellow green"
    YellowGreen = 0x9acd32,
}

