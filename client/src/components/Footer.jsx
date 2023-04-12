
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-[#222] text-white">
            <Container>
                <Row>
                    <div className="flex items-center justify-center h-[8rem]">
                    <img className='h-10 w-auto mr-8' src='./img/logo.png'/>
                        Copyright &copy; 2023
                    </div>
                </Row>
                <Row>
                    <h5 className="text-center">Visit us:</h5>
                    <Col className="text-center py-4">
                        <i class="fa-brands fa-twitter footerIcons"></i>
                        <i class="fa-brands fa-instagram footerIcons"></i>
                        <i class="fa-brands fa-pinterest footerIcons"></i>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer