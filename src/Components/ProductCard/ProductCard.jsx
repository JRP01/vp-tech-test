import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProductCard.css'
const ProductCard = ({ name, img, price, href }) => {
  return (
    <Card href={href}>
      <Card.Img variant='top' src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{`£${price}`}</Card.Text>
        <Button variant='primary' href={`https://www.victorianplumbing.co.uk/${href}`} target="_blank">
          View Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;