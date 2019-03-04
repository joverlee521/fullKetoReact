import { createMuiTheme } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

export default function CustomTheme(){ 
    return createMuiTheme({
    palette: {
        primary: {
            main: deepOrange[600],
            dark: deepOrange[900]
        }
    },
    typography: { useNextVariants: true },
    overrides: {
        MuiGrid: {
            container: {
                flex: "2 0 auto",
                padding: 10,
                "@media (min-width: 600px)": {
                    padding: "10px 30px"
                },
                "@media (min-width: 960px)": {
                    padding: "10px 60px"
                }
            },
            item: {
                padding: 10
            }
        },
        MuiFormControl: {
            root: {
                boxSizing: "border-box",
                
            }
        },
        MuiInputBase: {
            fullWidth: {
                boxSizing: "border-box"
            }
        },
        MuiButton: {
            contained: {
                margin: "10px 0px"
            }
        }
    }
})};