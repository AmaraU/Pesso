import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../App.css"

export const ScheduleCalendar = () => {
    const [date, setDate] = useState(new Date());
    return (
        <Box rounded={10} border={"1px solid #F3F4F6"} p={"16px"}>
            <Calendar onChange={setDate} value={date} />
        </Box>
    );
}