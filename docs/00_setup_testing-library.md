# React Testing Library のセットアップ

## パッケージのインストール
```bash
$ npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/react-hooks @testing-library/user-event
$ npm install --save-dev jest jest-environment-jsdom
```

## jestの設定ファイルを作成
`jest.config.json`
```json
{
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
	"testEnvironment": "jest-environment-jsdom"
}
```

`src/jest.setup.ts`
```ts
import '@testing-library/jest-dom'

```

