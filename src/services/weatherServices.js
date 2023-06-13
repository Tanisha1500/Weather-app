import {DateTime} from 'luxon';

const iconUrlFromCode=(code)=>
`http://openweathermap.org/img/wn/${code}@2x.png`

const formatTimeZone=(secs,zone,format="cccc, dd LLLL")=>
DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const formatDate=(secs,zone,format="dd LLLL")=>
DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// export default getFormattedWeather;
export{formatTimeZone,formatDate,iconUrlFromCode};

