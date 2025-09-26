import React, { useState } from "react";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  CreateButton,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Rate,
  Tag,
  Input,
  Select,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tooltip,
  Badge,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useMany } from "@refinedev/core";

const { Text, Title } = Typography;
const { Option } = Select;

export const GaragesList = () => {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');

  const { tableProps, searchFormProps, filters, sorters } = useTable({
    resource: "garages",
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
    onSearch: (values: any) => [
      {
        field: "name",
        operator: "contains",
        value: values.name,
      },
      {
        field: "address_text",
        operator: "contains",
        value: values.address,
      },
      {
        field: "status",
        operator: "eq",
        value: values.status,
      },
    ],
  });

  // Tạm thời comment out để test Tailwind
  // const { data: amenityData } = useMany({
  //   resource: "garage_amenities",
  //   ids: tableProps?.dataSource?.map((item) => item.amenity_ids)?.flat() || [],
  // });

  // const { data: serviceData } = useMany({
  //   resource: "garage_main_services", 
  //   ids: tableProps?.dataSource?.map((item) => item.main_service_ids)?.flat() || [],
  // });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'inactive':
        return 'Không hoạt động';
      case 'pending':
        return 'Chờ duyệt';
      default:
        return status;
    }
  };

  const renderGarageCard = (record: any) => (
    <Col xs={24} sm={12} lg={8} xl={6} key={record.id}>
      <Card
        className="tw-h-full tw-shadow-md hover:tw-shadow-lg tw-transition-shadow"
        cover={
          <div className="tw-relative tw-h-48 tw-bg-gradient-to-br tw-from-blue-500 tw-to-purple-600 tw-flex tw-items-center tw-justify-center">
            {/* <div className="tw-text-center tw-text-white">
              <EnvironmentOutlined className="tw-text-4xl tw-mb-2" />
              <Text className="tw-text-white tw-text-sm">
                {record.address_text}
              </Text>
            </div> */}
            <Badge
              count={getStatusText(record.status)}
              style={{
                backgroundColor: getStatusColor(record.status) === 'green' ? '#52c41a' :
                  getStatusColor(record.status) === 'red' ? '#ff4d4f' : '#faad14'
              }}
              className="tw-absolute tw-top-2 tw-right-2"
            />
          </div>
        }
        actions={[
          <Tooltip title="Xem chi tiết">
            <ShowButton recordItemId={record.id} />
          </Tooltip>,
          <Tooltip title="Chỉnh sửa">
            <EditButton recordItemId={record.id} />
          </Tooltip>,
          <Tooltip title="Xóa">
            <DeleteButton recordItemId={record.id} />
          </Tooltip>,
        ]}
      >
        <div className="tw-space-y-3">
          <div>
            <Title level={5} className="tw-mb-1 tw-text-gray-800">
              {record.name}
            </Title>
            <Text type="secondary" className="tw-text-sm">
              {record.slug}
            </Text>
          </div>

          <div className="tw-flex tw-items-center tw-space-x-2">
            <Rate
              disabled
              allowHalf
              value={record.rating || 0}
              className="tw-text-yellow-500"
            />
            <Text className="tw-text-sm tw-text-gray-600">
              ({record.rating || 0}/5)
            </Text>
          </div>

          <div className="tw-space-y-2">
            <div className="tw-flex tw-items-center tw-space-x-2">
              <EnvironmentOutlined className="tw-text-gray-500" />
              <Text className="tw-text-sm tw-text-gray-600 tw-truncate">
                {record.address_text}
              </Text>
            </div>

            {record.lat && record.lng && (
              <div className="tw-flex tw-items-center tw-space-x-2">
                <GlobalOutlined className="tw-text-gray-500" />
                <Text className="tw-text-sm tw-text-gray-600">
                  {record.lat.toFixed(4)}, {record.lng.toFixed(4)}
                </Text>
              </div>
            )}
          </div>

          {record.amenity_ids && record.amenity_ids.length > 0 && (
            <div>
              <Text className="tw-text-xs tw-text-gray-500 tw-block tw-mb-1">
                Tiện ích: {record.amenity_ids.length} items
              </Text>
            </div>
          )}

          {record.main_service_ids && record.main_service_ids.length > 0 && (
            <div>
              <Text className="tw-text-xs tw-text-gray-500 tw-block tw-mb-1">
                Dịch vụ chính: {record.main_service_ids.length} items
              </Text>
            </div>
          )}
        </div>
      </Card>
    </Col>
  );

  const columns = [
    {
      title: "Tên Garage",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" className="tw-text-xs">
            {record.slug}
          </Text>
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address_text",
      key: "address_text",
      render: (text: string) => (
        <div className="tw-flex tw-items-center tw-space-x-1">
          <EnvironmentOutlined className="tw-text-gray-500" />
          <Text className="tw-text-sm">{text}</Text>
        </div>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Rate disabled value={rating || 0} className="tw-text-yellow-500" />
          <Text className="tw-text-sm">({rating || 0}/5)</Text>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "Tọa độ",
      key: "coordinates",
      render: (record: any) => (
        <Text className="tw-text-xs tw-text-gray-500">
          {record.lat?.toFixed(4)}, {record.lng?.toFixed(4)}
        </Text>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <ShowButton recordItemId={record.id} />
          <EditButton recordItemId={record.id} />
          <DeleteButton recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <List
      headerButtons={
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Button
            type={viewMode === 'card' ? 'primary' : 'default'}
            icon={<AppstoreOutlined />}
            onClick={() => setViewMode('card')}
          >
            Card
          </Button>
          <Button
            type={viewMode === 'table' ? 'primary' : 'default'}
            icon={<UnorderedListOutlined />}
            onClick={() => setViewMode('table')}
          >
            Table
          </Button>
          <CreateButton />
        </div>
      }
    >
      <div className="tw-space-y-4">
        {/* Search and Filters */}
        <Card className="tw-shadow-sm">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} md={6}>
              <Input
                placeholder="Tìm kiếm theo tên garage..."
                prefix={<SearchOutlined />}
                value={searchFormProps.form?.getFieldValue("name")}
                onChange={(e) => searchFormProps.form?.setFieldValue("name", e.target.value)}
              />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Input
                placeholder="Tìm kiếm theo địa chỉ..."
                prefix={<EnvironmentOutlined />}
                value={searchFormProps.form?.getFieldValue("address")}
                onChange={(e) => searchFormProps.form?.setFieldValue("address", e.target.value)}
              />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Select
                placeholder="Trạng thái"
                style={{ width: '100%' }}
                allowClear
                value={searchFormProps.form?.getFieldValue("status")}
                onChange={(value) => searchFormProps.form?.setFieldValue("status", value)}
              >
                <Option value="active">Hoạt động</Option>
                <Option value="inactive">Không hoạt động</Option>
                <Option value="pending">Chờ duyệt</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Space>
                <Button type="primary" onClick={() => searchFormProps.form?.submit()}>
                  Tìm kiếm
                </Button>
                <Button onClick={() => searchFormProps.form?.resetFields()}>
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Content */}
        {viewMode === 'card' ? (
          <Row gutter={[16, 16]}>
            {tableProps.dataSource?.map(renderGarageCard)}
          </Row>
        ) : (
          <Table
            {...tableProps}
            columns={columns}
            rowKey="id"
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} garage`,
            }}
          />
        )}
      </div>
    </List>
  );
};
