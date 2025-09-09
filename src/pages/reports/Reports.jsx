import { Card, Typography, List, Row, Col, Divider, Tag, Statistic } from "antd";
import { DollarOutlined, CalendarOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const salesData = [
  {
    id: 1,
    date: "2024-01-15",
    items: [{ name: "Premium Coffee Beans", qty: 2, price: 25.99 }],
  },
  {
    id: 2,
    date: "2024-01-14",
    items: [
      { name: "Organic Green Tea", qty: 1, price: 15.5 },
      { name: "Artisan Chocolate Bar", qty: 3, price: 8.75 },
    ],
  },
];

const Reports = () => {
  const overallTotal = salesData.reduce(
    (sum, sale) =>
      sum + sale.items.reduce((s, item) => s + item.qty * item.price, 0),
    0
  );

  return (
    <div style={{ padding: "40px", background: "#f0f2f5", minHeight: "100vh" }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 30 }}>
        <Col>
          <Title level={2} style={{ margin: 0, color: "#001529" }}>
            Sales Reports
          </Title>
          <Text type="secondary">Track your sales history & performance</Text>
        </Col>
        <Col>
          <Statistic
            title="Total Revenue"
            value={overallTotal.toFixed(2)}
            prefix={<DollarOutlined />}
            precision={2}
            valueStyle={{ color: "#3f8600", fontSize: 28 }}
          />
        </Col>
      </Row>

      {/* Sales History */}
      {salesData.map((sale) => {
        const total = sale.items.reduce(
          (sum, item) => sum + item.qty * item.price,
          0
        );

        return (
          <Card
            key={sale.id}
            style={{
              marginBottom: 24,
              borderRadius: 16,
              border: "none",
              background: "#fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: 24 }}
          >
            {/* Sale Header */}
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={5} style={{ margin: 0, color: "#1890ff" }}>
                  <ShoppingCartOutlined /> Sale #{sale.id}
                </Title>
              </Col>
              <Col>
                <Tag icon={<CalendarOutlined />} color="blue">
                  {new Date(sale.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Tag>
              </Col>
            </Row>

            <Divider style={{ margin: "16px 0" }} />

            {/* Item List */}
            <List
              itemLayout="horizontal"
              dataSource={sale.items}
              renderItem={(item) => (
                <List.Item style={{ borderBottom: "none", padding: "8px 0" }}>
                  <Row justify="space-between" style={{ width: "100%" }}>
                    <Col>
                      <Text style={{ fontSize: 15, fontWeight: 500 }}>
                        {item.name}
                      </Text>{" "}
                      <Text type="secondary">x{item.qty}</Text>
                    </Col>
                    <Col>
                      <Text strong style={{ fontSize: 15 }}>
                        ${(item.qty * item.price).toFixed(2)}
                      </Text>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />

            <Divider style={{ margin: "16px 0" }} />

            {/* Sale Total */}
            <Row justify="end">
              <Col>
                <Text strong style={{ fontSize: 16, color: "#722ed1" }}>
                  Total: ${total.toFixed(2)}
                </Text>
              </Col>
            </Row>
          </Card>
        );
      })}
    </div>
  );
};

export default Reports;
