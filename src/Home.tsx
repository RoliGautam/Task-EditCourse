import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Link to="/edit-course" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Go to Edit Course
        </Button>
      </Link>
    </div>
  );
};

export default Home;
