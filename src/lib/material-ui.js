import {createMuiTheme} from '@material-ui/core/styles'

const defaultTheme = createMuiTheme({typography: {useNextVariants: true}})

const primaryFont = {
  fontFamily: "Poppins, Arial, sans-serif",
  color: "#000"
}
const secondaryFont = {
  fontFamily: "adobe-garamond-pro, 'Times New Roman'",
  color: "#000"
}

export default createMuiTheme({
  palette: {
    primary: {
      dark: "#02405a",
      main: "#6d8c9b",
      light: "#ced9de"
    },
    secondary: {
      dark: "#51c1b7",
      main: "#98dad4",
      light: "#f2f9f8",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true,

    h1: primaryFont,
    h2: primaryFont,
    h3: primaryFont,
    button: primaryFont,

    h4: secondaryFont,
    h5: secondaryFont,
    h6: secondaryFont,
    subtitle1: secondaryFont,
    body1: secondaryFont,
    caption: {
      ...secondaryFont,
      fontStyle: "italic"
    }
  },
  overrides: {
    MuiCard: {
      root: {
        boxShadow: "none"
      }
    },
    MuiButton: {
      sizeLarge: {
        padding: '8px 24px',
        fontSize: defaultTheme.typography.pxToRem(20),
        borderRadius: 24
      },
      containedSecondary: {
        boxShadow: "none"
      }
    }
  }
})