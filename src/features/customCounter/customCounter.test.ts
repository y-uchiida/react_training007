import reducer, { increment, decrement, incrementByAmount, MODE, CustomCounterState } from "./customCounterSlice";

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
});
