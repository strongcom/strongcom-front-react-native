export const viewHeightCalc = (px,{height = 760}) =>{
    return `${(px * 100) / height}vh`;
}

export const viewWidthCalc = (px,{width = 360}) =>{
    return `${(px * 100) / width}vw`;
}