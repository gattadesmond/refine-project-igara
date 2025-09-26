import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Typography, Form } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const CertificateDemo = () => {
  const [certificates, setCertificates] = useState<any[]>([]);

  const addCertificate = () => {
    setCertificates([...certificates, { title: "", value: "" }]);
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const updateCertificate = (index: number, field: string, value: any) => {
    const newCertificates = certificates.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setCertificates(newCertificates);
  };

  return (
    <Card className="tw-p-6 tw-max-w-4xl tw-mx-auto tw-mt-8">
      <Title level={3} className="tw-text-center tw-mb-6">
        Demo Chứng Chỉ & Giấy Phép
      </Title>
      
      <div className="tw-space-y-4">
        {certificates.length === 0 ? (
          <div className="tw-text-center tw-py-8 tw-text-gray-500">
            <Text>Chưa có chứng chỉ nào. Hãy thêm chứng chỉ cho garage.</Text>
          </div>
        ) : (
          certificates.map((item, index) => (
          <Card key={index} size="small" className="tw-bg-gray-50">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12}>
                <Text strong className="tw-block tw-mb-2">Tiêu đề:</Text>
                <Input
                  value={item.title}
                  onChange={(e) => updateCertificate(index, 'title', e.target.value)}
                  placeholder="Chứng chỉ"
                />
              </Col>
              <Col xs={12} sm={8}>
                <Text strong className="tw-block tw-mb-2">Giá trị:</Text>
                <Input
                  value={item.value}
                  onChange={(e) => updateCertificate(index, 'value', e.target.value)}
                  placeholder="Đối tác chính thức của Honda, Toyota Certified"
                />
              </Col>
              <Col xs={12} sm={4} className="tw-text-right">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeCertificate(index)}
                  disabled={certificates.length <= 1}
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
          onClick={addCertificate}
          icon={<PlusOutlined />}
          className="tw-w-full"
        >
          Thêm chứng chỉ
        </Button>
        
        <Card className="tw-bg-blue-50 tw-mt-4">
          <Title level={4} className="tw-mb-2">JSON Output:</Title>
          <pre className="tw-bg-white tw-p-4 tw-rounded tw-overflow-auto">
            {JSON.stringify(certificates, null, 2)}
          </pre>
        </Card>
      </div>
    </Card>
  );
};
