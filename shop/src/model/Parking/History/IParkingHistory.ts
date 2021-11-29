import { IParkingHistoryItem } from "./IParkingHistoryItem";

export interface IParkingHistory {
    parkingHistoryList: IParkingHistoryItem[],
    totalRowCount: number
}