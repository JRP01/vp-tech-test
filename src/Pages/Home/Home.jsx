import MenuCard from '../../Components/MenuCard/MenuCard';
import toilet from '../../Assets/Images/toilet.jpg';
import bath from '../../Assets/Images/bath.jpg';
import './Home.css'

const Home = () => {
  const menuCardArray = [
    {
      title: 'Toilets',
      img: toilet,
      text: 'View our wide selection of toilets',
      href: '/toilets',
    },
    {
      title: 'Baths',
      img: bath,
      text: 'View our wide selection of baths',
      href: '/baths',
    },
  ];
  return (
    <div className='home-card-container'>
      {menuCardArray.map((menuCard, index) => (
        <MenuCard
          key={index}
          title={menuCard.title}
          img={menuCard.img}
          text={menuCard.text}
          href={menuCard.href}
        />
      ))}
    </div>
  );
};

export default Home;
