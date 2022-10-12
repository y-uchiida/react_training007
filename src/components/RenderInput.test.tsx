import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderInput from "./RenderInput";

// 使わないけどエラーになるので空の関数を渡しておく
const outputConsoleMock = () => { };

afterEach(() => { cleanup() });

describe("Rendering", () => {
	it("すべての要素が描画されている", () => {
		render(<RenderInput outputConsole={outputConsoleMock} />);
		expect(screen.getByRole("button")).toBeTruthy();
		expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
	});
});

describe("input 要素のonchange イベントのテスト", () => {
	it("inputされた内容がstateに反映されている", async () => {
		// ユーザーイベントコントロール用のオブジェクトを生成
		const user = userEvent.setup();

		render(<RenderInput outputConsole={outputConsoleMock} />);

		//input 要素を取得
		const inputElm = screen.getByRole<HTMLInputElement>("textbox");

		// userEvent.type(<HTML要素>, <入力値>) でキーボード入力が制御できる
		await user.type(inputElm, "test input");

		expect(inputElm.value).toBe("test input");
	});
});

describe('button 要素のonclickイベントのテスト', () => {
	it('inputに値がないときは関数を実行しない', () => {
		// jest.fn() でモック関数を作成する
		const outputConsole = jest.fn();

		render(<RenderInput outputConsole={outputConsole} />);

		// button要素を取得
		const buttonElm = screen.getByRole("button");

		// userEvent.click(<HTML要素>) でクリックイベントを発火させる
		userEvent.click(buttonElm);

		// input要素が空欄なので、モック関数が実行されていないことを確認
		expect(outputConsole).not.toHaveBeenCalled();
	});

	it('inputに値が入力されているときは関数を実行する', async () => {
		// ユーザーイベントコントロール用のオブジェクトを生成
		const user = userEvent.setup();

		// jest.fn() でモック関数を作成する
		const outputConsole = jest.fn();

		render(<RenderInput outputConsole={outputConsole} />);

		//input 要素を取得
		const inputElm: HTMLInputElement = screen.getByPlaceholderText("Enter");

		// userEvent.type(<HTML要素>, <入力値>) でキーボード入力が制御できる
		await user.type(inputElm, "test input");

		console.log(inputElm.value);

		// button要素を取得
		const buttonElm = screen.getByRole("button");

		// userEvent.click(<HTML要素>) でクリックイベントを発火させる
		await user.click(buttonElm);

		// モック関数が実行されたことを確認
		expect(outputConsole).toHaveBeenCalled();
	});
});
