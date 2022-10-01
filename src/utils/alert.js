import React from "react";
import { Alert } from 'react-bootstrap'

const AlertContainer = (props) => {
    const { alertMsg, alertVariant, handleAlertClose } = props;
    return (
        <Alert variant={alertVariant} onClose={() => handleAlertClose()} dismissible>
            {alertMsg}
        </Alert>
    )
}

export default AlertContainer;
