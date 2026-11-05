import styles from './Boton.module.css';

function Boton({ children, variante = 'primario', ...props }) {
    const clases = variante === 'secundario' ? `${styles.boton} ${styles.secundario}` : styles.boton;
    return (
        <button className={clases} {...props}>
            {children}
        </button>
    );
}

export default Boton;