
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import PropTypes from 'prop-types';
import FormikTextField from '../../../common/components/FormikTextField'
import {
    Button,
    Grid,
    Slide,
    DialogContent,
    DialogTitle,
    Dialog
} from '@material-ui/core'

import { EDGESCHEMA } from "./ValidationModal";
import { CardinalitySelect } from "./CardinalitySelect";
import PropertyAdder from "./PropertyAdder";
import {ThemeProvider} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";


const schema = EDGESCHEMA;


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createMuiTheme({
    palette: {
        primary: { main: '#F24C4E'},
        secondary: { main: '#EAB126'}
    },
});

export function EdgeModal(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog fullWidth maxWidth={'md'} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} TransitionComponent={Transition}>
            <DialogTitle id="simple-dialog-title">Information edge {props.edgeInfo && props.edgeInfo.label}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{ nName: props.edgeInfo ? props.edgeInfo.label : "",
                        nDesc: props.edgeInfo ? props.edgeInfo.description : "",
                        cardMax: props.edgeInfo ? props.edgeInfo.cardinality.max : "",
                        cardMin: props.edgeInfo ? props.edgeInfo.cardinality.min : "",
                        nProps: props.edgeInfo ? props.edgeInfo.properties : []}}
                    validationSchema={schema}
                    validate={(values)=>{
                        if (props.typeModal === "create" && props.nameList.includes(values.nName))
                            return {nName: "Name already used"};
                        else if (props.typeModal === "edit"){
                            const oldName = props.edgeInfo ? props.edgeInfo.label : "";
                            if (oldName !== values.nName && props.nameList.includes(values.nName))
                                return {nName: "Name already used"};
                            else if (oldName === values.nName && props.nameList.filter(x => x === values.nName).length !== 1)
                                return {nName: "Name already used"};
                        }
                    }}
                    onSubmit={(data, { setSubmitting }) => {
                        console.log(props.typeModal);
                        setSubmitting(true);
                        props.callBack(data);
                        setSubmitting(false);
                        handleClose();
                    }}
                >
                    {({ values, isSubmitting, setFieldValue }) => (

                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div>Edge from {props.edgeInfo && props.edgeInfo.sourceLabel} to {props.edgeInfo && props.edgeInfo.targetLabel}</div>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormikTextField autoFocus id="outlined-basic" label="Node Name" name="nName" type="input" variant="outlined" required fullWidth/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField multiline rows={2} rowsMax={4} id="ig1" variant="outlined"
                                                         label="Node Description" name="nDesc" type="input" fullWidth/>
                                    </Grid>
                                    <Grid item container spacing={2}>
                                        <Grid item xs={3}>
                                            <CardinalitySelect type="minimum" labelId="demo-simple-select-label" name="cardMin"/>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CardinalitySelect type="maximum" labelId="demo-simple-select-label" name="cardMax"/>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FieldArray name="nProps">

                                            {arrayHelpers => (
                                                <>
                                                    <Button
                                                        onClick={() =>{
                                                            const newProp = {
                                                                name: "",
                                                                domain: "",
                                                                default: "",
                                                                required: false,
                                                                pk: false
                                                            };
                                                            arrayHelpers.push(newProp);
                                                        }}
                                                    >
                                                        Add props
                                                    </Button>
                                                    <Grid container spacing={1}>
                                                        {values.nProps.map((pro, index) => {
                                                            return(
                                                                <Grid container item key={pro.id}>
                                                                    <PropertyAdder setFieldValue={setFieldValue} property={pro}
                                                                                   index={index} deleteProp={()=> {
                                                                        arrayHelpers.remove(index);
                                                                    }}/>
                                                                </Grid>
                                                            )
                                                        })}
                                                    </Grid>

                                                </>
                                            )}
                                        </FieldArray>
                                    </Grid>

                                    <Grid item xs={12} container justify="right">
                                        <Button disabled={isSubmitting} type="submit" variant="primary">Save</Button>
                                        {props.typeModal === 'edit'&& <ThemeProvider theme={theme}>
                                            <Button variant="outlined" onClick={
                                                () => {
                                                    props.deleteElement(props.edgeInfo.id);
                                                    handleClose();
                                                }
                                            } color="primary" startIcon={<DeleteIcon />}> Delete </Button>
                                        </ThemeProvider>}
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </DialogContent>

        </Dialog>
    );
}

EdgeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
