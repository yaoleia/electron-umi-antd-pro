import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import React from 'react';
import numeral from 'numeral';
import { MiniArea } from '@/components/Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
const columns = [
  {
    title: 'Rank',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Search keyword',
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text) => <a href="/">{text}</a>,
  },
  {
    title: 'Users',
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
  },
  {
    title: 'Weekly Range',
    dataIndex: 'range',
    key: 'range',
    sorter: (a, b) => a.range - b.range,
    render: (text, record) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
];

const TopSearch = ({ loading, visitData2, searchData, dropdownGroup }) => (
  <Card
    loading={loading}
    bordered={false}
    title="Online Top Search"
    extra={dropdownGroup}
    style={{
      height: '100%',
    }}
  >
    <Row gutter={68} type="flex">
      <Col
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <NumberInfo
          subTitle={
            <span>
              search users
              <Tooltip title="introduce">
                <InfoCircleOutlined
                  style={{
                    marginLeft: 8,
                  }}
                />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
      <Col
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <NumberInfo
          subTitle={
            <span>
              Per Capita Search
              <Tooltip title="introduce">
                <InfoCircleOutlined
                  style={{
                    marginLeft: 8,
                  }}
                />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
    </Row>
    <Table
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: {
          marginBottom: 0,
        },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
