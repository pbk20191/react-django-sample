import {
    type BrandVariants,
    createDarkTheme,
    createLightTheme,
    type Theme
} from "@fluentui/react-components"
import { useEffect, useState } from "react"

const atarasiibarami: BrandVariants = Object.freeze({
    10: "#030403",
    20: "#151A17",
    30: "#212C25",
    40: "#29392F",
    50: "#324639",
    60: "#3B5444",
    70: "#44624F",
    80: "#4D705A",
    90: "#577F66",
    100: "#608E71",
    110: "#6A9E7D",
    120: "#74AD8A",
    130: "#7EBD96",
    140: "#97CAAA",
    150: "#B0D7BD",
    160: "#C9E3D2"
})

export const lightTheme: Readonly<Theme> = (() => {
    const theme = createLightTheme(atarasiibarami)
    theme.fontFamilyBase = "'Nanum Gothic', " + theme.fontFamilyBase
    return Object.freeze(theme)
})()

export const darkTheme: Readonly<Theme> = (() => {
    const theme = createDarkTheme(atarasiibarami)
    theme.colorBrandForeground1 = atarasiibarami[110]
    theme.colorBrandForeground2 = atarasiibarami[120]
    theme.fontFamilyBase = "'Nanum Gothic', " + theme.fontFamilyBase
    return Object.freeze(theme)
})()

/**
 * use Theme that react to the colorScheme of Environment
 * @returns {Theme} current appropriate theme
*/
export function useSystemTheme(): Readonly<Theme> {
    const [theme, setTheme] = useState(lightTheme)
    useEffect(() => {
        const darkModeQuery = "(prefers-color-scheme: dark)"
        const lightModeQuery = "(prefers-color-scheme: light)"
        const darkThemeMq = window.matchMedia(darkModeQuery)
        const lightThemeMq = window.matchMedia(lightModeQuery)
        const listener: (event: MediaQueryListEvent) => void = (event) => {
            switch (event.media) {
                case darkModeQuery:
                    setTheme(event.matches ? darkTheme : lightTheme)
                    break
                case lightModeQuery:
                    setTheme(event.matches ? lightTheme : darkTheme)
                    break
                default:
                    break
            }
        }
        if (darkThemeMq.matches) {
            setTheme(darkTheme)
        }
        darkThemeMq.addEventListener("change", listener)
        lightThemeMq.addEventListener("change", listener)
        return () => {
            darkThemeMq.removeEventListener("change", listener)
            lightThemeMq.removeEventListener("change", listener)
        }
    }, [setTheme])
    return theme
}
