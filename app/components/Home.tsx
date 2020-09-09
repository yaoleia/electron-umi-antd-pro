import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Button type="text" danger>
        Button
      </Button>
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
