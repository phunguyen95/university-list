import { render } from "@testing-library/react";
import UniversityTableHeading from "./university-table-heading";


test("renders UniversityTableHeading  view without crashing", () => {

  const { asFragment } = render(<UniversityTableHeading />);

  expect(asFragment()).toMatchSnapshot();
});
