import {createMuiTheme} from '@material-ui/core/styles'
import deepmerge from 'deepmerge'


// Styling of Material-UI happens in this file


const secondaryFontFamily = "adobe-garamond-pro, 'Times New Roman'"

export const colors = {
  red: "#A8112B",
  yellow: "#FFCE00",
  blue: "#00A9E7",
  green: "#51c1b7",
  light: "#eee",
  dark: "#000"

}


// Light theme
const base = {
  props: {
    MuiTooltip: {
      enterTouchDelay: 0
    }
  },
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
    fontSize: 18,
    fontFamily: "Poppins, Arial, sans-serif",
    h4: {
      fontWeight: "bolder"
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
    /*
     * MuiCard: {
     *   root: {
     *     boxShadow: "none"
     *   }
     * },
     */
    MuiButton: {
      root: {
        padding: '8px 20px',
        borderRadius: 32
      },
      sizeLarge: {
        padding: '16px 20px',
        borderRadius: 40,
        fontSize: 23
      },
      sizeSmall: {
        padding: '4px 12px',
        borderRadius: 30,
        fontSize: 16
      },
      containedPrimary: {
        boxShadow: "none"
      },
      containedSecondary: {
        boxShadow: "none"
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: 32
      }
    },
    MuiInput: {
      root: {
        padding: 8
      }
    },
    MuiSwitch: {
      root: {width: 68},
      icon: {
        width: 24,
        height: 24
      }
    },
    MuiBottomNavigation: {
      root: {
        height: 72
      }
    },
    MuiBottomNavigationAction: {
      root: {
        padding: 0
      },
      label: {
        fontSize: 12,
        '&$selected': {
          fontSize: 12
        }
      }
    },
    MuiFormControl: {
      root: {
        width: "100%"
      }
    },
    MuiFormLabel: {
      root: {
        padding: 8
      }
    },
    MuiInputLabel: {
      root: {
        cursor: "pointer"
      }
    }
  }
}


// Dark theme
const darkTheme = {
  palette: {
    type: "dark",
    primary: {
      dark: "#51c1b7",
      main: "#98dad4",
      light: "#f2f9f8"
    },
    secondary: {
      dark: "#02405a",
      main: "#6d8c9b",
      light: "#ced9de",
      contrastText: "#fff"
    }
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
    /*
     * MuiCard: {
     *   root: {
     *     backgroundColor: "transparent"
     *   }
     * },
     */
    MuiFormControl:{
      root:{
        backgroundColor: "#333",
        color: "#000"
      }
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: "#333333"
      }
    },
    MuiAvatar: {
      colorDefault: {
        color: "#fff"
      }
    }
  }

}


export const light = createMuiTheme({...base})
export const dark = createMuiTheme(deepmerge(base, darkTheme))

