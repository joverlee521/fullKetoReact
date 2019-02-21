import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Paper, Grid, Icon, IconButton, Button, Typography, withStyles } from "@material-ui/core";

const styles = {
    backdrop: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    modalContent: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        height: "25%",
        padding: "15px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignContent: "center",
        "&:focus": {
            outline: "none"
        }
    },
    closeButton: { 
        fontSize: "0.8em",
        position: "absolute",
        top: 0,
        right: 0,
        "&:hover": {
            backgroundColor: "inherit"
        }
    }
};

class ErrorModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount(){
        this.setState({ open: this.props.open });
    }

    componentDidUpdate(prevProps){
        if(prevProps.open !== this.props.open){
            this.setState({ open: this.props.open });
        }
    }

    closeModal = () =>{
        this.setState({ open: false });
    }

    render(){
        const { classes, message } = this.props;
        return(
            <Modal open={ this.state.open } onClose={ this.closeModal } BackdropProps={{ className: classes.backdrop }}>
                <Paper className={ classes.modalContent }>
                    <Grid container item justify="center">
                        <Typography variant="h5" gutterBottom>Error</Typography>
                        <IconButton onClick={ this.closeModal } className={ classes.closeButton }>
                            <Icon>clear</Icon>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">{ message }</Typography>
                    </Grid> 
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={ this.closeModal }>Close</Button>
                    </Grid>
                </Paper>
            </Modal>
        )
    }
}

ErrorModal.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ErrorModal);