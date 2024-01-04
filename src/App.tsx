import "./styles.css";
import { Table } from "./components/Table";
import { columns, rows } from "./data/data";

export default function App() {
  return (
    <div className="App">
      <div>
        <Table rows={rows} columns={columns} />
      </div>
    </div>
  );
}
