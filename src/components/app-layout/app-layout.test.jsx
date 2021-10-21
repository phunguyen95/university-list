import { render } from "@testing-library/react";
import AppLayout from "./app-layout";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders applayout  view without crashing", () => {
    const history = createMemoryHistory();

  const { asFragment } = render(<Router history={history}><AppLayout>
      <div>Test</div>
    </AppLayout></Router>);

  expect(asFragment()).toMatchSnapshot();
});
