import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const Payment = () => {

    const stripePromise = loadStripe('pk_test_51JvymQGX5222cYtgXTpAOCzEU7fGsZtl4NVPk2eJLhgOnjNeqenxtbHF5KGD2JWjutsNNcWQbimNqTzZfWHtZ4oD0067ZJHG9d')

    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId])

    return (
        <div>
            <h2>Please Pay for : {appointment.patientName} for {appointment.serviceName}</h2>
            <h4>Pay : ${appointment.price}</h4>
            {appointment?.price &&
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        appointment={appointment}
                    />
                </Elements>
            }
        </div>
    );
};

export default Payment;