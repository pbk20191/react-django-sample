import { FluentProvider } from "@fluentui/react-components"
import { useSystemTheme } from "./components/theme"
import { ProvideToast } from "./components/toastCenter"
import routes from "./routes"
import { RouterProvider } from "react-router"


function App() {
  const theme = useSystemTheme()

  return (
    <>
      <FluentProvider theme={theme}>
        <ProvideToast>
          <RouterProvider router={routes}/>
        </ProvideToast>
      </FluentProvider>
    </>
  )
}

export default App
