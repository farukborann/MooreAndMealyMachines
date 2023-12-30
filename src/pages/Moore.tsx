import { useRef, useState } from "react";
import MachineInputs from "../components/MachineInputs";
import { Button, Col, Input, Row, Select, Table, notification } from "antd";
import MachineOutputs from "../components/MachineOutputs";

const MoorePage = () => {
  const [Alphabet, setAlphabet] = useState<string[]>([]);
  const [Situations, setSituations] = useState<string[]>([]);

  const [DataSource, setDataSource] = useState<any[]>([]);
  const [Columns, setColumns] = useState<any[]>([]);

  const [Word, setWord] = useState<string>("");
  const TransactionTable = useRef({});

  const [Results, setResults] = useState<any[]>([]);

  function InputsCallback(
    Alphabet: string[],
    Outputs: string[],
    Situations: string[]
  ) {
    setResults([]);
    TransactionTable.current = {};
    setWord("");

    setAlphabet(Alphabet);
    setSituations(Situations);

    let NewColumns: any[] = [];

    NewColumns.push({
      title: "Önceki Durum",
      dataIndex: "previousSituation",
      key: "key",
    });

    Alphabet.forEach((letter) => {
      NewColumns.push({ title: letter, dataIndex: letter, key: letter });
    });

    NewColumns.push({ title: "Çıktı", dataIndex: "output", key: "output" });
    setColumns(NewColumns);

    const NewDataSource: any[] = [];

    const situationSelect = (callback: Function) => (
      <>
        <Select
          style={{ width: 120 }}
          options={Situations.map((x) => ({ value: x, label: x }))}
          onChange={(data) => callback(data)}
        />
      </>
    );

    const outputSelect = (callback: Function) => (
      <>
        <Select
          style={{ width: 120 }}
          options={Outputs.map((x) => ({ value: x, label: x }))}
          onChange={(data) => callback(data)}
        />
      </>
    );

    Situations.forEach((situation) => {
      const Row: any = { key: situation };
      Row["previousSituation"] = situation;

      Alphabet.forEach((letter) => {
        Row[letter] = situationSelect((data: string) => {
          let temp = structuredClone(TransactionTable.current) as any;

          if (!Object.keys(temp).includes(situation)) {
            temp[situation as any] = {};
          }

          temp[situation as any][letter] = data;

          TransactionTable.current = temp;
        });
      });

      Row["output"] = outputSelect((data: any) => {
        let temp = TransactionTable.current as any;

        if (!Object.keys(temp).includes(situation)) {
          temp[situation as any] = {};
        }

        temp[situation as any]["output"] = data;

        TransactionTable.current = temp;
      });
      NewDataSource.push(Row);
    });
    setDataSource(NewDataSource);
  }

  function CheckCurrentTransactionTable() {
    function error() {
      notification.error({
        message: "Hata!",
        description: "Tüm Durumlar ve Çıktılar Seçilmelidir",
      });
      return false;
    }

    if (
      !Object.keys(TransactionTable.current).length ||
      !Alphabet.length ||
      !Situations.length
    ) {
      return error();
    }

    const CurrentTransactionTable = TransactionTable.current as any;

    for (let i = 0; i < Situations.length; i++) {
      const situation = Situations[i];

      if (!CurrentTransactionTable[situation]) return error();

      for (let j = 0; j < Alphabet.length; j++) {
        const letter = Alphabet[j];

        if (!CurrentTransactionTable[situation][letter]) return error();
      }

      if (!CurrentTransactionTable[situation]["output"]) return error();
    }

    return true;
  }

  function RunMachine() {
    if (!CheckCurrentTransactionTable()) return;

    if (!Word.trim()) {
      notification.error({ message: "Hata!", description: "Kelime Giriniz" });
    }

    const word = Word.trim().split("");
    let situation = "q0";

    const CurrentSituationTable = TransactionTable.current as any;
    let results: any[] = [
      {
        input: "",
        state: situation,
        output: CurrentSituationTable[situation]["output"],
      },
    ];

    word.forEach((letter) => {
      situation = CurrentSituationTable[situation][letter];
      let output = CurrentSituationTable[situation]["output"];
      results.push({ input: letter, state: situation, output: output });
    });

    setResults(results);
  }

  return (
    <div>
      <h1>Moore</h1>
      <MachineInputs callback={InputsCallback} />
      <Table columns={Columns} dataSource={DataSource} pagination={false} />
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col span={20}>
          <Input
            value={Word}
            onChange={(e) => {
              if (
                Alphabet.includes(e.target.value.slice(-1)) ||
                e.target.value === ""
              )
                setWord(e.target.value);
            }}
            placeholder="Kelime Giriniz"
            style={{ marginBottom: 10 }}
          />
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            style={{ marginRight: 10, marginLeft: 10, width: "100%" }}
            onClick={RunMachine}
          >
            Çalıştır
          </Button>
        </Col>
      </Row>
      <MachineOutputs results={Results} />
    </div>
  );
};

export default MoorePage;
