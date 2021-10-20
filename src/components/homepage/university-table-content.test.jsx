import { render } from "@testing-library/react";
import UniversityTableContent from "./pagination-navigation";

test("renders UniversityTableContent view without crashing", () => {

  const { asFragment } = render(<UniversityTableContent />);

  expect(asFragment()).toMatchSnapshot();
});
test("renders UniversityTableContent view with university data without crashing", () => {
    const uniStubData = [ {
        name:'123',
        country:'456',
        web_pages:['abc'],
    }]
    const handleAddToFavourite = jest.fn();
    const handleRemoveFromFavourite = jest.fn();
    const isAddedFavourite = jest.fn();
    const { asFragment } = render(<UniversityTableContent uniInfo={uniStubData} index={1} handleAddToFavourite={handleAddToFavourite} handleRemoveFromFavourite={handleRemoveFromFavourite} isAddedFavourite={isAddedFavourite} />);
  
    expect(asFragment()).toMatchSnapshot();
  });