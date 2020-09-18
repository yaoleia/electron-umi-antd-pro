import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { findRoute } from '../router';
import styles from './Home.css';

export default function Home(): JSX.Element {
  const counter = findRoute('counter');
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Button type="text" danger>
        Button
      </Button>
      <Link to={(counter && counter.path) || '/counter'}>to Counter</Link>
    </div>
  );
}
