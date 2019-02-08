import {createMuiTheme} from '@material-ui/core/styles'
import deepmerge from 'deepmerge'

const defaultTheme = createMuiTheme({typography: {useNextVariants: true}})


const primaryFontFamily = {fontFamily: "Poppins, Arial, sans-serif"}

const secondaryFontFamily = {fontFamily: "adobe-garamond-pro, 'Times New Roman'"}


const base = {
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

    h1: {
      fontFamily: primaryFontFamily
    },
    h2: {
      fontFamily: primaryFontFamily
    },
    h3: {
      fontFamily: primaryFontFamily
    },
    button: {
      fontFamily: primaryFontFamily
    },
    h4: {
      fontFamily: secondaryFontFamily
    },
    h5: {
      fontFamily: secondaryFontFamily
    },
    h6: {
      fontFamily: secondaryFontFamily
    },
    subtitle1: {
      fontFamily: secondaryFontFamily
    },
    subtitle2: {
      color: "#000000C0"
    },
    body1: {
      fontFamily: secondaryFontFamily
    },
    caption: {
      fontFamily: secondaryFontFamily,
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
}


const darkTheme = {
  palette: {
    type: "dark"
  },
  /*List:{
    ListItem: {
      color: "#fff"
    }
  },*/
  TextField: {
    color: "#fff"
  },
  typography: {
    useNextVariants: true,

    h1: {
      color: "#fff"
    },
    h2: {
      color: "#fff"
    },
    h3: {
      color: "#fff"
    },
    button: {
      color: "#fff"
    },
    h4: {
      color: "#fff"
    },
    h5: {
      color: "#fff"
    },
    h6: {
      color: "#fff"
    },
    subtitle1: {
      color: "#fff"
    },
    body1: {
      color: "#fff"
    },
    body2: {
      color: "#fff"
    },
    caption: {
      color: "#fff"
    },
    subtitle2: {
      color: "#ffffffC0"
    }
  },
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: "transparent"
      }
    },
    MuiFormControl:{
      root:{
        backgroundColor: "#f2f9f8"
      }
    },
    MuiSwitch: {
      colorPrimary: {
        '&$checked': {
          color: "#51c1b7",
          '& + $bar': {
            backgroundColor: "#51c1b7"
          }
        }
      }
    }
  }

}

export const light = createMuiTheme({...base})
export const dark = createMuiTheme(deepmerge(base, darkTheme))

