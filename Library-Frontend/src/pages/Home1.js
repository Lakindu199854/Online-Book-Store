// import { getBooks,getBookById } from "./services/userServices";
// import { useEffect,useState } from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col"
// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Card from 'react-bootstrap/Card';
// import { Link } from 'react-router-dom';
// const Home=()=>{

//     const [books, setBooks] = useState(null);
//     const [bookDetail, setbookDetail] = useState(null);


//     const getBookDetails = async (id) => {
//         const res = await getBookById(id);
//         console.log("res:" + res);
//         await setbookDetail(res);
//       };

//     const bookRequest = async () => {
//         const res = await getBooks();
//         console.log("res:" + res);
//         await setBooks(res);
//       };


//     useEffect(()=>{
//         bookRequest();
//     },[])

//     return(
//         <div>
//         <Row>
//             <Col lg={6}>
//                <ListGroup>
//                     {books && books.map((book)=>(
//                     <ListGroup.Item>
//                         <Row>
//                             <Col> {book.name}</Col>
//                             <Col lg={6} className="text-end"> 
//                                 <Button variant="primary" onClick={()=>{
//                                     getBookDetails(book.id);
//                                 }}
//                                 >Details</Button>
//                             </Col>
//                         </Row>
//                     </ListGroup.Item>
//                     ))}
//                </ListGroup>
//             </Col>
            
//             <Col>
//              <h1>Book Details</h1>
//                 <ListGroup>
//                     <ListGroup.Item>
//                         {bookDetail &&(
//                             <div>
//                                 <div><h5>Name:</h5>{bookDetail.name}</div>
//                                 <div><h5>Author:</h5>{bookDetail.author}</div>
//                                 <div><h5>Price:</h5>{bookDetail.price}</div>
//                                 <div><h5>Detail:</h5>{bookDetail.imgLink}</div>
                                
                                
//                                 <Card style={{ width: '18rem' }}>
//                                 <Card.Img variant="top" src={bookDetail.imgLink}/>
//                                     <Card.Body>
//                                         <Card.Title>Description</Card.Title>
//                                         <Card.Text>
//                                         <p>{bookDetail.description}</p>    
//                                         </Card.Text>
//                                         <Link to={`/book/${bookDetail.id}`}>
//                                             <Button variant="primary">View Book</Button>
//                                         </Link>
                                        
//                                     </Card.Body>
//                                 </Card>                               
//                             </div>
//                         )}
//                     </ListGroup.Item>
               
//                </ListGroup>
//             </Col>
            

//         </Row>


//         </div>

     




//     );
// }
// export default Home