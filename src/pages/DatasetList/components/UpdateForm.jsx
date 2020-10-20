import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Input, Modal, Steps, Upload, message } from 'antd';
import { InboxOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Card } from './Card';

const { Dragger } = Upload;
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = (props) => {
  const [formVals, setFormVals] = useState(props.values);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const Container = ({ onChange, value }) => {
    const [cards, setCards] = useState(value.map((val, id) => ({ id, val })));
    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        );
      },
      [cards],
    );

    useEffect(() => {
      onChange(cards.map((card) => card.val));
    }, [cards]);

    const inputChange = (val, id) => {
      setCards((prevCards) => {
        const cloneCards = [...prevCards];
        const index = cloneCards.findIndex((card) => card.id === id);
        cloneCards.splice(index, 1, { id, val });
        return cloneCards;
      });
    };
    const onDelete = (id) => {
      setCards((prevCards) => {
        const cloneCards = [...prevCards];
        const index = cloneCards.findIndex((card) => card.id === id);
        cloneCards.splice(index, 1);
        return cloneCards;
      });
    };

    const addLabel = () => {
      setCards((prevCards) => {
        let id = 0;
        while (prevCards.find((card) => card.id === id)) {
          id += 1;
        }
        return [...prevCards, { id, val: '' }];
      });
    };

    const renderCard = (card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.val}
          moveCard={moveCard}
          onChange={inputChange}
          onDelete={onDelete}
        />
      );
    };
    return (
      <>
        <Button type="text" shape="circle" onClick={addLabel} icon={<PlusCircleOutlined />} />
        <DndProvider backend={HTML5Backend}>
          {cards.map((card, i) => renderCard(card, i))}
        </DndProvider>
      </>
    );
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <FormItem name="labels" label="标签列表">
          <Container />
        </FormItem>
      );
    }

    if (currentStep === 2) {
      return (
        <Dragger
          {...{
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
              const { status } = info.file;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击/拖拽到该区域内上传</p>
          <p className="ant-upload-hint">支持单张或批量上传</p>
        </Dragger>
      );
    }

    return (
      <>
        <FormItem
          name="name"
          label="数据集名称"
          rules={[
            {
              required: true,
              message: '请输入数据集名称！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="desc" label="描述">
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="数据集配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps
        style={{
          marginBottom: 28,
        }}
        size="small"
        current={currentStep}
      >
        <Step title="基本信息" />
        <Step title="标签列表" />
        <Step title="数据上传" />
      </Steps>
      <Form {...formLayout} form={form} initialValues={formVals}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
