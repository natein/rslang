import { makeStyles, Step, StepLabel, Stepper } from "@material-ui/core";

const styles = makeStyles({
    root: {
        backgroundColor: 'transparent'
    },
    step: {
        '& .MuiStepIcon-root': {
            color: 'white'
        },
        '& .MuiStepIcon-completed': {
            color: '#66b050',
        }
    }
});
const ProgressBar = ({ currentStep }) => {
    const classes = styles();

    return (
        <Stepper activeStep={currentStep} className={classes.root}>
            <Step key={0} completed={currentStep >= 1} className={classes.step}>
                <StepLabel></StepLabel>
            </Step>
            <Step key={1} completed={currentStep >= 2} className={classes.step}>
                <StepLabel></StepLabel>
            </Step>
            <Step key={2} completed={currentStep >= 3} className={classes.step}>
                <StepLabel></StepLabel>
            </Step>
        </Stepper>
    );
};

export default ProgressBar;