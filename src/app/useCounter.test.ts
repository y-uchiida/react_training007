import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";

describe('useCounter custom hook test', () => {
	it('increment を実行すると値が1増加する', () => {
		const initialCount = 0;
		const { result } = renderHook(() => useCounter(initialCount));

		/* 初期値が0になっているか */
		expect(result.current.count).toBe(initialCount);

		/* act()で囲んで、countの値更新が完了するところまでを処理させる */
		act(() => {
			result.current.increment();
		})

		/* 初期値から1増えていることを確認 */
		expect(result.current.count).toBe(initialCount + 1);
	})

	it('decrement を実行すると値が1減少する', () => {
		const initialCount = 0;
		const { result } = renderHook(() => useCounter(initialCount));

		/* 初期値が0になっているか */
		expect(result.current.count).toBe(initialCount);

		/* act()で囲んで、countの値更新が完了するところまでを処理させる */
		act(() => {
			result.current.decrement();
		})

		/* 初期値から1増えていることを確認 */
		expect(result.current.count).toBe(initialCount - 1);
	})

	it('double を実行すると値が2倍に増加する', () => {
		const initialCount = 0;
		const { result } = renderHook(() => useCounter(initialCount));

		/* 初期値が0になっているか */
		expect(result.current.count).toBe(initialCount);

		/* act()で囲んで、countの値更新が完了するところまでを処理させる */
		act(() => {
			result.current.double();
		})

		/* 初期値から1増えていることを確認 */
		expect(result.current.count).toBe(initialCount * 2);
	})

	it('triple を実行すると値が3倍に増加する', () => {
		const initialCount = 0;
		const { result } = renderHook(() => useCounter(initialCount));

		/* 初期値が0になっているか */
		expect(result.current.count).toBe(initialCount);

		/* act()で囲んで、countの値更新が完了するところまでを処理させる */
		act(() => {
			result.current.triple();
		})

		/* 初期値から1増えていることを確認 */
		expect(result.current.count).toBe(initialCount * 3);
	})

	it('reset を実行すると値が初期値に戻る', () => {
		const initialCount = 0;
		const { result } = renderHook(() => useCounter(initialCount));

		/* 初期値が0になっているか */
		expect(result.current.count).toBe(initialCount);

		/* act()で囲んで、countの値更新が完了するところまでを処理させる */
		act(() => {
			result.current.decrement();
			result.current.decrement();
			result.current.decrement();
		})

		/* 初期値から3減少していることを確認 */
		expect(result.current.count).toBe(initialCount - 3);

		act(() => {
			result.current.reset();
		})

		/* 初期値に戻っていることを確認 */
		expect(result.current.count).toBe(initialCount);
	})

});
