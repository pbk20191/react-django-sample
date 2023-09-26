import { type Ref, forwardRef } from "react"
import {
    useLink_unstable,
    useLinkState_unstable,
    type LinkProps as FluentLinkProps,
    useLinkStyles_unstable, type LinkSlots, assertSlots,
    type ForwardRefComponent,
    ComponentProps,
    Slot
} from "@fluentui/react-components"
import { Link as RemixLink, type LinkProps as RemixLinkProps } from "react-router-dom"

export type RouteLinkProps = Omit<Omit<FluentLinkProps, keyof ComponentProps<LinkSlots>> & ComponentProps<{root: Slot<'a'>}>, "as" | "href" > & RemixLinkProps

/**
 * A RouteLink is a reference to data that a user can follow by clicking or tapping it.
 * The public API for rendering a history-aware .
 */
const RouteLink: ForwardRefComponent<RouteLinkProps> = forwardRef((props: RouteLinkProps, ref: Ref<HTMLAnchorElement>) => {
    const state = useLink_unstable({ ...{ as: "a" }, ...props }, ref)
    useLinkStyles_unstable(state)
    useLinkState_unstable(state)
    if (state.root.as === "a") {
        state.root.as = undefined
    }
    assertSlots<LinkSlots>(state)
    // @ts-expect-error type fix
    return (<RemixLink {...props} {...state.root}/>)
})

RouteLink.displayName = "RouteLink"
export default RouteLink
