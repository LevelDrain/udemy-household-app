import { format } from "date-fns";

export function formatMonth(date: Date):string {
    return format(date, "yyyy-MM")
}

export function formatCurrency(amount: number):string{
    return amount.toLocaleString('ja-JP')
}