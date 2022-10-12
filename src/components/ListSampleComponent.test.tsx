import React from "react";
import { render, screen } from "@testing-library/react";
import ListSampleComponent from "./ListSampleComponent";
import '@testing-library/jest-dom';

describe("リストの表示テスト", () => {
	it("items が空配列の場合は 'no items' が表示される", () => {
		render(<ListSampleComponent items={[]} />)

		expect(screen.getByTestId('noItem')).toBeInTheDocument();
	});

	it("items に渡された内容通りにul/li リストが表示される", async () => {
		const items = [
			{ id: 1, name: 'React dummy' },
			{ id: 2, name: 'Angular dummy' },
			{ id: 3, name: 'Vue dummy' },
		];

		render(<ListSampleComponent items={items} />);

		/* レンダリングされたli要素から、テキストノードの内容を取得して配列にする */
		const renderedItems = await screen.findAllByRole("listitem").then(elms => elms.map(elm => elm.textContent));

		/* items要素から、name プロパティを取り出して配列にする */
		const itemNames = items.map(item => item.name);

		/* レンダリングされた内容と、itemsのもともとの内容が一致するか判定 */
		expect(renderedItems).toEqual(itemNames);

		/* 念のため、 'no items' が表示されていないことを確認する */
		expect(screen.queryByTestId('noItem')).toBeNull();
	});
});
