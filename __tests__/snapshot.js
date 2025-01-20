import { render } from "@testing-library/react";
import Page from "../src/app/not-found";

it("not-found 페이지 확인::", () => {
  const { container } = render(<Page />);
  expect(container).toMatchSnapshot();
});
