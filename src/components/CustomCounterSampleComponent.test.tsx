import React from 'react';
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider as ReduxProvider } from "react-redux";
import CustomCounterSampleComponent from "./CustomCounterSampleComponent";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import customCounterReducer from "../features/customCounter/customCounterSlice";

afterEach(() => cleanup())

const resetStore = () => configureStore({
	reducer: {
		counter: counterReducer,
		customCounter: customCounterReducer
	}
});

describe('increment, decrement テスト', () => {
	/* 各テスト実行時に利用するstoreの状態を設定する変数を作成 */
	let store = resetStore();
	beforeEach(() => { store = resetStore() });

	it('increment ボタンをクリックしたとき、store の値が1増加する', async () => {
		const user = userEvent.setup();

		render(
			<ReduxProvider store={store}>
				<CustomCounterSampleComponent />
			</ReduxProvider>
		);

		await user.click(screen.getByText('+'));
		expect(screen.getByTestId('countValue').textContent).toBe("1");
	});

	it('decrement ボタンをクリックしたとき、store の値が1減少する', async () => {
		const user = userEvent.setup();

		render(
			<ReduxProvider store={store}>
				<CustomCounterSampleComponent />
			</ReduxProvider>
		);

		await user.click(screen.getByText('-'));
		expect(screen.getByTestId('countValue').textContent).toBe("-1");
	});
})

describe('incrementByAmount テスト', () => {
	/* 各テスト実行時に利用するstoreの状態を設定する変数を作成 */
	let store = resetStore();
	beforeEach(() => { store = resetStore() });

	it('baseAmount に 10を指定してincrementByAmount ボタンをクリックしたとき、store の値が10増加する', async () => {
		const user = userEvent.setup();

		render(
			<ReduxProvider store={store}>
				<CustomCounterSampleComponent />
			</ReduxProvider>
		);

		await user.type(screen.getByTestId('amount'), '10');
		await user.click(screen.getByText('increment by amount'));

		expect(screen.getByTestId('countValue').textContent).toBe("10");
	});

});
