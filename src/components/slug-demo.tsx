import React, { useState } from 'react';
import { Input, Card, Typography, Space } from 'antd';
import slugify from 'slugify';

const { Title, Text } = Typography;

export const SlugDemo = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    if (value) {
      const generatedSlug = slugify(value, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      setSlug(generatedSlug);
    } else {
      setSlug('');
    }
  };

  return (
    <Card className="tw-p-6 tw-max-w-2xl tw-mx-auto tw-mt-8">
      <Title level={3} className="tw-text-center tw-mb-6">
        Demo Auto-Generate Slug
      </Title>
      
      <Space direction="vertical" size="large" className="tw-w-full">
        <div>
          <Text strong className="tw-block tw-mb-2">
            Tên Garage:
          </Text>
          <Input
            placeholder="Nhập tên garage (ví dụ: Garage ABC & XYZ)"
            value={name}
            onChange={handleNameChange}
            className="tw-w-full"
          />
        </div>
        
        <div>
          <Text strong className="tw-block tw-mb-2">
            Slug được tạo tự động:
          </Text>
          <Input
            value={slug}
            readOnly
            className="tw-bg-gray-50 tw-w-full"
            placeholder="Slug sẽ xuất hiện ở đây..."
          />
        </div>
        
        {name && slug && (
          <div className="tw-bg-blue-50 tw-p-4 tw-rounded-lg">
            <Text className="tw-text-sm tw-text-gray-600">
              <strong>Ví dụ:</strong> "{name}" → "{slug}"
            </Text>
          </div>
        )}
      </Space>
    </Card>
  );
};
