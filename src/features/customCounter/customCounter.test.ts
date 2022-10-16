import reducer, { increment, decrement, incrementByAmount, MODE, CustomCounterState } from "./customCounterSlice";

import { fetchDummy } from "./customCounterSlice";

describe('customCounter のテスト', () => {
	describe('increment のテスト', () => {
		let initialState: CustomCounterState = {
			mode: MODE.One,
			value: 1,
			username: ''
		};

		it('state の mode が ONE のとき、valueが 1増加する', () => {
			const action = { type: increment.type };
			const state = reducer(initialState, action);

			expect(state.value).toEqual(initialState.value + 1);
		});

		it('state の mode が Hundred のとき、valueが 100増加する', () => {
			initialState.mode = MODE.Hundred
			const action = { type: increment.type };
			const state = reducer(initialState, action);

			expect(state.value).toEqual(initialState.value + 100);
		});

		it('state の mode が Thousand のとき、valueが 1000増加する', () => {
			initialState.mode = MODE.Thousand
			const action = { type: increment.type };
			const state = reducer(initialState, action);

			expect(state.value).toEqual(initialState.value + 1000);
		});

	});

	describe('incrementByAmount のテスト', () => {
		let initialState: CustomCounterState = {
			mode: MODE.One,
			value: 1,
			username: ''
		};

		it('state のmode が One のとき、state の値が指定値だけ増加する', () => {
			const baseAmount = 3;
			const action = { type: incrementByAmount.type, payload: baseAmount };

			const state = reducer(initialState, action);

			expect(state.value).toEqual(initialState.value + baseAmount);
		});

		it('state のmode が Hundred のとき、state の値が指定値の100倍増加する', () => {
			initialState.mode = MODE.Hundred;
			const baseAmount = 3;
			const action = { type: incrementByAmount.type, payload: baseAmount };

			const state = reducer(initialState, action);

			expect(state.value).toEqual(initialState.value + (baseAmount * 100));
		});

		it('state のmode が Thousand のとき、state の値が指定値の1000倍増加する', () => {
			initialState.mode = MODE.Thousand;
			const baseAmount = 3;
			const action = { type: incrementByAmount.type, payload: baseAmount };

			const state = reducer(initialState, action);

			expect(state.value).toEqual(initialState.value + (baseAmount * 1000));
		});
	});

	describe('extraReducer のテスト', () => {
		const initialState: CustomCounterState = {
			mode: MODE.One,
			value: 0,
			username: ''
		};

		it('fetchDummy が成功した場合、state の値が100 + 指定値 になる', async () => {
			const baseAmount = 5;
			const action = { type: fetchDummy.fulfilled, payload: baseAmount };

			const state = await reducer(initialState, action);
			expect(state.value).toEqual(100 + baseAmount);
		});

		it('fetchDummy が失敗(rejected)した場合、例外が発生する', async () => {
			const baseAmount = 5;
			const action = { type: fetchDummy.rejected, payload: baseAmount };

			/* 例外をテストするには、expect 内で無名関数を作ってその中で例外を発生させる必要がある */
			expect(() => reducer(initialState, action)).toThrowError('fetch failed');
		});
	});

});
