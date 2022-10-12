import React from "react";
import { render, screen } from "@testing-library/react";
import UseEffectTestSampleComponent from "./UseEffectTestSampleComponent";
import '@testing-library/jest-dom';

describe("useEffect を用いた初期処理のテスト", () => {
	it("APIからのレスポンスが返る前は、何も描画されない", async () => {
		render(<UseEffectTestSampleComponent />);

		/* レンダリング直後は何も表示しない */
		expect(screen.queryByTestId('userGreet')).toBeNull();
	});

	it("APIからのレスポンスが返った後に、内容が描画される", async () => {
		render(<UseEffectTestSampleComponent />);

		/* await で要素が出現するまで待機した後、評価を行う */
		expect(await screen.findByTestId('userGreet')).toBeInTheDocument();
	});
});
