# Testing Library を利用したユーザーのブラウザ操作時のイベント発火のテスト

user-event パッケージを利用する
v14 で使い方が結構変わったので注意

```tsx
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/* userEvent で動作するイベントシミュレーションはpromise を返すので、async を設定する */
test('type', async () => {
	/* userEvent の処理を管理するオブジェクトを作成 */
	const user = userEvent.setup();

	render(<input />)

	/* userEvent オブジェクト経由でキーボード入力の操作をシミュレート */
	await user.type(screen.getByRole('textbox'), 'Hello, World!')

	/* シミュレート完了後、expect() で期待状況を記述 */
	expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe('Hello, World!')
})
```
