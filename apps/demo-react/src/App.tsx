import { Button } from "@houheaven/kit-react";

export const App = () => (
  <div style={{ padding: 24 }}>
    <h1>hh-kit React Demo</h1>
    <Button type="primary" onClick={() => { console.log("primary clicked"); }}>
      Primary
    </Button>
    <Button>Default</Button>
  </div>
);
