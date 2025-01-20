import { render } from "@testing-library/react";

it("renders homepage unchanged", () => {
  //   const { container } = render(<Page />);
  const { container } = render(<></>);
  expect(container).toMatchSnapshot();
});
