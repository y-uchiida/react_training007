import React, { ChangeEvent, useTransition } from 'react';
import { cleanup, findByTestId, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider as ReduxProvider } from "react-redux";
import FetchAsyncSampleComponent from "./FetchAsyncSampleComponent";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import customCounterReducer from "../features/customCounter/customCounterSlice";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from 'react-dom/test-utils';

afterEach(() => cleanup())

const resetStore = () => configureStore({
	reducer: {
		counter: counterReducer,
		customCounter: customCounterReducer
	}
});

describe('コンポーネントからRedux のcounter非同期処理を検証する(結合テスト)', () => {
	/* 各テスト実行時に利用するstoreの状態を設定する変数を作成 */
	let store = resetStore();
	beforeEach(() => { store = resetStore() });

	it('fetchDummy が成功した場合、指定の値に100を加えた値が描画される', async () => {
		const user = userEvent.setup();

		render(
			<ReduxProvider store={store}>
				<FetchAsyncSampleComponent />
			</ReduxProvider>
		);

		const valueElm = screen.getByTestId('countValue');

		await user.click(screen.getByText('fetchDummy'));

		/* state が更新完了するまで待つ
		 * 時間固定で待機されているため賢いやり方ではないが、
		 * clickイベントのコールバックの中で実行される非同期のfetchDummy の終了を検知する方法がわからず、とりあえずこのやり方にした
		 */
		await new Promise((resolve) => {
			setTimeout(resolve, 550);
		});

		expect(valueElm.textContent).toBe('105');
	})
});


/* msw(mock server worker) の機能を使って、APIのモックサーバを記述する */
const testUrl = 'https://jsonplaceholder.typicode.com/users/1';
const expectedUserName = 'Bred dummy';
const server = setupServer(
	rest.get(testUrl, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ username: expectedUserName }))
	})
);

// /* テストの初期起動時に、モックサーバを起動しておく */
beforeAll(() => server.listen());

// /* 各テストの実行完了のたびに、resetHandlers() で状態をリセットする */
afterEach(() => server.resetHandlers());

// /* すべてのテストが完了した際に、モックサーバを停止する */
afterAll(() => server.close());

describe('コンポーネントからRedux のAPI呼び出しの非同期処理を検証する(結合テスト)', () => {
	/* 各テスト実行時に利用するstoreの状態を設定する変数を作成 */
	let store = resetStore();
	beforeEach(() => { store = resetStore() });

	it('fetchJSON が成功した場合、取得したユーザー名 が描画される', async () => {
		const user = userEvent.setup();

		render(
			<ReduxProvider store={store}>
				<FetchAsyncSampleComponent />
			</ReduxProvider>
		);

		expect(screen.queryByTestId('usernameValue')).toBeNull();
		await user.click(screen.getByText('fetchJSON'));
		const userNameElm = await screen.findByTestId('usernameValue');
		expect(userNameElm.textContent).toBe(expectedUserName);
	});

	it('fetchJSON が失敗した場合、ユーザー名anonymous が描画される', async () => {
		const user = userEvent.setup();

		/* モックサーバの動作を上書き */
		server.use(
			rest.get(testUrl, (req, res, ctx) => {
				return res(ctx.status(404));
			})
		);

		render(
			<ReduxProvider store={store}>
				<FetchAsyncSampleComponent />
			</ReduxProvider>
		);

		expect(screen.queryByTestId('usernameValue')).toBeNull();
		await user.click(screen.getByText('fetchJSON'));
		const userNameElm = await screen.findByTestId('usernameValue');
		expect(userNameElm.textContent).toBe('anonymous');
	});
});
