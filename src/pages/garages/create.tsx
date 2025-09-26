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

// Pricing Component
const PricingForm = ({ value, onChange }: { value?: any[], onChange?: (value: any[]) => void }) => {
  const [pricing, setPricing] = useState(value || []);

  // Sync with form value
  useEffect(() => {
    if (value) {
      setPricing(value);
    }
  }, [value]);

  const addPricing = () => {
    const newPricing = [...pricing, { eta: "", service: "", price_vnd: "" }];
    setPricing(newPricing);
    onChange?.(newPricing);
  };

  const removePricing = (index: number) => {
    const newPricing = pricing.filter((_, i) => i !== index);
    setPricing(newPricing);
    onChange?.(newPricing);
  };

  const updatePricing = (index: number, field: string, value: any) => {
    const newPricing = pricing.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setPricing(newPricing);
    onChange?.(newPricing);
  };

  return (
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
                <Form.Item label="Dịch vụ" className="tw-mb-0">
                  <Input
                    value={item.service}
                    onChange={(e) => updatePricing(index, 'service', e.target.value)}
                    placeholder="Bảo dưỡng định kỳ"
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={4}>
                <Form.Item label="Thời gian" className="tw-mb-0">
                  <Input
                    value={item.eta}
                    onChange={(e) => updatePricing(index, 'eta', e.target.value)}
                    placeholder="2-3 giờ"
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={4}>
                <Form.Item label="Giá (VND)" className="tw-mb-0">
                  <Input
                    value={item.price_vnd}
                    onChange={(e) => updatePricing(index, 'price_vnd', e.target.value)}
                    placeholder="700.000 – 1.800.000"
                  />
                </Form.Item>
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
    </div>
  );
};

// Technical Information Component
const TechnicalInformationForm = ({ value, onChange }: { value?: any[], onChange?: (value: any[]) => void }) => {
  const [technicalInfo, setTechnicalInfo] = useState(value || []);

  // Sync with form value
  useEffect(() => {
    if (value) {
      setTechnicalInfo(value);
    }
  }, [value]);

  const addTechnicalInfo = () => {
    const newTechnicalInfo = [...technicalInfo, { title: "", value: "" }];
    setTechnicalInfo(newTechnicalInfo);
    onChange?.(newTechnicalInfo);
  };

  const removeTechnicalInfo = (index: number) => {
    const newTechnicalInfo = technicalInfo.filter((_, i) => i !== index);
    setTechnicalInfo(newTechnicalInfo);
    onChange?.(newTechnicalInfo);
  };

  const updateTechnicalInfo = (index: number, field: string, value: any) => {
    const newTechnicalInfo = technicalInfo.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setTechnicalInfo(newTechnicalInfo);
    onChange?.(newTechnicalInfo);
  };

  return (
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
                <Form.Item label="Tiêu đề" className="tw-mb-0">
                  <Input
                    value={item.title}
                    onChange={(e) => updateTechnicalInfo(index, 'title', e.target.value)}
                    placeholder="Số cầu nâng"
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Item label="Giá trị" className="tw-mb-0">
                  <Input
                    value={item.value}
                    onChange={(e) => updateTechnicalInfo(index, 'value', e.target.value)}
                    placeholder="5"
                  />
                </Form.Item>
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
    </div>
  );
};

// FAQ Component
const FAQForm = ({ value, onChange }: { value?: any[], onChange?: (value: any[]) => void }) => {
  const [faq, setFaq] = useState(value || []);

  // Sync with form value
  useEffect(() => {
    if (value) {
      setFaq(value);
    }
  }, [value]);

  const addFAQ = () => {
    const newFAQ = [...faq, { q: "", a: "" }];
    setFaq(newFAQ);
    onChange?.(newFAQ);
  };

  const removeFAQ = (index: number) => {
    const newFAQ = faq.filter((_, i) => i !== index);
    setFaq(newFAQ);
    onChange?.(newFAQ);
  };

  const updateFAQ = (index: number, field: string, value: any) => {
    const newFAQ = faq.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFaq(newFAQ);
    onChange?.(newFAQ);
  };

  return (
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
                <Form.Item label="Câu hỏi" className="tw-mb-0">
                  <Input
                    value={item.q}
                    onChange={(e) => updateFAQ(index, 'q', e.target.value)}
                    placeholder="AutosOnly có nhận sửa xe nhập khẩu không?"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Câu trả lời" className="tw-mb-0">
                  <TextArea
                    value={item.a}
                    onChange={(e) => updateFAQ(index, 'a', e.target.value)}
                    placeholder="Có, chúng tôi sửa tất cả dòng xe nhập khẩu với thiết bị chẩn đoán hiện đại."
                    rows={3}
                  />
                </Form.Item>
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
    </div>
  );
};

// Certificate Component
const CertificateForm = ({ value, onChange }: { value?: any[], onChange?: (value: any[]) => void }) => {
  const [certificates, setCertificates] = useState(value || []);

  // Sync with form value
  useEffect(() => {
    if (value) {
      setCertificates(value);
    }
  }, [value]);

  const addCertificate = () => {
    const newCertificates = [...certificates, { title: "", value: "" }];
    setCertificates(newCertificates);
    onChange?.(newCertificates);
  };

  const removeCertificate = (index: number) => {
    const newCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(newCertificates);
    onChange?.(newCertificates);
  };

  const updateCertificate = (index: number, field: string, value: any) => {
    const newCertificates = certificates.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setCertificates(newCertificates);
    onChange?.(newCertificates);
  };

  return (
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
                <Form.Item label="Tiêu đề" className="tw-mb-0">
                  <Input
                    value={item.title}
                    onChange={(e) => updateCertificate(index, 'title', e.target.value)}
                    placeholder="Chứng chỉ"
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={8}>
                <Form.Item label="Giá trị" className="tw-mb-0">
                  <Input
                    value={item.value}
                    onChange={(e) => updateCertificate(index, 'value', e.target.value)}
                    placeholder="Đối tác chính thức của Honda, Toyota Certified"
                  />
                </Form.Item>
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

                    <Form.Item
                      label="YouTube ID"
                      name="youtube_id"
                      help="ID video YouTube của garage (ví dụ: dQw4w9WgXcQ)"
                    >
                      <Input placeholder="dQw4w9WgXcQ" />
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

          {/* Pricing */}
          <Col xs={24}>
            <Card title="Bảng giá dịch vụ" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Form.Item
                  label="Bảng giá"
                  name="pricing"
                  help="Thiết lập bảng giá cho các dịch vụ của garage"
                >
                  <PricingForm />
                </Form.Item>
              </Space>
            </Card>
          </Col>

          {/* Technical Information */}
          <Col xs={24}>
            <Card title="Thông tin kỹ thuật" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Form.Item
                  label="Thông tin kỹ thuật"
                  name="technical_information"
                  help="Thiết lập thông tin kỹ thuật của garage"
                >
                  <TechnicalInformationForm />
                </Form.Item>
              </Space>
            </Card>
          </Col>

          {/* FAQ */}
          <Col xs={24}>
            <Card title="Câu hỏi thường gặp" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Form.Item
                  label="FAQ"
                  name="faq"
                  help="Thiết lập câu hỏi thường gặp cho garage"
                >
                  <FAQForm />
                </Form.Item>
              </Space>
            </Card>
          </Col>

          {/* Certificate */}
          <Col xs={24}>
            <Card title="Chứng chỉ & Giấy phép" className="tw-shadow-sm">
              <Space direction="vertical" size="large" className="tw-w-full">
                <Form.Item
                  label="Chứng chỉ"
                  name="certificate"
                  help="Thiết lập chứng chỉ và giấy phép của garage"
                >
                  <CertificateForm />
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
