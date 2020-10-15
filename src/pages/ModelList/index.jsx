import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';

const { Paragraph } = Typography;

class ModelList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'modelList/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      modelList: { list },
      loading,
    } = this.props;
    const types = {
      defect: '缺陷检测',
      position: '目标检测',
      classification: '分类',
      ocr: '字符识别',
      keypoint: '关键点检测',
    };
    const content = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            模型接口文档
          </a>
        </div>
      </div>
    );
    const nullData = {};
    return (
      <PageContainer content={content}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={[nullData, ...list]}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[
                        <a key="info">查看信息</a>,
                        <a key="preview">预览</a>,
                        <a key="remove">删除</a>,
                      ]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={
                          <>
                            <a>{item.title}</a> -{' '}
                            <i>{types[item.projectType] || item.projectType}</i>
                          </>
                        }
                        description={
                          <Paragraph
                            className={styles.item}
                            ellipsis={{
                              rows: 3,
                            }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }

              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> 上传模型
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageContainer>
    );
  }
}

export default connect(({ modelList, loading }) => ({
  modelList,
  loading: loading.models.modelList,
}))(ModelList);
