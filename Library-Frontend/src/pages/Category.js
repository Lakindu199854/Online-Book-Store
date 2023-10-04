import {getAllCategories,getBookByCategoryId} from "./services/bookServices";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
import './css/category.css';


const Category = () => {
    

    const [categories, setCategories] = useState([]);

    const categoryRequest = async () => {
    try{
        const res = await getAllCategories();
        console.log("res:" + res);
        setCategories(res);
    }catch(error){
        console.log(error);
    }

    };

    useEffect(() => {
      
      categoryRequest();
    }, []);



   return (
    <div className="Category">
    
      {categories &&
        <Container> {/* Use the fluid prop to create a full-width container */}
          <Row xs={1} md={3} className="g-4">
            {categories.map((category, id) => (
              <Col key={id} className="d-flex justify-content-start">
                <Card>
                     <Link to={`/booksByCategory/${category.id}`}>  
                        <Card.Img variant="top" src={category.imgLink} className="card-image" />
                        <Card.Body>
                            <Card.Title>{category.name}</Card.Title>
                            <Card.Text>
                            {category.description}
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
export default Category

//to={`/book/${book.id}`}