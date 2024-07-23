import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import { Balance, CalendarContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";
import { useTheme } from "@mui/material";
import { isSameMonth } from "date-fns/isSameMonth";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}

const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: CalendarProps) => {
  const theme = useTheme();
  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  const createCalendarEvents = (
    dailyBalances: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };

  const calendarEvents = createCalendarEvents(dailyBalances);

  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  // 各月の日付データ取得
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;
    setCurrentMonth(currentMonth);
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
