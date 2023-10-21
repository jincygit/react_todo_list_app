//---------------------------Navbar Component---------------
import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';


const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img 
            className={styles.navbarlogo}
            alt="todo logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxEXl-_nHt7tIwLnhxYJ6RSlPSeEY-uNfFbw&usqp=CAU"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
          <div className={styles.user}>
            <a href="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/186/186313.png"
                alt=""
                className={styles.userDp}
              />
            </a>
            <span>User</span>
          </div>
        

        <div className={styles.navLinks}>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
