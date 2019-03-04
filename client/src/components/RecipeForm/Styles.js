import { deepOrange } from "@material-ui/core/colors";

export default function styles (){
    return({
        container: {
            position: "relative",
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: 20,
            padding: 20,
            margin: "10px 0px"
        },
        closeBtn: {
            position: "absolute",
            top: 0,
            right: 0,
            padding: 5,
            color: deepOrange[900],
            "&:hover": {
                color: "#fff",
                backgroundColor: deepOrange[600]
            }
        }
    });
}