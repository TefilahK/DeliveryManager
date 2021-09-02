import { data } from "jquery";
import Chart from "react-google-charts";
export default function LineChart (){
  
    return (
<Chart
  width={'600px'}
  height={'400px'}
  chartType="Line"
  loader={<div>Loading Chart</div>}
  data={[
    [
      'Day',
      'Packages'
    ],
    ...data,
  ]}
  options={{
    chart: {
      title: 'Box Office Earnings in First Two Weeks of Opening',
      subtitle: 'in millions of dollars (USD)',
    },
  }}
  rootProps={{ 'data-testid': '3' }}
/>
)}
