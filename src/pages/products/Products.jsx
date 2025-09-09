import {
  Avatar,
  Button,
  message,
  Popconfirm,
  Space,
  Switch,
  Table,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ViewProduct from "./ViewProduct";

const Products = () => {
  const [data, setData] = useState([]);
  const [pageSetting, setPageSetting] = useState({
    page: 1,
    limits: 10,
    total: 1,
  });
  const [loading, setLoading] = useState(false);

  console.log("data", data);

  useEffect(() => {
    fetchProduct();
  }, [pageSetting.page, pageSetting.limits]);

  //   const fetchProduct = async () => {
  //     try {
  //       setLoading(true);
  //       //   let res;
  //       //   const res = await GetStaff({
  //       //     page: pageSetting.page,
  //       //     limit: pageSetting.limits,
  //       //     ...filter,
  //       //   });

  //       let res = {
  //         status: "success",
  //         data: [
  //           {
  //             id: 1,
  //             product_name: "Test Product",
  //             price: 10,
  //             sku: "SKU001",
  //             stock_quantity: 10,
  //           },
  //           {
  //             id: 2,
  //             product_name: "Coffee Beans",
  //             price: 25,
  //             sku: "CFB002",
  //             stock_quantity: 50,
  //           },
  //         ],
  //         pagination: { total: 2 },
  //       };

  //       const newData = res.data;
  //       setData(newData?.data?.map((item) => ({ ...item, key: item.id })));

  //       if (
  //         newData.pagination &&
  //         Object.prototype.hasOwnProperty.call(newData.pagination, "total")
  //       ) {
  //         pageSetting.total = newData.pagination.total;
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       message.error(error.response?.data?.message || "Something went wrong");
  //       setLoading(false);
  //     }
  //   };
  const fetchProduct = async () => {
    try {
      setLoading(true);

      let res = {
        status: "success",
        data: [
          {
            id: 1,
            product_name: "Test Product",
            price: 10,
            sku: "SKU001",
            stock_quantity: 10,
          },
          {
            id: 2,
            product_name: "Coffee Beans",
            price: 25,
            sku: "CFB002",
            stock_quantity: 50,
          },
        ],
        pagination: { total: 2 },
      };

      const newData = res.data;
      setData(newData.map((item) => ({ ...item, key: item.id })));

      if (
        res.pagination &&
        Object.prototype.hasOwnProperty.call(res.pagination, "total")
      ) {
        setPageSetting((prev) => ({
          ...prev,
          total: res.pagination.total,
        }));
      }

      setLoading(false);
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      let res;

      if (res.status == "success") {
        message.success(res.message);
        fetchProduct();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      message.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      align: "center",
      render: (text, record, index) =>
        (pageSetting.page - 1) * pageSetting.limits + index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",

      render: (_, item) => (
        <>
          <Space>{item.product_name ? item.product_name : "-"}</Space>
        </>
      ),
    },
    {
      title: "Sku",
      dataIndex: "sku",
      key: "sku",

      render: (_, item) => (item.sku ? item.sku : "-"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",

      render: (_, item) => (item.price ? item.price : "-"),
    },
    {
      title: "Stock Quantity",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
      render: (_, item) => (item.stock_quantity ? item.stock_quantity : "-"),
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, item) => (
        <Space size="middle">
          <ViewProduct data={item} />
          <EditProduct data={item} fetchProduct={fetchProduct} />

          <Popconfirm
            title={`Are you sure to delete ${item.product_name}?`}
            onConfirm={() => handleDelete(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              size="small"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="add-button-head">
        <AddProduct fetchProduct={fetchProduct} />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={{
          align: "center",
          showSizeChanger: true,
          pageSize: pageSetting.limits,
          current: pageSetting.page,
          total: pageSetting.total,
          size: "default",
          showTotal: (total) => `Total ${total} products`,
          onChange: (page, limits) => {
            setPageSetting((prevSetting) => ({
              ...prevSetting,
              page,
              limits,
            }));
          },
        }}
        bordered={true}
        loading={loading}
      />
    </>
  );
};

export default Products;
