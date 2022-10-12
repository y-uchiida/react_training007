import React from "react";
import { render, screen } from "@testing-library/react";
import UseEffectTestSampleComponent from "./UseEffectTestSampleComponent";

describe("useEffect を用いた初期処理のテスト", () => {
	it("APIからのレスポンスが返った後に、内容が描画される", async () => {
		render(<UseEffectTestSampleComponent />);

		/* レンダリング直後は */
		expect(screen.queryByTestId('userGreet')).toBeNull();

	});
});
