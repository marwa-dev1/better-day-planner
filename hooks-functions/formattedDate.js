import React from 'react'

//Format dates
export const formattedDate = date => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' });
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date); 
    date = { day: day, month: month, year: year };
    return date;
  }

export const stringifyDate = date => {
    return date.day + '-' + date.month + '-' + date.year;
}

