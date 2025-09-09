import { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  List,
  InputNumber,
  Typography,
  Space,
  Flex,
} from "antd";
import { addToCart, updateQty } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;

const products = [
  {
    id: 1,
    name: "Premium Coffee Beans",
    sku: "CFB001",
    price: 25.99,
    stock: 50,
  },
  { id: 2, name: "Organic Green Tea", sku: "TEA002", price: 15.5, stock: 30 },
  {
    id: 3,
    name: "Artisan Chocolate Bar",
    sku: "CHC003",
    price: 8.75,
    stock: 25,
  },
  { id: 4, name: "Fresh Croissants", sku: "BKY004", price: 3.5, stock: 15 },
];

const Sale = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const total = cart?.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = cart?.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="pos-container">
      <Row gutter={24}>
        {/* Products Section */}
        <Col xs={24} md={14}>
          <Title level={3} className="section-title">
            Select Products
          </Title>
          <Row gutter={[16, 16]}>
            {products.map((p) => (
              <Col xs={24} sm={12} key={p.id}>
                <Card className="product-card" bordered>
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <Text type="secondary">SKU: {p.sku}</Text>
                    <p className="price">${p.price}</p>
                  </div>
                  <Flex
                    justify="space-between"
                    gap="16px"
                    style={{ alignItems: "center", width: "100%" }}
                  >
                    <Text>{p.stock} left</Text>
                    <Button
                      type="primary"
                      shape="round"
                      className="checkout-btn"
                      onClick={() => dispatch(addToCart(p))}
                    >
                      Add
                    </Button>
                  </Flex>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Cart Section */}
        <Col xs={24} md={10}>
          <Card className="cart-card" bordered>
            <Title level={3} className="section-title">
              Shopping Cart ({totalQty} items)
            </Title>
            {cart.length === 0 ? (
              <Text type="secondary">No items added.</Text>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={cart}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Button
                          onClick={() =>
                            dispatch(
                              updateQty({ id: item.id, qty: item.qty - 1 })
                            )
                          }
                        >
                          -
                        </Button>
                        <Text>{item.qty}</Text>
                        <Button
                          onClick={() =>
                            dispatch(
                              updateQty({ id: item.id, qty: item.qty + 1 })
                            )
                          }
                        >
                          +
                        </Button>
                      </div>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<Text strong>{item.name}</Text>}
                      description={
                        <Text className="price">${item.price.toFixed(2)}</Text>
                      }
                    />
                  </List.Item>
                )}
              />
            )}

            <div className="cart-total">
              <Text strong>Total:</Text>
              <Text className="total-price">${total.toFixed(2)}</Text>
            </div>

            <Button
              size="large"
              block
              className="checkout-btn"
              disabled={cart.length === 0}
            >
              Complete Sale
            </Button>
          </Card>
          {/* <Card className="cart-card" bordered>
    <Title level={3} className="section-title">
      Shopping Cart
    </Title>
    {cart.length === 0 ? (
      <Text type="secondary">No items added.</Text>
    ) : (
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            actions={[
              <div className="qty-control">
                <Button
                  shape="circle"
                  size="small"
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  
                >
                  -
                </Button>
                <span className="qty-value">{item.qty}</span>
                <Button
                  shape="circle"
                  size="small"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                >
                  +
                </Button>
              </div>
            ]}
          >
            <List.Item.Meta
              title={<Text strong>{item.name}</Text>}
              description={
                <Text className="price">${item.price.toFixed(2)}</Text>
              }
            />
          </List.Item>
        )}
      />
    )}

    <div className="cart-total">
      <Text strong>Total:</Text>
      <Text className="total-price">${total.toFixed(2)}</Text>
    </div>

    <Button
      size="large"
      block
      className="checkout-btn"
      disabled={cart.length === 0}
    >
      Complete Sale
    </Button>
  </Card> */}
        </Col>
      </Row>
    </div>
  );
};
export default Sale;
