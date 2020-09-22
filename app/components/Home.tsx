import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { findRoute } from '../router';
import '../style/home.global.scss';

function ProjectItem(props: any) {
  const { project } = props;
  return (
    <Card
      title={<img src="file:///Users/admin/Desktop/111.jpg" alt="" />}
      bordered={false}
    >
      <p>{project.type}</p>
      <p>{project.title}</p>
      <p>{project.description}</p>
      <p>{project.user}</p>
      <p>{project.creat}</p>
    </Card>
  );
}

export default function Home(): JSX.Element {
  const projectData = [
    {
      type: 'a',
      title: '缺陷检测',
      id: 1,
      description: 'aaa',
      user: 'wade',
      creat: '2020-7-4',
    },
    {
      type: 'b',
      title: '目标检测',
      id: 2,
      description: 'aaa',
      user: 'wade',
      creat: '2020-7-4',
    },
  ];

  const counter = findRoute('counter');
  return (
    <div className="home-container" data-tid="container">
      {projectData.map((project) => (
        <ProjectItem project={project} key={project.id} />
      ))}
      <h2>Home</h2>
      <Button type="text" danger>
        Button
      </Button>
      <Link to={(counter && counter.path) || '/counter'}>to Counter</Link>
    </div>
  );
}
