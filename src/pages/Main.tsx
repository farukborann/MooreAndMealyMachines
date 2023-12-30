import { Card, Col, Row, Tabs, TabsProps } from "antd";
import MoorePage from "./Moore";
import MealyPage from "./Mealy";

const MainPage = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Moore",
      children: (
        <Card style={{ margin: "50px" }}>
          <MoorePage />
        </Card>
      ),
    },
    {
      key: "2",
      label: "Mealy",
      children: (
        <Card style={{ margin: "50px" }}>
          <MealyPage />
        </Card>
      ),
    },
  ];

  return (
    <Col span={24}>
      <Row justify={"center"}>
        <Tabs
          size="large"
          style={{ width: "100%" }}
          centered
          type="card"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </Row>
    </Col>
  );
};

export default MainPage;
