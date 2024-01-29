import AppBar from "@mui/material/AppBar"

const Header = () => {
    return (
        <>
            <AppBar
            position="static"
                sx={{
                    padding: "20px",
                    fontSize: "40px",
                    textAlign: "center"
                }}
            >Simulador de Ponto Eletrônico</AppBar>
        </>
    )
}

export default Header;