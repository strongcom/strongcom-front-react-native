const repetitionPeriodToSubtitle = ({periodCode = 'ONE',dayCode= null,}) =>{
    const subtitle = {
        ONE: '오늘 한번만 알림',
        DAY: '매일 알림',
        WEEK: ({week, st,et})=>`매주 ${week}마다 ${st} ~ ${et}에 반복`,
        MONTH: ({day}) => `매월 ${day}마다 반복`,
        YEAR: ({date}) => `매년 ${date}마다 반복`
    }
}
