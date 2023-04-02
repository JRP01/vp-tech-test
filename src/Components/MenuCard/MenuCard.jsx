import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const MenuCard = ({ title, img, text, href }) => {
  return (
    <Card href={href}>
      <Card.Img variant='top' src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant='primary' href={href}>
          View Our Products
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MenuCard;
