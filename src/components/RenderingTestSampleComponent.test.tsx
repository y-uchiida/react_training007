
import React from "react";
import { render, screen } from "@testing-library/react";
import { RenderingTestSampleComponent } from "./RenderingTestSampleComponent";

// コンポーネントのレンダリング内容に関するテスト

describe('Rendering', () => {
	it("すべての要素が描画されているされている", () => {
		render(<RenderingTestSampleComponent />);
		expect(screen);
	});

	it("見出しの役割を持つ要素(h1~h6)が何かしら描画されている", () => {
		render(<RenderingTestSampleComponent />);
		// ヘッダー要素を何か取得できれば、truthy になる
		expect(screen.getByRole('heading')).toBeTruthy();
	});

	it("テキスト入力の要素が描画されている", () => {
		render(<RenderingTestSampleComponent />);
		// input[type=text]やtextareaを何か取得できれば、truthy になる
		expect(screen.getByRole('textbox')).toBeTruthy();
	});

	it("ボタン要素が2つ描画されている", () => {
		render(<RenderingTestSampleComponent />);
		// 取得されたbutton要素の配列のlengthが2なら、truthy になる
		expect(screen.getAllByRole('button')).toHaveLength(2);
	});

	it("テキストノードの値が'p element text' の要素が描画されている", () => {
		render(<RenderingTestSampleComponent />);
		// テキストノードに「p element text」を持つ要素がある場合、truthy になる
		expect(screen.getByText('p element text')).toBeTruthy();
	});

	it("テキストノードの値が'fizzbuzz' の要素が描画されていない", () => {
		render(<RenderingTestSampleComponent />);
		// 該当する要素がない場合は、nullになる
		// getByText() を使うと、取得できなかった場合に即エラーになるので注意
		expect(screen.queryByText('fizzbuzz')).toBeNull();
	});

	it("data-testid 属性 が'sampleTestId' の要素が描画されている", () => {
		render(<RenderingTestSampleComponent />);
		// data-testid 属性に 'sampleTestId' を指定された要素があれば、 truthyになる
		expect(screen.getByTestId('sampleTestId')).toBeTruthy();
	});



});
