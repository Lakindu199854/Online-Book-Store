import { getBooks, getBookById } from "./services/bookServices";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";

import '../App.scss';



const Home2 = () => {
  const [books, setBooks] = useState(null);
  const [bookDetail, setbookDetail] = useState(null);

  const getBookDetails = async (id) => {
    const res = await getBookById(id);
    console.log("res:" + res);
    await setbookDetail(res);
  };

  const bookRequest = async () => {
    const res = await getBooks();
    console.log("res:" + res);
    await setBooks(res);
  };

  useEffect(() => {
    bookRequest();
  }, []);

  return (
    <div className="Home2">
      {books &&
        <Container className="container"> {/* Use the fluid prop to create a full-width container */}
          <Row xs={1} md={3} className="g-4">
            {books.map((book, idx) => (
              <Col key={idx} className="d-flex justify-content-start">
                <Card>
                <Link to={`/book/${book.id}`}> 
                    <Card.Img variant="top" src={book.imgLink} className="card-image" />
                    <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Subtitle>Author:{book.author}</Card.Subtitle>
                    <Card.Subtitle>Price:{book.price}</Card.Subtitle>
                    <Card.Text>
                      {book.description}
                    </Card.Text>
                  </Card.Body>
                </Link> 
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      }
    </div>
  );
}

export default Home2;