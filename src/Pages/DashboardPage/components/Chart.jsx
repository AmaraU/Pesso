import React from 'react';
import { Line, XAxis, Tooltip, Legend, ResponsiveContainer, YAxis, LineChart } from 'recharts';
import styles from "../css/default.module.css";

const formatAmount = (amount, currency) => {
    let unit = "";
    let value = amount / 1000000;
    if ((value > 0 && value < 1) || (value < 0 && value > -1)) {
        value = amount / 1000;
        unit = "K";
    }
    else if (value >= 1000 || value <= -1000) {
        value = amount / 1000000000;
        unit = "B";
    }
    else {
        unit = "M";
    }

    const result = Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1
    }).format(value) + unit;

    return currency === 'USD' ? `$${result}` : result;
}

export function SimpleLine({ data = [], dataTooltipLabel = "", data2TooltipLabel = "", dataCurrency = "", showLegend = true, xHeight = 40 }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <p className={styles.label}>{label}</p>
                    <p className={styles.intro}>{dataTooltipLabel} : <b>{Intl.NumberFormat('en-US').format(payload[0].value)} {dataCurrency}</b></p>
                    <p className={styles.intro}>{data2TooltipLabel} : <b>{Intl.NumberFormat('en-US').format(payload[1].value)} {dataCurrency}</b></p>
                </div>
            );
        }

        return null;
    };
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: xHeight,
                }}
            >
                <YAxis fontWeight={500} fontSize={"12px"} tickFormatter={(value) => formatAmount(value)} />
                <Tooltip formatter={(value, name, props) => [`${Intl.NumberFormat('en-US').format(value)} ${dataCurrency}`, name[0].toUpperCase() + name.substring(1).toLowerCase()]} labelStyle={{ color: "black" }} cursor={{ fill: '#1B4F7211' }} content={<CustomTooltip />} wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }} />
                <XAxis fontWeight={500} fontSize={"12px"} dataKey="label" angle={-45} textAnchor="end" padding="gap" />
                <Tooltip formatter={(value, name, props) => [`${Intl.NumberFormat('en-US').format(value)} ${dataCurrency}`, dataTooltipLabel]} cursor={{ fill: '#1B4F7211' }} />
                {showLegend && <Legend verticalAlign='top' iconType='line' height={34} />}
                <Line type="monotone" stroke="#20B2AA" strokeWidth={1.5} dataKey="income" barSize={60} />
                <Line type="monotone" stroke="#CD5C5C" strokeWidth={1.5} dataKey="expense" barSize={60} />
            </LineChart>
        </ResponsiveContainer>
    );
}