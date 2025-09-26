import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Typography, Form } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const TechnicalDemo = () => {
  const [technicalInfo, setTechnicalInfo] = useState<any[]>([]);

  const addTechnicalInfo = () => {
    setTechnicalInfo([...technicalInfo, { title: "", value: "" }]);
  };

  const removeTechnicalInfo = (index: number) => {
    setTechnicalInfo(technicalInfo.filter((_, i) => i !== index));
  };

  const updateTechnicalInfo = (index: number, field: string, value: any) => {
    const newTechnicalInfo = technicalInfo.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setTechnicalInfo(newTechnicalInfo);
  };

  return (
    <Card className="tw-p-6 tw-max-w-4xl tw-mx-auto tw-mt-8">
      <Title level={3} className="tw-text-center tw-mb-6">
        Demo Thông Tin Kỹ Thuật
      </Title>
      
      <div className="tw-space-y-4">
        {technicalInfo.length === 0 ? (
          <div className="tw-text-center tw-py-8 tw-text-gray-500">
            <Text>Chưa có thông tin kỹ thuật nào. Hãy thêm thông tin kỹ thuật cho garage.</Text>
          </div>
        ) : (
          technicalInfo.map((item, index) => (
          <Card key={index} size="small" className="tw-bg-gray-50">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12}>
                <Text strong className="tw-block tw-mb-2">Tiêu đề:</Text>
                <Input
                  value={item.title}
                  onChange={(e) => updateTechnicalInfo(index, 'title', e.target.value)}
                  placeholder="Số cầu nâng"
                />
              </Col>
              <Col xs={12} sm={8}>
                <Text strong className="tw-block tw-mb-2">Giá trị:</Text>
                <Input
                  value={item.value}
                  onChange={(e) => updateTechnicalInfo(index, 'value', e.target.value)}
                  placeholder="5"
                />
              </Col>
              <Col xs={12} sm={4} className="tw-text-right">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeTechnicalInfo(index)}
                  disabled={technicalInfo.length <= 1}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
          </Card>
          ))
        )}
        
        <Button
          type="dashed"
          onClick={addTechnicalInfo}
          icon={<PlusOutlined />}
          className="tw-w-full"
        >
          Thêm thông tin kỹ thuật
        </Button>
        
        <Card className="tw-bg-blue-50 tw-mt-4">
          <Title level={4} className="tw-mb-2">JSON Output:</Title>
          <pre className="tw-bg-white tw-p-4 tw-rounded tw-overflow-auto">
            {JSON.stringify(technicalInfo, null, 2)}
          </pre>
        </Card>
      </div>
    </Card>
  );
};
