import {createMuiTheme} from '@material-ui/core/styles'
import deepmerge from 'deepmerge'

const secondaryFontFamily = "adobe-garamond-pro, 'Times New Roman'"

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
    fontSize: 16,
    fontFamily: "Poppins, Arial, sans-serif",
    h4: {
      fontWeight: "bolder"
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
      color: "#00000080"
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
        borderRadius: 24
      },
      containedPrimary: {
        boxShadow: "none"
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
  TextField: {
    color: "#fff"
  },
  typography: {

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
    MuiBottomNavigation: {
      root: {
        backgroundColor: "#333333"
      }
    },
    MuiBottomNavigationAction: {
      root: {
        '&$selected': {
          color: base.palette.secondary.main
        }
      }
    },
    MuiSwitch: {
      colorPrimary: {
        '&$checked': {
          color: base.palette.secondary.main,
          '& + $bar': {
            backgroundColor: base.palette.secondary.main
          }
        }
      }
    }
  }

}

export const light = createMuiTheme({...base})
export const dark = createMuiTheme(deepmerge(base, darkTheme))

