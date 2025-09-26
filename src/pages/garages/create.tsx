import React, { useState, useEffect } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col, Typography, Card, Space, Button, TimePicker } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility";
import slugify from "slugify";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

// Hours of Operation Component
const HoursOfOperationForm = ({ value, onChange }: { value?: any[], onChange?: (value: any[]) => void }) => {
  const [hours, setHours] = useState(value || []);

  // Sync with form value
  useEffect(() => {
    if (value) {
      setHours(value);
    }
  }, [value]);

  const addHour = () => {
    const newHours = [...hours, { days: "", open: "08:00", close: "18:00" }];
    setHours(newHours);
    onChange?.(newHours);
  };

  const removeHour = (index: number) => {
    const newHours = hours.filter((_, i) => i !== index);
    setHours(newHours);
    onChange?.(newHours);
  };

  const updateHour = (index: number, field: string, value: any) => {
    const newHours = hours.map((hour, i) => 
      i === index ? { ...hour, [field]: value } : hour
    );
    setHours(newHours);
    onChange?.(newHours);
  };

  return (
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
              <Form.Item label="Ngày trong tuần" className="tw-mb-0">
                <Input
                  value={hour.days}
                  onChange={(e) => updateHour(index, 'days', e.target.value)}
                  placeholder="Thứ 2 – Thứ 6"
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={4}>
              <Form.Item label="Giờ mở" className="tw-mb-0">
                <TimePicker
                  value={hour.open ? dayjs(hour.open, 'HH:mm') : null}
                  onChange={(time) => updateHour(index, 'open', time ? time.format('HH:mm') : '08:00')}
                  format="HH:mm"
                  className="tw-w-full"
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={4}>
              <Form.Item label="Giờ đóng" className="tw-mb-0">
                <TimePicker
                  value={hour.close ? dayjs(hour.close, 'HH:mm') : null}
                  onChange={(time) => updateHour(index, 'close', time ? time.format('HH:mm') : '18:00')}
                  format="HH:mm"
                  className="tw-w-full"
                />
              </Form.Item>
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
    </div>
  );
};

export const GaragesCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "garages",
  });

  // Fetch amenities for select
  const { selectProps: amenitySelectProps } = useSelect({
    resource: "garage_amenities",
    optionLabel: "name",
    optionValue: "id",
  });

  // Fetch main services for select
  const { selectProps: serviceSelectProps } = useSelect({
    resource: "garage_main_services",
    optionLabel: "name", 
    optionValue: "id",
  });

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name) {
      const slug = slugify(name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      formProps.form?.setFieldValue('slug', slug);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" size="large">
        <Row gutter={[24, 24]}>
          {/* Basic Information */}
          <Col xs={24} lg={12}>
            <Card title="Thông tin cơ bản" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Form.Item
                  label="Tên Garage"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập tên garage" }]}
                >
                  <Input 
                    placeholder="Nhập tên garage" 
                    onChange={handleNameChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Slug"
                  name="slug"
                  help="Slug được tự động tạo từ tên garage"
                >
                  <Input 
                    placeholder="garage-name-slug" 
                    readOnly
                    className="tw-bg-gray-50"
                  />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address_text"
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                  <TextArea 
                    rows={3} 
                    placeholder="Nhập địa chỉ đầy đủ của garage"
                  />
                </Form.Item>

                <Form.Item
                  label="Google Place ID"
                  name="google_place_id"
                >
                  <Input placeholder="ChIJ..." />
                </Form.Item>
              </Space>
            </Card>
          </Col>

          {/* Location & Rating */}
          <Col xs={24} lg={12}>
            <Card title="Vị trí & Đánh giá" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Vĩ độ (Latitude)"
                      name="lat"
                      rules={[{ required: true, message: "Vui lòng nhập vĩ độ" }]}
                    >
                      <InputNumber 
                        style={{ width: '100%' }}
                        placeholder="10.762622"
                        precision={6}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Kinh độ (Longitude)"
                      name="lng"
                      rules={[{ required: true, message: "Vui lòng nhập kinh độ" }]}
                    >
                      <InputNumber 
                        style={{ width: '100%' }}
                        placeholder="106.660172"
                        precision={6}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Đánh giá (0-5)"
                  name="rating"
                  rules={[
                    { required: true, message: "Vui lòng nhập đánh giá" },
                    { type: 'number', min: 0, max: 5, message: "Đánh giá từ 0-5" }
                  ]}
                >
                  <InputNumber 
                    style={{ width: '100%' }}
                    placeholder="4.5"
                    min={0}
                    max={5}
                    step={0.1}
                    precision={1}
                  />
                </Form.Item>

                <Form.Item
                  label="Trạng thái"
                  name="status"
                  rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                >
                  <Select placeholder="Chọn trạng thái">
                    <Option value="active">Hoạt động</Option>
                    <Option value="inactive">Không hoạt động</Option>
                    <Option value="pending">Chờ duyệt</Option>
                  </Select>
                </Form.Item>
              </Space>
            </Card>
          </Col>

          {/* Services & Amenities */}
          <Col xs={24}>
            <Card title="Dịch vụ & Tiện ích" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Form.Item
                  label="Dịch vụ chính"
                  name="main_service_ids"
                  help="Chọn các dịch vụ chính mà garage cung cấp"
                >
                  <Select
                    mode="multiple"
                    placeholder="Chọn dịch vụ chính"
                    {...serviceSelectProps}
                  />
                </Form.Item>

                <Form.Item
                  label="Tiện ích"
                  name="amenity_ids"
                  help="Chọn các tiện ích có sẵn tại garage"
                >
                  <Select
                    mode="multiple"
                    placeholder="Chọn tiện ích"
                    {...amenitySelectProps}
                  />
                </Form.Item>
              </Space>
            </Card>
          </Col>

          {/* Hours of Operation */}
          <Col xs={24}>
            <Card title="Giờ hoạt động" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Form.Item
                  label="Giờ hoạt động"
                  name="hours_of_operation"
                  help="Thiết lập giờ hoạt động cho từng ngày trong tuần"
                >
                  <HoursOfOperationForm />
                </Form.Item>
              </Space>
            </Card>
          </Col>

          {/* Additional Details */}
          <Col xs={24}>
            <Card title="Chi tiết bổ sung" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Form.Item
                  label="Chi tiết (JSON)"
                  name="detail"
                  help="Thông tin chi tiết bổ sung dưới dạng JSON"
                >
                  <TextArea 
                    rows={6} 
                    placeholder='{"description": "Mô tả garage", "phone": "0123456789", "email": "contact@garage.com"}'
                  />
                </Form.Item>
              </Space>
            </Card>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
