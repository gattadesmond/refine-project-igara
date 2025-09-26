import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Typography, Form, InputNumber } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const ImagesDemo = () => {
  const [images, setImages] = useState<any[]>([]);

  const addImage = () => {
    setImages([...images, { alt: "", url: "", caption: "", sort_order: images.length + 1 }]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // Update sort_order for remaining images
    const updatedImages = newImages.map((img, i) => ({ ...img, sort_order: i + 1 }));
    setImages(updatedImages);
  };

  const updateImage = (index: number, field: string, value: any) => {
    const newImages = images.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setImages(newImages);
  };

  return (
    <Card className="tw-p-6 tw-max-w-6xl tw-mx-auto tw-mt-8">
      <Title level={3} className="tw-text-center tw-mb-6">
        Demo Hình Ảnh Garage
      </Title>
      
      <div className="tw-space-y-4">
        {images.length === 0 ? (
          <div className="tw-text-center tw-py-8 tw-text-gray-500">
            <Text>Chưa có hình ảnh nào. Hãy thêm hình ảnh cho garage.</Text>
          </div>
        ) : (
          images.map((item, index) => (
          <Card key={index} size="small" className="tw-bg-gray-50">
            <Row gutter={[16, 16]} align="top">
              <Col xs={24} sm={6}>
                <Text strong className="tw-block tw-mb-2">Alt Text:</Text>
                <Input
                  value={item.alt}
                  onChange={(e) => updateImage(index, 'alt', e.target.value)}
                  placeholder="Khu vực tiếp nhận xe"
                />
              </Col>
              <Col xs={24} sm={8}>
                <Text strong className="tw-block tw-mb-2">URL:</Text>
                <Input
                  value={item.url}
                  onChange={(e) => updateImage(index, 'url', e.target.value)}
                  placeholder="https://cdn.example.com/garages/abc/img-1.jpg"
                />
              </Col>
              <Col xs={24} sm={6}>
                <Text strong className="tw-block tw-mb-2">Caption:</Text>
                <Input
                  value={item.caption}
                  onChange={(e) => updateImage(index, 'caption', e.target.value)}
                  placeholder="Khu vực tiếp nhận"
                />
              </Col>
              <Col xs={12} sm={2}>
                <Text strong className="tw-block tw-mb-2">Thứ tự:</Text>
                <InputNumber
                  value={item.sort_order}
                  onChange={(value) => updateImage(index, 'sort_order', value || 1)}
                  min={1}
                  max={100}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xs={12} sm={2} className="tw-text-right">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeImage(index)}
                  disabled={images.length <= 1}
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
          onClick={addImage}
          icon={<PlusOutlined />}
          className="tw-w-full"
        >
          Thêm hình ảnh
        </Button>
        
        <Card className="tw-bg-blue-50 tw-mt-4">
          <Title level={4} className="tw-mb-2">JSON Output:</Title>
          <pre className="tw-bg-white tw-p-4 tw-rounded tw-overflow-auto">
            {JSON.stringify(images, null, 2)}
          </pre>
        </Card>
      </div>
    </Card>
  );
};
