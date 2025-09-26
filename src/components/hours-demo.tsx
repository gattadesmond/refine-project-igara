import React, { useState } from 'react';
import { Card, Typography, Space, Button, Input, TimePicker, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

export const HoursDemo = () => {
  const [hours, setHours] = useState([]);

  const addHour = () => {
    setHours([...hours, { days: "", open: "08:00", close: "18:00" }]);
  };

  const removeHour = (index: number) => {
    setHours(hours.filter((_, i) => i !== index));
  };

  const updateHour = (index: number, field: string, value: any) => {
    const newHours = hours.map((hour, i) => 
      i === index ? { ...hour, [field]: value } : hour
    );
    setHours(newHours);
  };

  return (
    <Card className="tw-p-6 tw-max-w-4xl tw-mx-auto tw-mt-8">
      <Title level={3} className="tw-text-center tw-mb-6">
        Demo Giờ Hoạt Động
      </Title>
      
      <div className="tw-space-y-4">
        {hours.length === 0 ? (
          <div className="tw-text-center tw-py-8 tw-text-gray-500">
            <Text>Chưa có giờ hoạt động nào. Hãy thêm giờ hoạt động cho garage.</Text>
          </div>
        ) : (
          hours.map((hour, index) => (
          <Card key={index} size="small" className="tw-bg-gray-50">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={8}>
                <Text strong className="tw-block tw-mb-2">Ngày trong tuần:</Text>
                <Input
                  value={hour.days}
                  onChange={(e) => updateHour(index, 'days', e.target.value)}
                  placeholder="Thứ 2 – Thứ 6"
                />
              </Col>
              <Col xs={12} sm={4}>
                <Text strong className="tw-block tw-mb-2">Giờ mở:</Text>
                <TimePicker
                  value={hour.open ? dayjs(hour.open, 'HH:mm') : null}
                  onChange={(time) => updateHour(index, 'open', time ? time.format('HH:mm') : '08:00')}
                  format="HH:mm"
                  className="tw-w-full"
                />
              </Col>
              <Col xs={12} sm={4}>
                <Text strong className="tw-block tw-mb-2">Giờ đóng:</Text>
                <TimePicker
                  value={hour.close ? dayjs(hour.close, 'HH:mm') : null}
                  onChange={(time) => updateHour(index, 'close', time ? time.format('HH:mm') : '18:00')}
                  format="HH:mm"
                  className="tw-w-full"
                />
              </Col>
              <Col xs={24} sm={8} className="tw-text-right">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeHour(index)}
                  disabled={hours.length <= 1}
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
          onClick={addHour}
          icon={<PlusOutlined />}
          className="tw-w-full"
        >
          Thêm giờ hoạt động
        </Button>
        
        <Card className="tw-bg-blue-50 tw-mt-4">
          <Title level={4} className="tw-mb-2">JSON Output:</Title>
          <pre className="tw-bg-white tw-p-4 tw-rounded tw-overflow-auto">
            {JSON.stringify(hours, null, 2)}
          </pre>
        </Card>
      </div>
    </Card>
  );
};
