import { FluentProvider } from "@fluentui/react-components"
import { useSystemTheme } from "./components/theme"
import { ProvideToast } from "./components/toastCenter"
import routes from "./routes"
import { RouterProvider } from "react-router"
import './utils/csrf_fetch'


const App: React.FC = () => {
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
App.displayName = "App"

export default App
