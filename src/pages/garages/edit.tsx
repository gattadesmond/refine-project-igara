import React, { useEffect } from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Switch, Row, Col, Typography, Card, Space, Button } from "antd";
import { supabaseClient } from "../../utility";
import slugify from "slugify";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export const GaragesEdit = () => {
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
    <Edit saveButtonProps={saveButtonProps}>
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
                    disabled
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
                    placeholder='{"description": "Mô tả garage", "hours": "8:00-18:00", "phone": "0123456789"}'
                  />
                </Form.Item>
              </Space>
            </Card>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
