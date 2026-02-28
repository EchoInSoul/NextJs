"use client";

import { useMemo } from "react";

export default function CalendarCard() {
  const calendarData = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    const weekNumber = Math.ceil((date + new Date(year, month, 1).getDay()) / 7);
    
    const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const dayNames = ["第" + weekNumber + "周", weekDays[day]];
    
    const totalDays = Math.ceil((now.getTime() - new Date(year, 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    const lunarInfo = getLunarInfo(now);
    
    const calendar = generateCalendar(year, month, date);
    
    return {
      weekInfo: dayNames[0] + " " + dayNames[1],
      date: date,
      monthName: `${year}年${month + 1}月`,
      solar: `第${totalDays}天`,
      lunar: lunarInfo,
      calendar: calendar
    };
  }, []);

  const weekHeaders = ["日", "一", "二", "三", "四", "五", "六"];

  return (
    <div className="calendar-card-widget">
      <div className="calendar-item-content">
        <div className="calendar-area-left">
          <div className="calendar-week">{calendarData.weekInfo}</div>
          <div className="calendar-date">{calendarData.date}</div>
          <div className="calendar-month">{calendarData.monthName}</div>
          <div className="calendar-solar">{calendarData.solar}</div>
          <div className="calendar-lunar">{calendarData.lunar}</div>
        </div>
        <div className="calendar-area-right">
          <div className="calendar-header">
            {weekHeaders.map((header, index) => (
              <div key={index} className="calendar-header-day">{header}</div>
            ))}
          </div>
          <div className="calendar-main">
            {calendarData.calendar.map((row, rowIndex) => (
              <div key={rowIndex} className="calendar-row">
                {row.map((day, dayIndex) => (
                  <div key={dayIndex} className="calendar-day">
                    {day.date && (
                      <span className={`day-number ${day.isToday ? "now" : ""}`}>
                        {day.date}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function generateCalendar(year: number, month: number, today: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const calendar = [];
  let dayCount = 1;
  
  for (let row = 0; row < 5; row++) {
    const rowDays = [];
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDay) {
        rowDays.push({ date: "", isToday: false });
      } else if (dayCount <= daysInMonth) {
        rowDays.push({ date: dayCount, isToday: dayCount === today });
        dayCount++;
      } else {
        rowDays.push({ date: "", isToday: false });
      }
    }
    calendar.push(rowDays);
    if (dayCount > daysInMonth) break;
  }
  
  return calendar;
}

function getLunarInfo(date: Date) {
  const lunarInfo = [
    "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉",
    "甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未",
    "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳",
    "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯",
    "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑",
    "甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥"
  ];
  
  const animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  const lunarMonths = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
  const lunarDays = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  
  const year = date.getFullYear();
  const ganZhiIndex = (year - 4) % 60;
  const animalIndex = (year - 4) % 12;
  const monthIndex = date.getMonth();
  const dayIndex = date.getDate() - 1;
  
  return `${lunarInfo[ganZhiIndex]}${animals[animalIndex]}年 ${lunarMonths[monthIndex]}月${lunarDays[dayIndex]}`;
}
