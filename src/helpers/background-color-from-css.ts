export const backgroundColorFromCss = (element: HTMLElement): string | undefined => {
    
    if(element.tagName === 'BODY'){
        return 'rgba(0, 0, 0, 0)'
    }

    const styles = getComputedStyle(element)
    const color = styles.backgroundColor;
    
    // if element does not have backgroundColor throught css move up in tree
    if(color === '' || color === 'rgba(0, 0, 0, 0)' || color === 'transparent'){
        return backgroundColorFromCss(element.parentElement)
    } else {
        return color
    }
}