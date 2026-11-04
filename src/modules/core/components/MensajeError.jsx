function MensajeError({ error }) {
    if (!error) {
        return null;
    }
    return <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>;
}

export default MensajeError;