import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Typography, Form } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const PricingDemo = () => {
  const [pricing, setPricing] = useState<any[]>([]);

  const addPricing = () => {
    setPricing([...pricing, { eta: "", service: "", price_vnd: "" }]);
  };

  const removePricing = (index: number) => {
    setPricing(pricing.filter((_, i) => i !== index));
  };

  const updatePricing = (index: number, field: string, value: any) => {
    const newPricing = pricing.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setPricing(newPricing);
  };

  return (
    <Card className="tw-p-6 tw-max-w-4xl tw-mx-auto tw-mt-8">
      <Title level={3} className="tw-text-center tw-mb-6">
        Demo Bảng Giá Dịch Vụ
      </Title>
      
      <div className="tw-space-y-4">
        {pricing.length === 0 ? (
          <div className="tw-text-center tw-py-8 tw-text-gray-500">
            <Text>Chưa có bảng giá nào. Hãy thêm bảng giá cho garage.</Text>
          </div>
        ) : (
          pricing.map((item, index) => (
          <Card key={index} size="small" className="tw-bg-gray-50">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={8}>
                <Text strong className="tw-block tw-mb-2">Dịch vụ:</Text>
                <Input
                  value={item.service}
                  onChange={(e) => updatePricing(index, 'service', e.target.value)}
                  placeholder="Bảo dưỡng định kỳ"
                />
              </Col>
              <Col xs={12} sm={4}>
                <Text strong className="tw-block tw-mb-2">Thời gian:</Text>
                <Input
                  value={item.eta}
                  onChange={(e) => updatePricing(index, 'eta', e.target.value)}
                  placeholder="2-3 giờ"
                />
              </Col>
              <Col xs={12} sm={4}>
                <Text strong className="tw-block tw-mb-2">Giá (VND):</Text>
                <Input
                  value={item.price_vnd}
                  onChange={(e) => updatePricing(index, 'price_vnd', e.target.value)}
                  placeholder="700.000 – 1.800.000"
                />
              </Col>
              <Col xs={24} sm={8} className="tw-text-right">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removePricing(index)}
                  disabled={pricing.length <= 1}
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
          onClick={addPricing}
          icon={<PlusOutlined />}
          className="tw-w-full"
        >
          Thêm bảng giá
        </Button>
        
        <Card className="tw-bg-blue-50 tw-mt-4">
          <Title level={4} className="tw-mb-2">JSON Output:</Title>
          <pre className="tw-bg-white tw-p-4 tw-rounded tw-overflow-auto">
            {JSON.stringify(pricing, null, 2)}
          </pre>
        </Card>
      </div>
    </Card>
  );
};
