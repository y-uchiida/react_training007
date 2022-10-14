import React from "react";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServerTestSampleComponent from "./MockServerTestSampleComponent";

/* msw(mock server worker) の機能を使って、APIのモックサーバを記述する */
const testUrl = 'https://jsonplaceholder.typicode.com/users/1';
const server = setupServer(
	rest.get(testUrl, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }))
	})
);

// /* テストの初期起動時に、モックサーバを起動しておく */
beforeAll(() => server.listen());

// /* 各テストの実行完了のたびに、resetHandlers() で状態をリセットする */
afterEach(() => server.resetHandlers());

// /* すべてのテストが完了した際に、モックサーバを停止する */
afterAll(() => server.close());

describe('API モックテスト', () => {
	it('fetch が成功した場合、ボタンを無効化してuserName が表示される', async () => {
		const user = userEvent.setup();

		render(<MockServerTestSampleComponent />);

		const buttonElm = screen.getByRole('button');
		user.click(buttonElm);

		/* モックサーバから取得したユーザー名称が表示されているかを確認 */
		expect(await screen.findByTestId('username')).toHaveTextContent('Bred dummy');

		/* fetch 成功後、ボタンがクリックできなくなっていることを確認 */
		expect(buttonElm).toHaveAttribute('disabled');
	});

	it('fetch が失敗した場合、エラーメッセージが表示され、ボタンが有効になっている', async () => {
		const user = userEvent.setup();

		/* 404 エラーを返すように、モックの動作を置き換える */
		server.use(
			rest.get(testUrl, (req, res, ctx) => {
				return res(ctx.status(404));
			})
		);

		render(<MockServerTestSampleComponent />);

		const buttonElm = screen.getByRole('button');
		user.click(buttonElm);

		/* fetch 失敗時、エラーメッセージを表示する要素が描画されていることを確認 */
		expect(await screen.findByTestId('errorMessage')).toBeInTheDocument();

		/* fetch 失敗時、ユーザー名称が表示されていないことを確認 */
		expect(await screen.queryByTestId('username')).toBeNull();

		/* fetch 失敗時、ボタンがクリックできることを確認 */
		expect(buttonElm).not.toHaveAttribute('disabled');
	});
});
