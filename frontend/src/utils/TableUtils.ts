export interface TableResponse<T> {
    count: number;
    rows: Array<T>;
}