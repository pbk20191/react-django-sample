import { useId, useToastController, Toaster } from "@fluentui/react-components"
import React, { createContext, useContext, type PropsWithChildren } from "react"

const defaultToastController = {
    dismissAllToasts: function (): void {
        throw new Error("dismissAllToasts not implemented.")
    },
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    playToast: function (_toastId: string): void {
        throw new Error("playToast not implemented.")
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dismissToast: function (_toastId: string): void {
        throw new Error("dismissToast not implemented.")
    },
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pauseToast: function (_toastId: string): void {
        throw new Error("pauseToast not implemented.")
    },
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatchToast: function (_content: React.ReactNode, _options?: never): void {
        throw new Error("dispatchToast not implemented.")
    },
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateToast: function (_options: never): void {
        throw new Error("updateToast not implemented.")
    }
}

const ToastContext = createContext(defaultToastController)

/**
 * provide ToastController and Toaster to the child context
*/
export const ProvideToast: React.FC<PropsWithChildren> = (props) => {
    const toasterId = useId("toaster")
    const controller = useToastController(toasterId)
    return (
        <ToastContext.Provider value={controller}>
            <Toaster toasterId={toasterId}/>
            {props.children}
        </ToastContext.Provider>
    )
}

/**
 * fetch the ToastController from the current context
*/
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useToastCenter = () => {
    const realObject = useContext(ToastContext)
    const controller = useToastController(undefined)
    type ControllerType = typeof controller
    return realObject as ControllerType
}
