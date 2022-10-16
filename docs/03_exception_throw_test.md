# Reactのエラー・例外テスト

`toThrowError()` で、throw された例外を検証できる  

`expect()` にそのまま例外が発生する処理を渡すと、キャッチできない 
```ts
expect(reducer(initialState, action)).toThrowError('fetch failed');
// エラーで止まる
```

`expect(() => {})` のように、無名関数を作ってその中で例外が発生する処理を実行すると、`expect()`が例外をキャッチしてくれる
```ts
expect(() => reducer(initialState, action)).toThrowError('fetch failed');
// .toThrowErrorの判定に、例外オブジェクトが渡される
```
