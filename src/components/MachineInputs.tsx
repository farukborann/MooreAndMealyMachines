import {
  Button,
  Card,
  Col,
  Input,
  List,
  Row,
  Typography,
  notification,
} from "antd";
import { useState } from "react";

const MachineInputs = ({
  callback,
}: {
  callback: (
    Alphabet: string[],
    Outputs: string[],
    Situations: string[]
  ) => void;
}) => {
  const [Alphabet, setAlphabet] = useState<string[]>([]);
  const [Outputs, setOutputs] = useState<string[]>([]);
  const [Situations, setSituations] = useState<string[]>([]);

  const [NewLetter, setNewLetter] = useState<string>("");
  const [NewOutput, setNewOutput] = useState<string>("");
  const [NewSituation, setNewSituation] = useState<string>("");

  function AddLetter() {
    if (NewLetter === "") {
      notification.error({
        message: "Hata",
        description: "Harf Giriniz",
      });
      return;
    }

    if (Alphabet.includes(NewLetter)) {
      notification.error({
        message: "Hata",
        description: "Harf Zaten Var",
      });
      return;
    }

    setAlphabet([...Alphabet, NewLetter]);
    setNewLetter("");
  }

  function AddOutput() {
    if (NewOutput === "") {
      notification.error({
        message: "Hata",
        description: "Çıktı Giriniz",
      });
      return;
    }

    if (Outputs.includes(NewOutput)) {
      notification.error({
        message: "Hata",
        description: "Çıktı Zaten Var",
      });
      return;
    }

    setOutputs([...Outputs, NewOutput]);
    setNewOutput("");
  }

  function AddSituation() {
    if (NewSituation === "") {
      notification.error({
        message: "Hata",
        description: "Durum Giriniz",
      });
      return;
    }

    if (Situations.includes(NewSituation)) {
      notification.error({
        message: "Hata",
        description: "Durum Zaten Var",
      });
      return;
    }

    setSituations([...Situations, NewSituation]);
    setNewSituation("");
  }

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Card>
            <Typography.Text strong>Alfabe</Typography.Text>
            <List>
              {Alphabet.map((letter) => (
                <List.Item key={letter}>
                  <Typography.Text>{letter}</Typography.Text>
                </List.Item>
              ))}
            </List>
            <Row>
              <Input
                placeholder="Harf Giriniz"
                maxLength={1}
                onKeyDown={(e) => e.key === "Enter" && AddLetter()}
                value={NewLetter}
                onChange={(e) => setNewLetter(e.target.value)}
              />
            </Row>
            <Row
              justify="end"
              style={{ gap: 10, marginTop: 10, marginBottom: 10 }}
            >
              <Button onClick={() => setAlphabet([])}>Temizle</Button>
              <Button type="primary" onClick={AddLetter}>
                Ekle
              </Button>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Typography.Text strong>Çıktılar</Typography.Text>
            <List>
              {Outputs.map((data) => (
                <List.Item key={data}>
                  <Typography.Text>{data}</Typography.Text>
                </List.Item>
              ))}
            </List>
            <Row>
              <Input
                placeholder="Çıktı Giriniz"
                onKeyDown={(e) => e.key === "Enter" && AddOutput()}
                value={NewOutput}
                onChange={(e) => setNewOutput(e.target.value)}
              />
            </Row>
            <Row
              justify="end"
              style={{ gap: 10, marginTop: 10, marginBottom: 10 }}
            >
              <Button onClick={() => setOutputs([])}>Temizle</Button>
              <Button type="primary" onClick={AddOutput}>
                Ekle
              </Button>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Typography.Text strong>Durumlar</Typography.Text>
            <List>
              {Situations.map((data) => (
                <List.Item key={data}>
                  <Typography.Text>{data}</Typography.Text>
                </List.Item>
              ))}
            </List>
            <Row>
              <Input
                placeholder="Durum Giriniz"
                onKeyDown={(e) => e.key === "Enter" && AddSituation()}
                value={NewSituation}
                onChange={(e) => setNewSituation(e.target.value)}
              />
            </Row>
            <Row
              justify="end"
              style={{ gap: 10, marginTop: 10, marginBottom: 10 }}
            >
              <Button onClick={() => setSituations([])}>Temizle</Button>
              <Button type="primary" onClick={AddSituation}>
                Ekle
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row justify={"end"} style={{ marginTop: "10px" }}>
        <Button
          style={{ marginTop: "10px", marginBottom: "10px" }}
          type="primary"
          onClick={() => callback(Alphabet, Outputs, Situations)}
        >
          Geçiş Tablosu Oluştur
        </Button>
      </Row>
    </>
  );
};

export default MachineInputs;
