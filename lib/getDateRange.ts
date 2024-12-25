export default function getDateRange(date: string | null = null): string[] {
  let date1: Date;
  let date2: Date;

  if (date) {
    date1 = new Date(date);
    date2 = new Date(date);
  } else {
    date1 = new Date();
    date2 = new Date();
  }

  // Set start and end dates (3 days before and 3 days after the given date)
  const startDate = date1.setDate(date1.getDate() - 3);
  const endDate = date2.setDate(date2.getDate() + 3);

  // Get the range of dates as an array of strings in YYYY-MM-DD format
  const dayList = getDaysArray(startDate, endDate);
  const dateRangeArr = dayList.map((v: Date) => v.toISOString().slice(0, 10));

  return dateRangeArr;
}

// Helper function to get an array of dates between two given dates
const getDaysArray = (start: number, end: number): Date[] => {
  const arr: Date[] = [];
  const dt = new Date(start);

  while (dt <= new Date(end)) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
};
