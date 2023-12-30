import { Col, Row, Table } from "antd";
import { IResult } from "../models";

const MachineOutputs = ({ results }: { results: IResult[] }) => {
  const Columns = [
    {
      title: "Girdi",
      dataIndex: "input",
      key: "input",
    },
    {
      title: "Durum",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Çıktı",
      dataIndex: "output",
      key: "output",
    },
  ];

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Table columns={Columns} dataSource={results} pagination={false} />
        </Col>
      </Row>
    </>
  );
};

export default MachineOutputs;
