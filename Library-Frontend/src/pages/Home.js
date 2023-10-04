
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";

import '../App.scss';
import { getBooks } from "./services/bookServices";




const Home = () => {
  const [books, setBooks] = useState(null);
  

 
  useEffect(() => {
    const getAllBooks = async () => {
      const res = await getBooks("/books");
      setBooks(res);
      console.log("res is :"+res)
    };
    getAllBooks(); 
  }, []);

  return (
    <div className="Home">
      {books &&
        <Container className="Container1"> {/* Use the fluid prop to create a full-width container */}
          <Row xs={1} md={3} className="g-4">
            {books.map((book, idx) => (
              <Col key={idx} className="d-flex justify-content-start">
                <Card >
                <Link to={`/book/${book.id}`}> 
                    <Card.Img variant="top" src={book.imgLink} className="card-image" />
                    <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <br />
                    <Card.Subtitle>Author:{book.author}</Card.Subtitle> <br />
                    <Card.Subtitle>Price:${book.price}</Card.Subtitle> <br />
                    <Card.Subtitle>Category:{book.category.name}</Card.Subtitle> <br />
                    
                    <Card.Text className="text">
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

export default Home