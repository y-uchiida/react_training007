import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../../app/store";

export const enum MODE {
	"One",
	"Hundred",
	"Thousand"
};

export interface CustomCounterState {
	mode: MODE;
	value: number;
	username: string | null;
}

const initialState: CustomCounterState = {
	mode: MODE.One,
	value: 0,
	username: ''
};

/* 指定のミリ秒だけ、動作を停止する
 * 外部APIとの非同期通信の挙動再現用関数
 */
const sleep = (msec: number) => {
	const start = new Date().getMilliseconds();
	while (new Date().getMilliseconds() - start < msec);
};

/* 
 * 
 */
export const fetchDummy = createAsyncThunk('fetch/dummy', async (num: number) => {
	await sleep(500);
	return num;
});

/* 非同期で外部APIの呼び出しを行う関数
 */
export const fetchJSON = createAsyncThunk('fetch/api', async () => {
	const res = await axios.get<UserInfo>('https://jsonplaceholder.typicode.com/users/1');
	const { username } = res.data;
	return username;
});

export const customCounterSlice = createSlice({
	name: "customCounter",
	initialState,
	reducers: {
		increment: (state) => {
			switch (state.mode) {
				case MODE.One:
					state.value++;
					break;
				case MODE.Hundred:
					state.value += 100;
					break;
				case MODE.Thousand:
					state.value += 1000;
					break;
				default:
					break;
			}
		},
		decrement: (state) => {
			state.value--;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			const baseAmount = action.payload;
			switch (state.mode) {
				case MODE.One:
					state.value += baseAmount;
					break;
				case MODE.Hundred:
					state.value += 100 * baseAmount;
					break;
				case MODE.Thousand:
					state.value += 1000 * baseAmount;
					break;
				default:
					break;
			}
		},
	},
	extraReducers: (builder) => {
		/* 非同期処理のReducerを追加する
		 * もとになる非同期関数の返り値がpayload に入ってくる
		 */
		builder.addCase(fetchDummy.fulfilled, (state, { payload }) => {
			state.value = 100 + payload;
		});

		/* fetchDummyが失敗したら、例外を返す
		 */
		builder.addCase(fetchDummy.rejected, (state, action) => {
			throw new Error("fetch failed");
		});

		/* 非同期でのユーザー情報取得が成功した場合は、stateにユーザー名をセットする
		 */
		builder.addCase(fetchJSON.fulfilled, (state, { payload }) => {
			state.username = payload;
		});
	}
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = customCounterSlice.actions;

// RootState からstoreの内容をとってきて、それぞれのstateの値を返す
export const selectCount = (state: RootState) => state.customCounter.value;
export const selectUserName = (state: RootState) => state.customCounter.username;

export default customCounterSlice.reducer;
