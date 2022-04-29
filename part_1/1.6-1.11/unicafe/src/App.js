import { useState } from "react"

// A header for the page
const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

// Button to click
const Button = (props) => {
  return (
    <>
      <button onClick={props.button.clickEvent}>{props.button.option}</button>
    </>
  )
}

// Statistic line
const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

// Stats for total clicks on each button, total clicks, average, postive %
const Statistics = (props) => {  
  const combinedTotalVotes = props.stats[0].totalVotes+props.stats[1].totalVotes+props.stats[2].totalVotes;

  const average = (props.stats[0].totalVotes - props.stats[2].totalVotes) / combinedTotalVotes;

  const positivePercent = `${(props.stats[0].totalVotes / combinedTotalVotes)*100} %`;

  if (combinedTotalVotes === 0)
  {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  else {
    return (
    <table>
      <tbody>
        <StatisticLine text={props.stats[0].option} value={props.stats[0].totalVotes} />
        <StatisticLine text={props.stats[1].option} value={props.stats[1].totalVotes} />
        <StatisticLine text={props.stats[2].option} value={props.stats[2].totalVotes} />

        <StatisticLine text='all' value={combinedTotalVotes} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positivePercent} />
      </tbody>
    </table>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const mainHeader = 'give feedback'
  const statsHeader = 'statistics'

  const feedback = {
    options: [
      {
        option: 'good',
        clickEvent: () => setGood(good+1),
        totalVotes: good
      },
      {
        option: 'neutral',
        clickEvent: () => setNeutral(neutral+1),
        totalVotes: neutral
      },
      {
        option: 'bad',
        clickEvent: () => setBad(bad+1),
        totalVotes: bad
      }
    ]
  }

  return (
    <div>
      <Header header={mainHeader}/>

      <Button button={feedback.options[0]} />
      <Button button={feedback.options[1]} />
      <Button button={feedback.options[2]} />

      <Header header={statsHeader} />
      <Statistics stats={feedback.options} />
    </div>
  )
}

export default App