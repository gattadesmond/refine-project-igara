import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Typography, Form } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const FAQDemo = () => {
  const [faq, setFaq] = useState<any[]>([]);

  const addFAQ = () => {
    setFaq([...faq, { q: "", a: "" }]);
  };

  const removeFAQ = (index: number) => {
    setFaq(faq.filter((_, i) => i !== index));
  };

  const updateFAQ = (index: number, field: string, value: any) => {
    const newFAQ = faq.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFaq(newFAQ);
  };

  return (
    <Card className="tw-p-6 tw-max-w-4xl tw-mx-auto tw-mt-8">
      <Title level={3} className="tw-text-center tw-mb-6">
        Demo Câu Hỏi Thường Gặp (FAQ)
      </Title>
      
      <div className="tw-space-y-4">
        {faq.length === 0 ? (
          <div className="tw-text-center tw-py-8 tw-text-gray-500">
            <Text>Chưa có câu hỏi thường gặp nào. Hãy thêm FAQ cho garage.</Text>
          </div>
        ) : (
          faq.map((item, index) => (
          <Card key={index} size="small" className="tw-bg-gray-50">
            <Row gutter={[16, 16]} align="top">
              <Col xs={24} sm={12}>
                <Text strong className="tw-block tw-mb-2">Câu hỏi:</Text>
                <Input
                  value={item.q}
                  onChange={(e) => updateFAQ(index, 'q', e.target.value)}
                  placeholder="AutosOnly có nhận sửa xe nhập khẩu không?"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Text strong className="tw-block tw-mb-2">Câu trả lời:</Text>
                <TextArea
                  value={item.a}
                  onChange={(e) => updateFAQ(index, 'a', e.target.value)}
                  placeholder="Có, chúng tôi sửa tất cả dòng xe nhập khẩu với thiết bị chẩn đoán hiện đại."
                  rows={3}
                />
              </Col>
              <Col xs={24} className="tw-text-right">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeFAQ(index)}
                  disabled={faq.length <= 1}
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
          onClick={addFAQ}
          icon={<PlusOutlined />}
          className="tw-w-full"
        >
          Thêm câu hỏi thường gặp
        </Button>
        
        <Card className="tw-bg-blue-50 tw-mt-4">
          <Title level={4} className="tw-mb-2">JSON Output:</Title>
          <pre className="tw-bg-white tw-p-4 tw-rounded tw-overflow-auto">
            {JSON.stringify(faq, null, 2)}
          </pre>
        </Card>
      </div>
    </Card>
  );
};
